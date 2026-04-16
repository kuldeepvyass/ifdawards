import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { CATEGORY_PRODUCTS, CATEGORY_PRODUCTS_BY_CATEGORY } from '@/app/constants/categoryProducts';

type JuryMember = {
  _id: string;
  image: string;
  name: string;
  email: string;
  designation: string;
  bio: string;
  specialization: string;
  assignedProductNames: string[];
  linkedin?: string;
  order?: number;
};

type NewJuryForm = {
  name: string;
  email: string;
  designation: string;
  bio: string;
  specialization: string;
  linkedin: string;
};

const initialForm: NewJuryForm = {
  name: '',
  email: '',
  designation: '',
  bio: '',
  specialization: '',
  linkedin: '',
};

export default function AdminJuryMembers() {
  const [juryMembers, setJuryMembers] = useState<JuryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState<NewJuryForm>(initialForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [creating, setCreating] = useState(false);
  const [selectedProductNames, setSelectedProductNames] = useState<string[]>([]);
  const [editingAssignments, setEditingAssignments] = useState<Record<string, string[]>>({});
  const [savingAssignments, setSavingAssignments] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<NewJuryForm>(initialForm);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editSelectedProducts, setEditSelectedProducts] = useState<string[]>([]);

  const token = localStorage.getItem('token');

  async function loadData() {
    if (!token) return;
    setLoading(true);
    try {
      const juryRes = await axios.get('/api/admin/jury-members', { headers: { Authorization: `Bearer ${token}` } });
      setJuryMembers((juryRes.data as JuryMember[]) || []);
    } catch (error) {
      let message = 'Failed to load jury members';
      
      if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-expect-error axios response shape
        const status = error.response?.status;
        // @ts-expect-error axios response shape
        const data = error.response?.data;
        
        if (status === 401) {
          message = 'Unauthorized: Your session has expired. Please login again.';
        } else if (status === 403) {
          message = 'Forbidden: You do not have permission to view jury members.';
        } else {
          message = data?.message || `Error loading jury members: ${status}`;
        }
      } else if (error instanceof Error && error.message === 'Network Error') {
        message = 'Network error: Could not reach the server. Please check your connection.';
      }
      
      console.error('Load jury members error:', error);
      setJuryMembers([]);
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleProductForCreate(productName: string) {
    setSelectedProductNames((current) => (
      current.includes(productName)
        ? current.filter((item) => item !== productName)
        : [...current, productName]
    ));
  }

  function startEditAssignments(member: JuryMember) {
    setEditingAssignments((current) => ({
      ...current,
      [member._id]: member.assignedProductNames || [],
    }));
  }

  function toggleProductForMember(memberId: string, productName: string) {
    setEditingAssignments((current) => {
      const active = current[memberId] || [];
      return {
        ...current,
        [memberId]: active.includes(productName)
          ? active.filter((item) => item !== productName)
          : [...active, productName],
      };
    });
  }

  async function saveAssignments(memberId: string) {
    if (!token) return;
    const assignedProductNames = editingAssignments[memberId] || [];
    setSavingAssignments(memberId);
    try {
      const res = await axios.patch(
        `/api/admin/jury-members/${memberId}/products`,
        { assignedProductNames },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = res.data as JuryMember;
      setJuryMembers((current) => current.map((member) => (member._id === memberId ? updated : member)));
      setEditingAssignments((current) => {
        const clone = { ...current };
        delete clone[memberId];
        return clone;
      });
    } catch (error) {
      let message = 'Failed to save product assignments';
      
      if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-expect-error axios response shape
        const status = error.response?.status;
        // @ts-expect-error axios response shape
        const data = error.response?.data;
        
        if (status === 400) {
          message = `Invalid products: ${data?.message || 'Some products could not be assigned'}`;
        } else if (status === 401) {
          message = 'Unauthorized: Your session has expired. Please login again.';
        } else if (status === 404) {
          message = 'Jury member not found: It may have been deleted.';
        } else if (status === 500) {
          message = `Server error: ${data?.message || 'Failed to save assignments'}`;
        } else {
          message = data?.message || `Error (${status}): Failed to save assignments`;
        }
      }
      
      console.error('Save assignments error:', error);
      alert(message);
    } finally {
      setSavingAssignments(null);
    }
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    if (!imageFile) {
      alert('Please upload jury image');
      return;
    }

    setCreating(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('files', imageFile);
      const uploadRes = await axios.post('/api/users/upload', uploadFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const uploadedImage = (uploadRes.data as { files?: { fullUrl?: string }[] })?.files?.[0]?.fullUrl || '';
      if (!uploadedImage) {
        throw new Error('Image upload failed');
      }

      const res = await axios.post(
        '/api/admin/jury-members',
        {
          ...form,
          image: uploadedImage,
          email: form.email.trim().toLowerCase(),
          assignedProductNames: selectedProductNames,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const payload = res.data as { juryMember: JuryMember; defaultPassword: string };
      setJuryMembers((current) => [payload.juryMember, ...current]);
      alert(`Jury member created. Default password: ${payload.defaultPassword}`);
      setForm(initialForm);
      setImageFile(null);
      setImagePreview('');
      setSelectedProductNames([]);
      setShowCreate(false);
    } catch (error) {
      let message = 'Failed to create jury member';
      
      if (error instanceof Error) {
        if (error.message === 'Image upload failed') {
          message = 'Image upload failed: Could not save the jury member photo. Please try a different image.';
        } else if (error.message === 'Network Error') {
          message = 'Network error: Could not reach the server. Please check your connection.';
        } else {
          message = error.message;
        }
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-expect-error axios response shape
        const status = error.response?.status;
        // @ts-expect-error axios response shape
        const data = error.response?.data;
        
        if (status === 400) {
          message = `Invalid data: ${data?.message || 'Please check all required fields'}`;
        } else if (status === 401) {
          message = 'Unauthorized: Your session has expired. Please login again.';
        } else if (status === 403) {
          message = 'Forbidden: You do not have permission to create jury members.';
        } else if (status === 500) {
          message = `Server error: ${data?.message || 'The server encountered an error while creating the jury member.'}`;
        } else {
          message = data?.message || `Error (${status}): Failed to create jury member`;
        }
      }
      
      console.error('Create jury member error:', error);
      alert(message);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(memberId: string) {
    if (!token) return;
    const isConfirmed = window.confirm('Delete this jury member? This will remove jury login as well.');
    if (!isConfirmed) return;

    setDeletingId(memberId);
    try {
      await axios.delete(`/api/admin/jury-members/${memberId}`, { headers: { Authorization: `Bearer ${token}` } });
      setJuryMembers((current) => current.filter((member) => member._id !== memberId));
      setEditingAssignments((current) => {
        const clone = { ...current };
        delete clone[memberId];
        return clone;
      });
    } catch (error) {
      let message = 'Failed to delete jury member';
      
      if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-expect-error axios response shape
        const status = error.response?.status;
        // @ts-expect-error axios response shape
        const data = error.response?.data;
        
        if (status === 401) {
          message = 'Unauthorized: Your session has expired. Please login again.';
        } else if (status === 403) {
          message = 'Forbidden: You do not have permission to delete jury members.';
        } else if (status === 404) {
          message = 'Jury member not found: It may have already been deleted.';
        } else if (status === 500) {
          message = `Server error: ${data?.message || 'The server encountered an error while deleting.'}`;
        } else {
          message = data?.message || `Error (${status}): Failed to delete jury member`;
        }
      } else {
        message = error instanceof Error ? error.message : 'Unknown error occurred';
      }
      
      console.error('Delete jury member error:', error);
      alert(message);
    } finally {
      setDeletingId(null);
    }
  }

  async function moveJuryMember(currentIndex: number, direction: 'up' | 'down') {
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= juryMembers.length) {
      return;
    }

    setReordering(true);
    try {
      const newMembers = [...juryMembers];
      const temp = newMembers[currentIndex];
      newMembers[currentIndex] = newMembers[newIndex];
      newMembers[newIndex] = temp;

      // Update order values
      const orders = newMembers.map((member, index) => ({
        _id: member._id,
        order: newMembers.length - index, // Higher index = higher order value
      }));

      console.log('Sending reorder request with:', { orders });

      const response = await axios.patch(
        '/api/admin/jury-members/reorder',
        { orders },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Reorder response:', response.data);
      setJuryMembers(newMembers);
    } catch (error) {
      let errorMessage = 'Failed to reorder jury members';
      
      // Enhanced debugging logs
      console.error('=== REORDER ERROR DEBUG INFO ===');
      console.error('Full error object:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', error ? Object.keys(error) : 'null');
      
      if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-expect-error axios error shape
        const response = error.response;
        console.error('Response status:', response?.status);
        console.error('Response statusText:', response?.statusText);
        console.error('Response data:', response?.data);
        console.error('Response headers:', response?.headers);
        
        // @ts-expect-error axios error shape
        const status = error.response?.status;
        // @ts-expect-error axios error shape
        const data = error.response?.data;
        
        if (status === 400) {
          errorMessage = `Invalid request: ${data?.message || 'The data format is invalid'}`;
        } else if (status === 401) {
          errorMessage = 'Unauthorized: Your session has expired. Please login again.';
        } else if (status === 403) {
          errorMessage = 'Forbidden: You do not have permission to reorder jury members.';
        } else if (status === 404) {
          errorMessage = 'Not found: One or more jury members could not be found.';
        } else if (status === 500) {
          errorMessage = `Server error: ${data?.message || 'The server encountered an error while saving the order.'}`;
        } else {
          errorMessage = data?.message || `Error (${status}): Failed to reorder jury members`;
        }
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        if (error.message === 'Network Error') {
          errorMessage = 'Network error: Could not reach the server. Please check your connection.';
        } else {
          errorMessage = error.message;
        }
      }

      console.error('Final error message:', errorMessage);
      console.error('=== END DEBUG INFO ===');
      alert(errorMessage);
    } finally {
      setReordering(false);
    }
  }

  function startEditingMember(member: JuryMember) {
    setEditingMemberId(member._id);
    setEditForm({
      name: member.name,
      email: member.email,
      designation: member.designation,
      bio: member.bio,
      specialization: member.specialization,
      linkedin: member.linkedin || '',
    });
    setEditImagePreview(member.image);
    setEditImageFile(null);
    setEditSelectedProducts(member.assignedProductNames || []);
  }

  function cancelEditingMember() {
    setEditingMemberId(null);
    setEditForm(initialForm);
    setEditImageFile(null);
    setEditImagePreview('');
    setEditSelectedProducts([]);
  }

  async function handleUpdateMember(e: FormEvent) {
    e.preventDefault();
    if (!token || !editingMemberId) return;

    setUpdatingId(editingMemberId);
    try {
      let uploadedImage = editImagePreview;

      // Upload new image if selected
      if (editImageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('files', editImageFile);
        const uploadRes = await axios.post('/api/users/upload', uploadFormData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        uploadedImage = (uploadRes.data as { files?: { fullUrl?: string }[] })?.files?.[0]?.fullUrl || '';
        if (!uploadedImage) {
          throw new Error('Image upload failed');
        }
      }

      const res = await axios.patch(
        `/api/admin/jury-members/${editingMemberId}`,
        {
          name: editForm.name,
          designation: editForm.designation,
          bio: editForm.bio,
          specialization: editForm.specialization,
          linkedin: editForm.linkedin,
          image: uploadedImage,
          assignedProductNames: editSelectedProducts,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedMember = res.data as JuryMember;
      setJuryMembers((current) =>
        current.map((member) => (member._id === editingMemberId ? updatedMember : member))
      );
      alert('Jury member updated successfully');
      cancelEditingMember();
    } catch (error) {
      let message = 'Failed to update jury member';
      
      if (error instanceof Error) {
        if (error.message === 'Image upload failed') {
          message = 'Image upload failed: Could not save the new photo. Please try a different image.';
        } else if (error.message === 'Network Error') {
          message = 'Network error: Could not reach the server. Please check your connection.';
        } else {
          message = error.message;
        }
      } else if (typeof error === 'object' && error !== null && 'response' in error) {
        // @ts-expect-error axios response shape
        const status = error.response?.status;
        // @ts-expect-error axios response shape
        const data = error.response?.data;
        
        if (status === 400) {
          message = `Invalid data: ${data?.message || 'Please check all required fields'}`;
        } else if (status === 401) {
          message = 'Unauthorized: Your session has expired. Please login again.';
        } else if (status === 403) {
          message = 'Forbidden: You do not have permission to update jury members.';
        } else if (status === 404) {
          message = 'Jury member not found: It may have been deleted.';
        } else if (status === 500) {
          message = `Server error: ${data?.message || 'The server encountered an error while updating.'}`;
        } else {
          message = data?.message || `Error (${status}): Failed to update jury member`;
        }
      }
      
      console.error('Update jury member error:', error);
      alert(message);
    } finally {
      setUpdatingId(null);
    }
  }

  function handleImageInput(file: File | null) {
    if (!file) {
      setImageFile(null);
      setImagePreview('');
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function renderGroupedProductCheckboxes(
    selectedProducts: string[],
    onToggle: (productName: string) => void
  ) {
    return (
      <div className="space-y-4">
        {CATEGORY_PRODUCTS_BY_CATEGORY.map((group) => (
          <div key={group.category} className="rounded-lg border border-red-100 p-3">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-red-700">{group.category}</p>
            <div className="space-y-2">
              {group.products.map((productName) => (
                <label key={productName} className="flex items-start gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(productName)}
                    onChange={() => onToggle(productName)}
                    className="mt-1"
                  />
                  <span className="font-medium">{productName}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (loading) {
    return <div className="text-gray-600">Loading jury members...</div>;
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-red-600">Jury Members</h2>
        <button
          type="button"
          onClick={() => setShowCreate((current) => !current)}
          className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          {showCreate ? 'Close Form' : 'Add New Jury'}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={handleCreate} className="mb-6 rounded-xl border border-red-100 bg-white p-5">
          <h3 className="text-lg font-semibold text-gray-900">Create Jury Member</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-800">Jury Image</label>
              <input
                required
                type="file"
                accept="image/*"
                onChange={(e) => handleImageInput(e.target.files?.[0] || null)}
                className="w-full rounded-lg border border-red-200 px-4 py-2"
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-3 h-20 w-20 rounded-full border border-red-100 object-cover" />
              )}
            </div>
            <input
              required
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm((current) => ({ ...current, name: e.target.value }))}
              className="rounded-lg border border-red-200 px-4 py-2"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
              className="rounded-lg border border-red-200 px-4 py-2"
            />
            <input
              required
              type="text"
              placeholder="Designation"
              value={form.designation}
              onChange={(e) => setForm((current) => ({ ...current, designation: e.target.value }))}
              className="rounded-lg border border-red-200 px-4 py-2"
            />
            <input
              type="url"
              placeholder="LinkedIn Profile URL (optional)"
              value={form.linkedin}
              onChange={(e) => setForm((current) => ({ ...current, linkedin: e.target.value }))}
              className="rounded-lg border border-red-200 px-4 py-2"
            />
            <textarea
              required
              placeholder="Bio"
              value={form.bio}
              onChange={(e) => setForm((current) => ({ ...current, bio: e.target.value }))}
              className="rounded-lg border border-red-200 px-4 py-2 md:col-span-2"
              rows={4}
            />
            <textarea
              required
              placeholder="Specialization"
              value={form.specialization}
              onChange={(e) => setForm((current) => ({ ...current, specialization: e.target.value }))}
              className="rounded-lg border border-red-200 px-4 py-2 md:col-span-2"
              rows={2}
            />
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-800">Assign Products</p>
            <div className="mt-2 max-h-56 overflow-auto rounded-lg border border-red-100 p-3 space-y-2">
              {renderGroupedProductCheckboxes(selectedProductNames, toggleProductForCreate)}
            </div>
          </div>

          <button
            type="submit"
            disabled={creating}
            className="mt-5 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {creating ? 'Creating...' : 'Create Jury Member'}
          </button>
        </form>
      )}

      {editingMemberId && (
        <form onSubmit={handleUpdateMember} className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
          <h3 className="text-lg font-semibold text-gray-900">Update Jury Member</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-gray-800">Jury Image (Optional - leave empty to keep current)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setEditImageFile(e.target.files[0]);
                    setEditImagePreview(URL.createObjectURL(e.target.files[0]));
                  }
                }}
                className="w-full rounded-lg border border-blue-200 px-4 py-2"
              />
              {editImagePreview && (
                <img src={editImagePreview} alt="Preview" className="mt-3 h-20 w-20 rounded-full border border-blue-100 object-cover" />
              )}
            </div>
            <input
              required
              type="text"
              placeholder="Name"
              value={editForm.name}
              onChange={(e) => setEditForm((current) => ({ ...current, name: e.target.value }))}
              className="rounded-lg border border-blue-200 px-4 py-2"
            />
            <div className="rounded-lg border border-blue-200 px-4 py-2 bg-gray-100 flex items-center">
              <span className="text-sm text-gray-600">{editForm.email}</span>
              <span className="ml-auto text-xs text-gray-500">(non-editable)</span>
            </div>
            <input
              required
              type="text"
              placeholder="Designation"
              value={editForm.designation}
              onChange={(e) => setEditForm((current) => ({ ...current, designation: e.target.value }))}
              className="rounded-lg border border-blue-200 px-4 py-2"
            />
            <input
              type="url"
              placeholder="LinkedIn Profile URL (optional)"
              value={editForm.linkedin}
              onChange={(e) => setEditForm((current) => ({ ...current, linkedin: e.target.value }))}
              className="rounded-lg border border-blue-200 px-4 py-2"
            />
            <textarea
              required
              placeholder="Bio"
              value={editForm.bio}
              onChange={(e) => setEditForm((current) => ({ ...current, bio: e.target.value }))}
              className="rounded-lg border border-blue-200 px-4 py-2 md:col-span-2"
              rows={4}
            />
            <textarea
              required
              placeholder="Specialization"
              value={editForm.specialization}
              onChange={(e) => setEditForm((current) => ({ ...current, specialization: e.target.value }))}
              className="rounded-lg border border-blue-200 px-4 py-2 md:col-span-2"
              rows={2}
            />
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-800">Assign Products</p>
            <div className="mt-2 max-h-56 overflow-auto rounded-lg border border-blue-100 p-3 space-y-2">
              {renderGroupedProductCheckboxes(editSelectedProducts, (productName) => {
                setEditSelectedProducts((current) =>
                  current.includes(productName)
                    ? current.filter((item) => item !== productName)
                    : [...current, productName]
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 mt-5">
            <button
              type="submit"
              disabled={updatingId !== null}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {updatingId ? 'Updating...' : 'Update Jury Member'}
            </button>
            <button
              type="button"
              onClick={cancelEditingMember}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {juryMembers.map((member) => {
          const isEditing = Boolean(editingAssignments[member._id]);
          const currentAssigned = isEditing ? editingAssignments[member._id] || [] : member.assignedProductNames || [];

          return (
            <article key={member._id} className="rounded-xl border border-red-100 bg-white p-5">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <img src={member.image} alt={member.name} className="h-24 w-24 rounded-full object-cover border border-red-100 bg-gray-100" />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-sm text-gray-600">{member.email}</p>
                      <p className="text-sm font-medium text-red-600 mt-1">{member.designation}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => startEditingMember(member)}
                        disabled={editingMemberId !== null}
                        className="rounded-lg border border-green-200 px-3 py-2 text-sm text-green-700 hover:bg-green-50 disabled:opacity-60"
                      >
                        ✎ Update
                      </button>
                      <button
                        type="button"
                        onClick={() => { const currentIndex = juryMembers.findIndex(m => m._id === member._id); moveJuryMember(currentIndex, 'up'); }}
                        disabled={reordering || juryMembers.findIndex(m => m._id === member._id) === 0}
                        className="rounded-lg border border-blue-200 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 disabled:opacity-60"
                      >
                        ↑ Move Up
                      </button>
                      <button
                        type="button"
                        onClick={() => { const currentIndex = juryMembers.findIndex(m => m._id === member._id); moveJuryMember(currentIndex, 'down'); }}
                        disabled={reordering || juryMembers.findIndex(m => m._id === member._id) === juryMembers.length - 1}
                        className="rounded-lg border border-blue-200 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 disabled:opacity-60"
                      >
                        ↓ Move Down
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(member._id)}
                        disabled={deletingId === member._id}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        {deletingId === member._id ? 'Deleting...' : 'Delete Jury'}
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-700">{member.bio}</p>
                  <p className="mt-2 text-sm text-red-700"><span className="font-semibold">Specialization:</span> {member.specialization}</p>

                  <div className="mt-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-gray-800">Assigned Products</p>
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => startEditAssignments(member)}
                          className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                        >
                          Update Products
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setEditingAssignments((current) => {
                              const clone = { ...current };
                              delete clone[member._id];
                              return clone;
                            })}
                            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={() => saveAssignments(member._id)}
                            disabled={savingAssignments === member._id}
                            className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                          >
                            {savingAssignments === member._id ? 'Saving...' : 'Save'}
                          </button>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <div className="mt-2 max-h-56 overflow-auto rounded-lg border border-red-100 p-3 space-y-2">
                        {renderGroupedProductCheckboxes(currentAssigned, (productName) => toggleProductForMember(member._id, productName))}
                      </div>
                    ) : (
                      <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700">
                        {member.assignedProductNames.length === 0 && <li>No products assigned.</li>}
                        {member.assignedProductNames.map((productName) => (
                          <li key={`${member._id}-${productName}`}>{productName}</li>
                        ))}
                        {member.assignedProductNames.filter((productName) => !CATEGORY_PRODUCTS.includes(productName)).length > 0 && (
                          <li className="list-none text-xs text-amber-600">
                            Some older assigned products are not in current category master list.
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
