import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "../../../assets/images/ifda-logo.png";
import { Link } from "react-router-dom";
import { IFDA } from "./BrandIFDA";
export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl mb-4 text-red-500"><img src={logo} alt="IFDA Logo" className="h-34 w-auto" /></h3>
            <p className="text-gray-400 text-sm">
              India Furniture Design Awards - Recognising export ready furniture design excellence
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-red-500 transition-colors">About <IFDA /></Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-red-500 transition-colors">Award Categories</Link>
              </li>
              <li>
                <Link to="/eligibility" className="hover:text-red-500 transition-colors">Eligibility</Link>
              </li>
                <li>
                  <a href="/#criteria" className="hover:text-red-500 transition-colors">Evaluation Criteria</a>
                </li>
              <li>
                <Link to="/jury-panel" className="hover:text-red-500 transition-colors">Jury Panel</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-red-500 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/partners" className="hover:text-red-500 transition-colors">Partners</Link>
              </li>
              <li>
                <Link to="/become-jury" className="hover:text-red-500 transition-colors">Become a Jury</Link>
              </li>
              <li>
                <Link to="/submit-entry" className="hover:text-red-500 transition-colors">Submit Entry</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <a href="mailto:team@idfawards.com" className="hover:text-red-500 transition-colors">team@ifdawards.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <a href="tel:+918003349703" className="hover:text-red-500 transition-colors">+91 80033 49703</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Jodhpur (Rajasthan), India</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="https://facebook.com//share/1Jmr9nP49X/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/ifdawards?igsh=dXpzdXNkaXJqYWxp&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/company/india-furniture-design-awards/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://x.com/ifdawards12662" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 India Furniture Design Awards. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
