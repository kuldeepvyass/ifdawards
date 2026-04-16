import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const steps = [
  'Organisation Details',
  'Category Selection',
  'Design Submission',
];

const MAX_UPLOAD_FILES = 15;
const UPLOAD_BATCH_SIZE = 5;
const MAX_FILE_SIZE_MB = 100;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const categories = [
  {
    name: "Furniture (Domestic & Commercial)",
    subcategories: [
      {
        title: "Indoor",
        items: [
          {
            type: "Living Room",
            products: ["Lounge chairs", "Center tables", "Accent tables", "Consoles", "TV consoles", "Working desks"],
          },
          {
            type: "Dining",
            products: ["Dining tables", "Chairs", "Benches"],
          },
          {
            type: "Bedroom",
            products: ["Beds", "Bedside tables", "Tall chests", "Sideboards", "Drawer units"],
          },
          {
            type: "Kitchen & Bathroom",
            products: ["Chairs", "Storage units", "Washbasin cabinets"],
          },
        ],
      },
      {
        title: "Commercial",
        items: [
          {
            type: "Restaurant & Hospitality",
            products: ["Dining furniture", "Seating", "Bar counters", "Bar trolleys", "Wine racks"],
          },
        ],
      },
    ],
  },
  {
    name: "Home Decoratives & Accessories",
    products: ["Mirrors", "Wall Decors", "Table Tops", "Candle Holders", "Kitchenware", "Separators"],
  },
  {
    name: "Lamps & Lighting",
    products: ["Floor Lamps", "Ceiling Lamps", "Table Lamps", "Outdoor Lamps"],
  },
  {
    name: "Home Textiles",
    subcategories: [
      {
        title: "By Room",
        items: [
          {
            type: "Living Room",
            products: ["Rugs", "Cushion covers", "Bolsters", "Window curtains", "Door curtains"],
          },
          {
            type: "Dining",
            products: ["Table linens", "Runners", "Table mats", "Napkins", "pot holders", "trivet"],
          },
          {
            type: "Bedroom",
            products: ["Bed linens", "Spreads", "Pillow covers", "pillow fillers", "Comforters", "Cushions", "Mattresses"],
          },
          {
            type: "Kitchen and Bathroom",
            products: ["Aprons", "Wiping towels", "Napkin holder", "Pot holder", "Mittens", "Towels", "Bath curtains", "Kitchen curtains"],
          },
          {
            type: "Decorative Textile",
            products: ["wall decor", "Soft toys"], 
          },
        ],
      },
    ],
  },
];

