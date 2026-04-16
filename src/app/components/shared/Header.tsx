import { Button } from "@/app/components/ui/button";
import { Menu, X, UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/images/ifda-logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('token')));
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('isAdmin') === 'true');

  useEffect(() => {
    function handleStorage() {
      setIsLoggedIn(Boolean(localStorage.getItem('token')));
      setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }
    window.addEventListener('storage', handleStorage);
    handleStorage();
    return () => window.removeEventListener('storage', handleStorage);
  }, [location.pathname]);

  const isAdminSession = isLoggedIn && isAdmin;
  const ctaHref = isAdminSession ? '/admin' : '/submit-entry';
  const ctaLabel = isAdminSession ? 'Admin Panel' : 'Submit Entry';

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Core Team", href: "/core-team" },
    { name: "Jury Panel", href: "/jury-panel" },
    { name: "Categories", href: "/categories" },
    { name: "Partners", href: "/partners" },
    { name: "FAQ", href: "/faq" },
    { name: "Benefits", href: "/benefits" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <img src={logo} alt="iFDA Logo" className="h-29 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-lg hover:text-red-600 transition-colors cursor-pointer font-medium ${
                  location.pathname === item.href ? 'text-red-600' : 'text-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button & Profile */}
          <div className="hidden md:flex items-center gap-4">
            <Link to={ctaHref}>
              <Button className="bg-red-600 text-white hover:bg-red-700 px-6 py-2 text-base">
                {ctaLabel}
              </Button>
            </Link>
            <Link to={isLoggedIn ? "/profile" : "/login?redirect=/profile"} aria-label="Profile/Login" >
              <UserCircle className="h-8 w-8 text-red-700 hover:text-gray-600 transition-colors" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-lg hover:text-red-600 transition-colors font-medium ${
                    location.pathname === item.href ? 'text-red-600' : 'text-gray-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to={ctaHref} onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-red-600 text-white hover:bg-red-700 w-fit px-6 py-2 text-base">
                  {ctaLabel}
                </Button>
              </Link>
              <Link to={isLoggedIn ? "/profile" : "/login?redirect=/profile"} onClick={() => setIsMenuOpen(false)} aria-label="Profile/Login" >
                <div className="flex items-center gap-2 mt-2">
                  <UserCircle className="h-7 w-7 text-red-700 hover:text-red-600 transition-colors" />
                  <span className="text-base text-gray-700">Profile</span>
                </div>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
