import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Linkedin, Mail } from "lucide-react";
import { Footer } from "@/app/components/shared/Footer";
import SurajGoyalImg from "../../assets/images/suraj-goyal.jpeg";
import dhirajSinhaImg from "../../assets/images/dheerajnsinha.jpeg";
import PiyushKumarUppalImg from "../../assets/images/piyush kumar uppal .jpeg";
import JasjitRandhawaImg from "../../assets/images/jasjit randhawa.jpeg";
import VivekPalSinghImg from "../../assets/images/vivek pal singh.jpeg";
import MartinSchroedelImg from "../../assets/images/Martin Schroedel.jpeg";
import VinamraKumarGahalautImg from "../../assets/images/Vinamra Kumar Gahalaut.jpeg";
import PradeepKumarImg from "../../assets/images/Pradeep Kumar.jpeg";
import SagarGoyalImg from "../../assets/images/Sagar Goyal.jpeg";
import MahakKansaraImg from "../../assets/images/mahak kansara.jpeg";
import pramondrana from "../../assets/images/Pramod Rana.jpeg";
import rahulmehtaImg from "../../assets/images/rahul mehta.jpeg";
import HimanshiSharmaImg from "../../assets/images/himanshi sharma.jpeg";

function ProfileImage({ src, name, className }: { src: string; name: string; className: string }) {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=fee2e2&color=b91c1c&size=256`;
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <img
      src={imageSrc}
      alt={name}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        if (imageSrc !== fallbackAvatar) {
          setImageSrc(fallbackAvatar);
        }
      }}
    />
  );
}

type TeamMember = {
  name: string;
  title: string;
  specialization: string;
  bio: string;
  image: string;
  linkedin?: string;
};


export function CoreTeam() {
  const MOBILE_BIO_PREVIEW_LENGTH = 240;
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({});

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

  const coreTeamLeads: TeamMember[] = [
    {
      name: "Suraj Goyal",
      title: "Founder & Core Team Lead | Ecosystem Development",
      specialization: "Furniture finishing excellence, ecosystem building, exporter enablement, industry collaboration",
      bio: "Suraj Goyal is an IIT BTech professional and CEO of Marudhar Chemicals, deeply passionate about the furniture industry and committed to helping exporters and manufacturers achieve finishing excellence. He brings extensive experience in building high-impact ecosystems across India and South East Asia. Suraj Goyal is driven by a deep passion for the furniture industry and its long-term growth. He has led ecosystem initiatives across India and South East Asia for global software companies including SAP, Business Objects, and Teradata. Bringing that experience into furniture, Suraj has successfully conducted buyer–seller conventions, workshops, and knowledge-sharing programs featuring leading global buyers. As the Founder and Core Team Lead of IFDA, he aims to be a catalyst of change—working for the greater good of the industry by strengthening capabilities, improving quality standards, and enabling 10X growth for furniture exporters and manufacturers.",
      image: SurajGoyalImg,
      linkedin: "https://www.linkedin.com/in/suraj/"

    },
    {
      name: "Piyush Kumar Uppal",
      title: "Core Team Lead | Jury Onboarding & Engagement",
      specialization: "Global sourcing, quality assurance, compliance (safety & performance), leadership, Lean management",
      bio: "Piyush Kumar Uppal is the Country Head – India at Jofran Inc., with rich leadership experience across furniture, home products, and retail, serving global markets including Europe, USA, and the UK. He supports IFDA by strengthening sourcing excellence, Jury onboarding, and export readiness initiatives for manufacturers. Piyush Kumar Uppal is a seasoned leader with extensive experience in the furniture, home products, and retail industry across Europe, USA, and UK markets. He specializes in quality and sourcing, with strong expertise in legal requirements including safety and performance standards for furniture, lighting, and hard-goods. His career journey—from factory operations to regional leadership and country management—has built a strong foundation in execution and leadership. Backed by Six Sigma (Lean Management) and an MBA in International Business, Piyush supports IFDA with global-quality thinking and result-driven initiatives.",
      image: PiyushKumarUppalImg,
      linkedin: "https://www.linkedin.com/in/piyush-kumar-uppal-51000357/"
    },
    {
      name: "Pramod Rana",
      title: "Core Team Lead | Jury Onboarding & Design Engagement",
      specialization: "Furniture sourcing, product development, vendor management, quality management, export sourcing.",
      bio: "Pramod Rana is a seasoned professional in the furniture and home products industry with extensive experience in sourcing, product development, and supply chain management. As the Founding Director of Medoc Sourcing, he works closely with international buyers and Indian manufacturers to develop export-ready products and streamline sourcing operations. With offices across key manufacturing hubs including Jodhpur, Jaipur, Karur, and Moradabad, Medoc Sourcing supports global brands through vendor development, quality management, and end-to-end order execution. Pramod brings deep insights into furniture manufacturing ecosystems, product trends, and global buyer expectations, contributing valuable industry expertise to the iFDA initiative.",
      image: pramondrana,
      linkedin: "https://www.linkedin.com/in/pramod-rana-b71981b/"
    },
    {
      name: "Rahul Mehta",
      title: "Core Team Lead | Skill and ECO System Development",
      specialization: "Furniture Industry Development, Skill Ecosystem, Industry Collaboration, Talent Development",
      bio: "Rahul Mehta is a seasoned industry leader with nearly two decades of cross-industry experience spanning advisory, trading, event management, interiors, furniture manufacturing, and skill development. An alumnus of Shri Ram College of Commerce (SRCC), he has been closely associated with the Furniture & Fittings Skill Council (FFSC) since its early inception and has played a key role in shaping India’s furniture and interiors skilling ecosystem. Prior to FFSC, Rahul served as the CEO of IEVO, where he led the transformation of the company into a large integrated contract furniture manufacturing operation with advanced production capabilities and a workforce of over 600 professionals. Currently serving as the CEO of FFSC, he continues to drive industry collaboration, workforce development, and structured skill initiatives that strengthen India’s furniture and interiors sector. Through his involvement with IFDA, Rahul brings valuable insights into industry standards, manufacturing ecosystems, and the future of skilled talent in the design and furniture industry.", 
      image: rahulmehtaImg,
      linkedin: "https://www.linkedin.com/in/rahulmehta-srcc/"
    },
    {
      name: "Jasjit Randhawa",
      title: "Core Team Lead | Global Sourcing & Product Development",
      specialization: "Sourcing, product development, retail readiness, negotiation, business development",
      bio: "Jasjit Randhawa is the Director – Sourcing (India) at Ashley Furniture Industries, bringing strong expertise in sourcing, product development, and retail-focused execution. He supports IFDA by strengthening manufacturer alignment with global buyer expectations and scalable sourcing systems. Jasjit Randhawa has extensive experience in global sourcing and product development for the furniture industry. Based in Langley, BC, Canada, he brings a strong understanding of retail requirements, supplier development, and market-driven execution. His skill set includes product development, retail, new business development, marketing strategy, and negotiation. At IFDA, Jasjit supports initiatives that help manufacturers strengthen sourcing capabilities, improve product-market fit, and build long-term readiness for international markets through structured processes and stronger collaboration.",
      image: JasjitRandhawaImg,
      linkedin: "https://www.linkedin.com/in/jasjit-randhawa-4836346/"
    },
    {
      name: "Vivek Pal Singh",
      title: "Core Team Lead | Jury Onboarding & skill development",
      specialization: "International business development, sourcing, distribution, partnerships",
      bio: "Vivek Pal Singh is the Director for Indian Touch, brings strong expertise in international business development, global partnerships, and distribution network building. He supports IFDA by strengthening international collaboration, Jury onboarding, market insights, and strategic skill building initiatives. Vivek Pal Singh is a seasoned international business development professional with extensive experience in building commercial strategies across global markets. He has led the creation and management of distribution networks in France and internationally, negotiated strategic partnerships with global suppliers, and worked on market analysis, sourcing, production follow-up, and product development. His achievements include enabling key business partnerships, supporting international expansion initiatives, and contributing to production planning for multiple furniture and lifestyle brands. At IFDA, Vivek supports global collaboration and strategic partnerships that strengthen the furniture ecosystem.",
        image: VivekPalSinghImg,
        linkedin: "https://www.linkedin.com/in/vivek-pal-singh-992032a1/"
         },
    
    {
      name: "Martin Schroedel",
      title: "Core Team Lead | Sourcing & Supplier Development",     
      specialization: "Global product quality, compliance, inspections, supplier standards, process optimization",
      bio: "Martin Schroedel is the Director – Global Product Quality & Compliance in germany. He brings deep expertise in product standards, compliance systems, and supplier quality management. At IFDA, he supports the ecosystem by strengthening export-level quality thinking, process discipline, and compliance readiness. Martin Schroedel is a master carpenter with a Bachelor of Arts in Business Management, he combines strong technical expertise with business understanding to drive sustainable, high-quality, design-oriented furniture solutions. Working closely with suppliers and internal teams, Martin focuses on continuously enhancing quality systems and compliance to build customer trust across Europe. At IFDA, he contributes a global perspective on quality assurance and export readiness.",
        image: MartinSchroedelImg,
        linkedin: "https://www.linkedin.com/in/martin-schroedel/"
    },
    {
      name: "Dhiraj Sinha",
      title: "Core Team Lead | Sourcing & Supplier Development",
      specialization: "Sourcing, QC systems, product development, order management, export execution",
      bio: "Dheeraj Sinha is the Founder Director at IndiKasaExim.com and a sourcing and design consultant specializing in premium wood furniture, metal décor, carpets, and related home categories. He supports IFDA by strengthening export-focused sourcing systems, quality discipline, and manufacturer capability development. Dheeraj Sinha is Co-Founder of IndiKasa Exim Private Limited, established in 2010 as a sourcing and quality inspection partner for international buyers. With a trusted presence across Europe, Australia, and the USA, his team manages 30–40 high-cube containers per month from operations in Jodhpur, Delhi, and Mumbai. Dheeraj works closely with over 30 manufacturing partners and conducts regular workshops to strengthen quality culture and execution discipline. His focus on transparency, structured reporting, and long-term relationships ensures buyers receive consistent quality, timely delivery, and strong value.",
        image: dhirajSinhaImg,
        linkedin: "https://www.linkedin.com/in/sinhadhiraj/"
    },
    {
      name: "Vinamra Kumar Gahalaut",
      title: "Core Team Lead | Sourcing & Supplier Development",
      specialization: "Sourcing, quality systems, product development, factory process improvement",
      bio: "Vinamra Kumar Gahalaut is Sr. Director – Sourcing, Quality & Customer Service with Simpli Home Furniture, he has 25 years of experience across supply chain management, merchandising, product development, quality, and brand management in the Home Décor and Furniture industry. He supports IFDA by strengthening quality systems, factory readiness, and customer-focused execution. Vinamra Kumar Gahalaut has worked with leading trading companies and global brands in the international Home Décor and Furniture ecosystem. His core strength lies in upgrading factory procedures, products, packaging, and execution systems to meet higher customer expectations. Vinamra has introduced practical improvements in day-to-day factory operations that enhance output, efficiency, and quality across furniture, home décor, and housewares.",
      image: VinamraKumarGahalautImg,
      linkedin: "https://www.linkedin.com/in/vinamra-kumar-gahalaut-46854a63/"
    },
    {
      name: "Himanshi Sharma",
      title: "Core Team Lead | Sourcing & Supplier Development",
      specialization: "Global Sourcing, Product Development, Supplier Collaboration, Design & Home Décor Markets",
      bio: "Himanshi Sharma is the CEO of Aaida Trading Services (ATS), where she works closely with international buyers across furniture, lighting, textiles, and home décor. With a Master’s degree in Mass Communication, her work bridges product development, supplier collaboration, and global sourcing, connecting Indian manufacturing capabilities with key international markets including the USA, Europe, UAE, and the UK. Through her active engagement with manufacturing clusters and creative communities, she supports the development of innovative product ideas and market-ready concepts. Himanshi also maintains strong connections with media and influencer networks, helping highlight emerging opportunities within the design and sourcing ecosystem while driving end-to-end marketing and industry visibility.",
      image: HimanshiSharmaImg,
      linkedin: "https://www.linkedin.com/in/ceohimaanshiisharma/"
    }
  ];

  const designMentors: TeamMember[] = [
    {
      name: "Pradeep Kumar",
      title: "Design Mentor | Product & Furniture Innovation",
      specialization: "Product design, design strategy, user-centered solutions, market-aligned development",
      bio: "Pradeep Kumar is a seasoned design professional with over 13 years of experience in product design, design thinking, global sourcing, and retail buying. He supports IFDA by coaching teams on design strategy, innovation, and global product development readiness. Pradeep Kumar is a highly experienced design mentor with a deep background in furniture and product design, having worked across end-to-end concept-to-execution development for hard goods and lifestyle product categories. He holds a Bachelor's degree in Furniture and Interior Design from the National Institute of Design (NID), Ahmedabad, India and has spent over a decade shaping functional, aesthetically balanced, and market-aligned products. Pradeep's expertise blends design thinking with practical production and sourcing considerations to help teams innovate responsibly and efficiently. At IFDA, he guides manufacturers and designers to elevate product offerings, align with global trends, and strengthen their design capabilities.",
      image: PradeepKumarImg,
      linkedin: "https://www.linkedin.com/in/pradeepkumar3919b449/"
      },
    {
      name: "Sagar Goyal",
      title: "Design Mentor | Product & Furniture Design",
      specialization: "Product & furniture design, user-centered design, photography, branding & visual identity",
      bio: "Sagar Goyal is an experienced design professional with a strong background in product and furniture design. He supports IFDA by mentoring teams on user-centered design thinking, product development, and design communication that aligns with global market expectations. Sagar Goyal is an experienced designer with a demonstrated history of working in the design industry. His expertise includes product and furniture design, user-centered design, photography, and visual identity development such as logo design and branding. With a strong blend of creativity and technology, he brings a practical approach to design execution and presentation. Sagar holds a BCA (Bachelor of Computer Applications) in IT from Bhopal University of Journalism and Communication, which strengthens his ability to integrate design with modern tools and digital workflows. At IFDA, he mentors teams to develop market-relevant products and stronger design capabilities.",
      image: SagarGoyalImg,
      linkedin: "https://www.linkedin.com/in/sagar-goyal-a3b95770/"
    }
  ];

  const supportProfessionals: TeamMember[] = [
    {
      name: "Mahak Kansara",
      title: "Advocate – Intellectual Property & Commercial Law",
      specialization: "Intellectual Property Law, Commercial Laws, IP Strategy",
      bio: "Mahak Kansara is an Advocate registered with the Bar Council of India, specialising in Intellectual Property Law and Commercial Laws. With over four years of experience, she has worked across diverse industries including Product Design, FMCG and Agri-Tech, advising on IP rights, entertainment law, and general contracts. She supports start-ups, inventors, and brand owners in building effective IP strategies for Patents, Trademarks, Industrial Designs, and Copyright protection. Mahak has authored articles for reputed publications and also runs her own YouTube channel, featuring notable voices from the creative and legal fields.",
      image: MahakKansaraImg,
      linkedin: "https://www.linkedin.com/in/mahakkansara/"
    }
  ];

  return (
    <div className="min-h-screen">
      <main className="pt-32">
        {/* Hero Section */}
        {/* <section className="py-20 px-4 bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl mb-6 text-red-600 font-bold">IFDA Core Team</h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Meet the experienced professionals driving IFDA's mission to strengthen India's furniture export ecosystem
            </p>
          </div>
        </section> */}

        {/* Core Team Leads */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Core Team Leads</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Industry leaders guiding IFDA's strategic initiatives and ecosystem development
              </p>
            </div>

            <div className="space-y-12">
              {coreTeamLeads.map((member, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div className="lg:col-span-1">
                        <ProfileImage
                          src={member.image}
                          name={member.name}
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
                      <p className="text-red-600 font-medium mb-4 text-center lg:text-left">{member.title}</p>
                      <div className="text-center lg:text-left">
                        <p className="text-sm text-gray-600 mb-2">Specialization:</p>
                        <p className="text-sm text-gray-700">{member.specialization}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Bio</h4>
                      <p className="hidden lg:block text-gray-700 leading-relaxed">{member.bio}</p>
                      <div className="lg:hidden">
                        <p className="text-gray-700 leading-relaxed">
                          {expandedBios[`core-${index}`] ? member.bio : getMobilePreview(member.bio)}
                        </p>
                        {member.bio.length > MOBILE_BIO_PREVIEW_LENGTH && (
                          <button
                            type="button"
                            onClick={() => toggleBio(`core-${index}`)}
                            className="mt-2 text-sm font-semibold text-red-600"
                          >
                            {expandedBios[`core-${index}`] ? 'Read less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design Mentors */}
        <section className="py-20 px-4 bg-red-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Design Mentors</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Expert design professionals mentoring teams on innovation and global product development
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {designMentors.map((mentor, index) => (
                <div key={index} className="bg-white rounded-lg p-8 border border-gray-200">
                  <div className="text-center mb-6">
                    <div>
                      <ProfileImage
                        src={mentor.image}
                        name={mentor.name}
                        className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto"
                      />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{mentor.name}</h3>
                      {mentor.linkedin && (
                        <a
                          href={mentor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${mentor.name} LinkedIn profile`}
                          className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                    <p className="text-red-600 font-medium mb-4">{mentor.title}</p>
                    <p className="text-sm text-gray-600 mb-2">Specialization:</p>
                    <p className="text-sm text-gray-700">{mentor.specialization}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Bio</h4>
                    <p className="hidden lg:block text-gray-700 leading-relaxed text-sm">{mentor.bio}</p>
                    <div className="lg:hidden">
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {expandedBios[`mentor-${index}`] ? mentor.bio : getMobilePreview(mentor.bio)}
                      </p>
                      {mentor.bio.length > MOBILE_BIO_PREVIEW_LENGTH && (
                        <button
                          type="button"
                          onClick={() => toggleBio(`mentor-${index}`)}
                          className="mt-2 text-sm font-semibold text-red-600"
                        >
                          {expandedBios[`mentor-${index}`] ? 'Read less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Collaboration & Support Professionals */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6 text-red-600">Collaboration & Support Professionals</h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Legal and professional experts supporting IFDA participants with intellectual property, compliance, and commercial readiness
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {supportProfessionals.map((professional, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <div>
                        <ProfileImage
                          src={professional.image}
                          name={professional.name}
                          className="w-32 h-32 object-cover rounded-full mb-4 mx-auto lg:mx-0"
                        />
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 text-center lg:text-left">{professional.name}</h3>
                        {professional.linkedin && (
                          <a
                            href={professional.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${professional.name} LinkedIn profile`}
                            className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                          >
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-red-600 font-medium mb-4 text-center lg:text-left">{professional.title}</p>
                      <div className="text-center lg:text-left">
                        <p className="text-sm text-gray-600 mb-2">Specialization:</p>
                        <p className="text-sm text-gray-700">{professional.specialization}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Detailed Bio</h4>
                      <p className="hidden lg:block text-gray-700 leading-relaxed">{professional.bio}</p>
                      <div className="lg:hidden">
                        <p className="text-gray-700 leading-relaxed">
                          {expandedBios[`support-${index}`] ? professional.bio : getMobilePreview(professional.bio)}
                        </p>
                        {professional.bio.length > MOBILE_BIO_PREVIEW_LENGTH && (
                          <button
                            type="button"
                            onClick={() => toggleBio(`support-${index}`)}
                            className="mt-2 text-sm font-semibold text-red-600"
                          >
                            {expandedBios[`support-${index}`] ? 'Read less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-red-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl mb-6">Connect with Our Team</h2>
            <p className="text-lg leading-relaxed mb-8 max-w-4xl mx-auto">
              Our diverse team brings global expertise and local insights to support India's furniture export growth.
              Reach out to collaborate, learn, or contribute to the IFDA mission.
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <Mail className="h-6 w-6" />
              <span className="text-lg">team@ifdawards.com</span>
            </div>
            <Button onClick={() => window.location.href = 'mailto:team@ifdawards.com'} size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100">
              Get In Touch
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}