export default function SubmissionForm({ onComplete }: { onComplete: () => void }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [hasProfile, setHasProfile] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name?: string; email?: string; phone?: string } | null>(null);
  const [form, setForm] = useState({
    // Step 1
    orgName: '',
    orgType: '',
    // Step 2
    category: '',
    subcategory: '',
    product: '',
    // Step 3
    productName: '',
    dimensionsInches: '',
    dimensionsCm: '',
    specificDimensions: '',
    materialUsed1: '',
    materialUsed2: '',
    materialUsed3: '',
    finishType1: '',
    finishType2: '',
    finishType3: '',
    description: '',
    files: [] as File[],
    agreeTnc: false,
    notAiGenerated: false,
    feasibleProduct: false,
    technicalDrawingPresent: false,
  });
  const [filePreviews, setFilePreviews] = useState<{ file: File; url: string; previewUrl?: string }[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<{ url: string; name: string; type: string; kind: 'image' | 'video' | 'pdf' | 'file' } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const latestFilePreviewsRef = useRef<{ file: File; url: string; previewUrl?: string }[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      navigate('/login?redirect=/submit-form', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const profileRaw = localStorage.getItem('profileInfo');
    const userRaw = localStorage.getItem('user');
    if (userRaw) {
      const parsedUser = JSON.parse(userRaw) as { name?: string; email?: string; phone?: string };
      setUserProfile(parsedUser);
    }
    if (profileRaw) {
      const profile = JSON.parse(profileRaw) as {
        orgName: string;
        orgType: string;
      };
      setForm(f => ({
        ...f,
        orgName: profile.orgName || '',
        orgType: profile.orgType || '',
      }));
      setHasProfile(true);
      setStep(1);
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'category' ? { subcategory: '', product: '' } : {}),
      ...(name === 'subcategory' ? { product: '' } : {}),
    }));
  }

  const selectedCategory = categories.find(category => category.name === form.category);
  const hasSubcategories = Boolean(selectedCategory && 'subcategories' in selectedCategory && selectedCategory.subcategories?.length);
  const subcategoryItems =
    selectedCategory && 'subcategories' in selectedCategory && selectedCategory.subcategories
      ? selectedCategory.subcategories.flatMap(sub => sub.items)
      : [];
  const selectedSubcategoryItem = hasSubcategories
    ? subcategoryItems.find(item => item.type === form.subcategory)
    : null;
  const productOptions = !selectedCategory
    ? []
    : hasSubcategories
    ? (selectedSubcategoryItem?.products || [])
    : ('products' in selectedCategory && selectedCategory.products ? selectedCategory.products : []);

  const canGoNext =
    step === 0
      ? hasProfile || Boolean(form.orgName.trim() && form.orgType.trim())
      : step === 1
      ? Boolean(form.category && form.product && (!hasSubcategories || form.subcategory))
      : true;

  const canSubmit = Boolean(
    form.productName.trim() &&
    form.materialUsed1.trim() &&
    form.finishType1.trim() &&
    form.dimensionsInches.trim() &&
    form.dimensionsCm.trim() &&
    form.description.trim() &&
    form.files.length > 0 &&
    form.agreeTnc &&
    form.notAiGenerated &&
    form.feasibleProduct &&
    form.technicalDrawingPresent
  );

  async function createThumbnail(file: File): Promise<string | undefined> {
    if (!file.type.startsWith('image/')) return undefined;
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const maxSize = 240;
          const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          if (!ctx) return resolve(undefined);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/jpeg', 0.6));
        };
        img.onerror = () => resolve(undefined);
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve(undefined);
      reader.readAsDataURL(file);
    });
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      if (form.files.length >= MAX_UPLOAD_FILES) {
        toast.error(`Maximum ${MAX_UPLOAD_FILES} files allowed.`);
        e.target.value = '';
        return;
      }

      let incomingFiles = Array.from(e.target.files);
      const remainingSlots = MAX_UPLOAD_FILES - form.files.length;
      if (incomingFiles.length > remainingSlots) {
        toast.error(`You can upload only ${remainingSlots} more file(s).`);
        incomingFiles = incomingFiles.slice(0, remainingSlots);
      }

      const validFiles: File[] = [];
      let rejectedCount = 0;
      incomingFiles.forEach((file) => {
        if (file.size > MAX_FILE_SIZE_BYTES) {
          rejectedCount += 1;
          return;
        }
        validFiles.push(file);
      });

      if (rejectedCount > 0) {
        toast.error(`${rejectedCount} file(s) exceed ${MAX_FILE_SIZE_MB}MB and were skipped.`);
      }

      if (validFiles.length === 0) {
        e.target.value = '';
        return;
      }

      const newPreviews = await Promise.all(
        validFiles.map(async (file) => {
          const url = URL.createObjectURL(file);
          const previewUrl = await createThumbnail(file);
          return { file, url, previewUrl };
        })
      );
      setForm(f => ({ ...f, files: [...f.files, ...validFiles] }));
      setFilePreviews(prev => [...prev, ...newPreviews]);
      e.target.value = '';
    }
  }

  function getPreviewKind(file: { name: string; type: string }) {
    const type = file.type || '';
    const name = (file.name || '').toLowerCase();
    if (type.startsWith('image/')) return 'image';
    if (type.startsWith('video/')) return 'video';
    if (type === 'application/pdf' || name.endsWith('.pdf')) return 'pdf';
    return 'file';
  }

  function removeFile(index: number) {
    setFilePreviews(prev => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((_, i) => i !== index);
    });
    setForm(f => ({ ...f, files: f.files.filter((_, i) => i !== index) }));
  }

  useEffect(() => {
    latestFilePreviewsRef.current = filePreviews;
  }, [filePreviews]);

  useEffect(() => {
    return () => {
      latestFilePreviewsRef.current.forEach(preview => URL.revokeObjectURL(preview.url));
    };
  }, []);

  function next() {
    setStep(s => Math.min(s + 1, steps.length - 1));
  }
  function prev() {
    const minStep = hasProfile ? 1 : 0;
    setStep(s => Math.max(s - 1, minStep));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    let uploadedFiles: { name: string; type: string; size: number; fullUrl: string }[] = [];
    if (form.files.length > 0) {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      try {
        for (let i = 0; i < form.files.length; i += UPLOAD_BATCH_SIZE) {
          const batch = form.files.slice(i, i + UPLOAD_BATCH_SIZE);
          const formData = new FormData();
          batch.forEach((file) => formData.append('files', file));

          const uploadRes = await axios.post('/api/users/upload', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const batchFiles = (uploadRes.data as { files?: { name: string; type: string; size: number; fullUrl: string }[] })?.files || [];
          uploadedFiles = [...uploadedFiles, ...batchFiles];
        }
      } catch (error) {
        let msg = 'Unable to upload images. Please try again.';
        if (typeof error === 'object' && error && 'response' in error) {
          const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
          const statusCode = (error as { response?: { status?: number } }).response?.status;
          if (statusCode === 413) {
            msg = 'Upload is too large for the server limit. Please upload fewer/smaller files.';
          } else {
            msg = axiosError.response?.data?.message || axiosError.message || msg;
          }
        } else if (typeof error === 'object' && error && 'message' in error) {
          msg = String(error.message || msg);
        }
        toast.error(msg);
        return;
      }
    }
    const existingProfileRaw = localStorage.getItem('profileInfo');
    const profileInfo = existingProfileRaw
      ? JSON.parse(existingProfileRaw)
      : {
          orgName: form.orgName,
          orgType: form.orgType,  
        };

    if (!existingProfileRaw) {
      localStorage.setItem('profileInfo', JSON.stringify(profileInfo));
      setHasProfile(true);
    }

    const draftSubmission = {
      profile: profileInfo,
      category: form.category,
      subcategory: form.subcategory,
      product: form.product,
      productName: form.productName,
      materials: [form.materialUsed1, form.materialUsed2, form.materialUsed3].map((item) => item.trim()).filter(Boolean),
      finishes: [form.finishType1, form.finishType2, form.finishType3].map((item) => item.trim()).filter(Boolean),
      dimensionsInches: form.dimensionsInches,
      dimensionsCm: form.dimensionsCm,
      specificDimensions: form.specificDimensions,
      materialUsed: [form.materialUsed1, form.materialUsed2, form.materialUsed3].map((item) => item.trim()).filter(Boolean).join(', '),
      finishType: [form.finishType1, form.finishType2, form.finishType3].map((item) => item.trim()).filter(Boolean).join(', '),
      dimensions: [
        form.dimensionsInches.trim() ? `Inches: ${form.dimensionsInches.trim()}` : '',
        form.dimensionsCm.trim() ? `Centimeters: ${form.dimensionsCm.trim()}` : '',
        form.specificDimensions.trim() ? `Specific dimensions: ${form.specificDimensions.trim()}` : '',
      ].filter(Boolean).join(' | '),
      description: form.description,
      agreeTnc: form.agreeTnc,
      notAiGenerated: form.notAiGenerated,
      feasibleProduct: form.feasibleProduct,
      technicalDrawingPresent: form.technicalDrawingPresent,
      files: filePreviews.map((preview, index) => ({
        name: preview.file.name,
        type: preview.file.type,
        size: preview.file.size,
        previewUrl: preview.previewUrl,
        fullUrl: uploadedFiles[index]?.fullUrl,
      })),
      submittedAt: new Date().toISOString(),
    };
    if (userProfile) {
      draftSubmission.profile = {
        ...draftSubmission.profile,
        name: userProfile.name || draftSubmission.profile?.name,
        email: userProfile.email || draftSubmission.profile?.email,
        phone: userProfile.phone || draftSubmission.profile?.phone,
      };
    }
    localStorage.setItem('draftSubmission', JSON.stringify(draftSubmission));
    onComplete();
  }

  return (
    <div className="mt-35 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-8 border border-red-100">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500">
          <span>Step {step + 1} of {steps.length}</span>
          <span className="font-semibold text-red-600">{steps[step]}</span>
        </div>
        <div className="mt-3 h-2 w-full rounded-full bg-red-50">
          <div
            className="h-2 rounded-full bg-red-600 transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((label, i) => (
            <div
              key={label}
              className={`rounded-lg px-3 py-2 text-center text-xs font-semibold ${
                i === step
                  ? 'bg-red-600 text-white'
                  : i < step
                  ? 'bg-red-50 text-red-700'
                  : 'bg-gray-50 text-gray-500'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {step === 0 && !hasProfile && (
          <div className="space-y-4">
            <input name="orgName" value={form.orgName} onChange={handleChange} placeholder="Organisation Name" className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200" required />
            <input name="orgType" value={form.orgType} onChange={handleChange} placeholder="Organisation Type" className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200" required />
          </div>
        )}
        {hasProfile && step === 1 && (
          <div className="rounded-lg border border-red-100 bg-red-50/40 px-4 py-3 text-sm text-gray-700">
            Using your saved organisation details for this submission.
          </div>
        )}
        {step === 1 && (
          <div className="space-y-4">
            <select name="category" value={form.category} onChange={handleChange} className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200" required>
              <option value="">Select Category</option> 
              {categories.map(category => (
                <option key={category.name} value={category.name}>{category.name}</option>
              ))}
            </select>
            {hasSubcategories && (
              <select
                name="subcategory"
                value={form.subcategory}
                onChange={handleChange}
                className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              >
                <option value="">Select Subcategory</option>
                {subcategoryItems.map(item => (
                  <option key={item.type} value={item.type}>{item.type}</option>
                ))}
              </select>
            )}

            {form.category && (!hasSubcategories || form.subcategory) && (
              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              >
                <option value="">Select Product</option>
                {productOptions.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            )}
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50/70 via-white to-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">Product Overview</h3>
                {/* <span className="rounded-full border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-700">Premium Entry</span> */}
              </div>
              <div className="space-y-4">
                <input
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  placeholder="Product Name"
                  className="w-full border border-red-100 bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Design Description (100–150 words): purpose, user problem solved, key features, and what makes it unique"
                  className="w-full border border-red-100 bg-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200 min-h-[120px]"
                  required
                />
              </div>
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-red-700">Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="dimensionsInches"
                  value={form.dimensionsInches}
                  onChange={handleChange}
                  placeholder="Dimensions in Inches (L × W × H)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
                <input
                  name="dimensionsCm"
                  value={form.dimensionsCm}
                  onChange={handleChange}
                  placeholder="Dimensions in Centimeters (L × W × H)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
                <input
                  name="specificDimensions"
                  value={form.specificDimensions}
                  onChange={handleChange}
                  placeholder="Any Specific Dimensions (Optional)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200 md:col-span-2"
                />
                <input
                  name="materialUsed1"
                  value={form.materialUsed1}
                  onChange={handleChange}
                  placeholder="Material 1 (Required)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
                <input
                  name="materialUsed2"
                  value={form.materialUsed2}
                  onChange={handleChange}
                  placeholder="Material 2 (Optional)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                />
                <input
                  name="materialUsed3"
                  value={form.materialUsed3}
                  onChange={handleChange}
                  placeholder="Material 3 (Optional)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                />
                <input
                  name="finishType1"
                  value={form.finishType1}
                  onChange={handleChange}
                  placeholder="Finish 1 (Required)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
                <input
                  name="finishType2"
                  value={form.finishType2}
                  onChange={handleChange}
                  placeholder="Finish 2 (Optional)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                />
                <input
                  name="finishType3"
                  value={form.finishType3}
                  onChange={handleChange}
                  placeholder="Finish 3 (Optional)"
                  className="w-full border border-red-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-200"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">Media Uploads</h3>
                <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700">{filePreviews.length} selected</span>
              </div>
              <div className="rounded-xl border border-dashed border-red-200 bg-red-50/30 p-6 text-center">
                <p className="text-sm text-gray-600 mb-4">Upload product images, videos, or PDFs (minimum 1 file, up to 15 files, max 100MB each)</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 text-white font-semibold hover:bg-red-700"
                >
                  Upload Files
                </button>
                <input
                  ref={fileInputRef}
                  name="files"
                  type="file"
                  multiple
                  accept="image/*,video/*,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {filePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
                  {filePreviews.map((preview, index) => (
                    <div key={`${preview.file.name}-${index}`} className="rounded-xl border border-red-100 bg-white p-2.5 shadow-sm">
                      <div className="mb-2 text-xs font-semibold text-gray-700 truncate">{preview.file.name}</div>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPreview({
                            url: preview.url,
                            name: preview.file.name,
                            type: preview.file.type,
                            kind: getPreviewKind(preview.file),
                          })
                        }
                        className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100"
                      >
                        {preview.file.type.startsWith('video') ? (
                          <video src={preview.url} className="h-full w-full object-cover" />
                        ) : preview.file.type === 'application/pdf' || preview.file.name.toLowerCase().endsWith('.pdf') ? (
                          <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-gray-500">
                            PDF Document
                          </div>
                        ) : (
                          <img src={preview.url} alt={preview.file.name} className="h-full w-full object-cover" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="mt-2 w-full rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm space-y-3 text-sm text-gray-700">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-red-700">Declarations</h3>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="agreeTnc"
                  checked={form.agreeTnc}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 rounded border-red-300 text-red-600 focus:ring-red-500"
                />
                <span>I confirm that I have read and agree to the terms and conditions of IFDA.</span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="notAiGenerated"
                  checked={form.notAiGenerated}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 rounded border-red-300 text-red-600 focus:ring-red-500"
                />
                <span>I declare that this submission is original and not solely AI-generated.</span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="feasibleProduct"
                  checked={form.feasibleProduct}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 rounded border-red-300 text-red-600 focus:ring-red-500"
                />
                <span>I confirm this design is technically feasible for production and export readiness.</span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="technicalDrawingPresent"
                  checked={form.technicalDrawingPresent}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4 rounded border-red-300 text-red-600 focus:ring-red-500"
                />
                <span>I confirm that technical drawings/specifications are included in the submitted files.</span>
              </label>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-8">
          {step > 0 && (
            <button type="button" onClick={prev} className="px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50">
              Back
            </button>
          )}
          {step < steps.length - 1 && (
            <button
              type="button"
              onClick={next}
              disabled={!canGoNext}
              className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          )}
          {step === steps.length - 1 && (
            <button
              type="submit"
              disabled={!canSubmit}
              className="px-5 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          )}
        </div>
      </form>

      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              type="button"
              onClick={() => setSelectedPreview(null)}
              className="absolute -top-10 right-0 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-white"
            >
              Close
            </button>
            <div className="overflow-hidden rounded-xl bg-white">
              {selectedPreview.kind === 'image' ? (
                <img src={selectedPreview.url} alt={selectedPreview.name} className="w-full max-h-[80vh] object-contain" />
              ) : selectedPreview.kind === 'video' ? (
                <video src={selectedPreview.url} className="w-full max-h-[80vh]" controls autoPlay />
              ) : selectedPreview.kind === 'pdf' ? (
                <iframe src={selectedPreview.url} title={selectedPreview.name} className="w-full h-[80vh]" />
              ) : (
                <div className="p-6 text-sm text-gray-600">Preview unavailable for this file type.</div>
              )}
            </div>
            <div className="mt-3 text-right">
              <a
                href={selectedPreview.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
              >
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
