import { useEffect, useState } from 'react';
import axios from 'axios';
import { Linkedin } from 'lucide-react';
import { Footer } from '@/app/components/shared/Footer';

type JuryMember = {
  _id: string;
  email: string;
  name: string;
  designation: string;
  specialization: string;
  bio: string;
  image: string;
  linkedin?: string;
  order?: number;
};

export default function JuryPanel() {
  const [juryMembers, setJuryMembers] = useState<JuryMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({});
  const MOBILE_BIO_PREVIEW_LENGTH = 240;

  function getMobilePreview(text: string) {
    if (text.length <= MOBILE_BIO_PREVIEW_LENGTH) return text;
    return `${text.slice(0, MOBILE_BIO_PREVIEW_LENGTH).trimEnd()}...`;
  }

  function toggleBio(key: string) {
    setExpandedBios((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  useEffect(() => {
    axios
      .get('/api/users/jury-members')
      .then((res) => {
        const members = (res.data as JuryMember[]) || [];
        // Sort by order field (descending so newest comes first), then by creation date
        const sorted = [...members].sort((a, b) => (b.order || 0) - (a.order || 0));
        setJuryMembers(sorted);
        setLoading(false);
      })
      .catch(() => {
        setJuryMembers([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <main className="pt-32">
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Jury Panel</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Meet the experts evaluating excellence in furniture design, innovation, and craftsmanship.
              </p>
            </div>

            <div className="space-y-12">
              {loading && <p className="text-center text-gray-500">Loading jury members...</p>}
              {!loading && juryMembers.length === 0 && (
                <p className="text-center text-gray-500">Jury members will be announced soon.</p>
              )}
              {juryMembers.map((member, index) => (
                <div key={`${member._id}-${index}`} className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div>
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-32 h-32 object-cover rounded-full mb-4 mx-auto lg:mx-0"
                        />
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 text-center lg:text-left">{member.name}</h3>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} LinkedIn profile`}
                            className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-red-600 font-medium mb-4 text-center lg:text-left">{member.designation}</p>

                    </div>
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Detailed Bio</h4>
                      <p className="hidden lg:block text-gray-700 leading-relaxed">{member.bio}</p>
                      <div className="lg:hidden">
                        <p className="text-gray-700 leading-relaxed">
                          {expandedBios[`jury-${index}`] ? member.bio : getMobilePreview(member.bio)}
                        </p>
                        {member.bio.length > MOBILE_BIO_PREVIEW_LENGTH && (
                          <button
                            type="button"
                            onClick={() => toggleBio(`jury-${index}`)}
                            className="mt-2 text-sm font-semibold text-red-600"
                          >
                            {expandedBios[`jury-${index}`] ? 'Read less' : 'Read more'}
                          </button>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-1 mt-4">Specialization:</h4>
                      <p className="text-gray-700 leading-relaxed text-red-600">{member.specialization}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
