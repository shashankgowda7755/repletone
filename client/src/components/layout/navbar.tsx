import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Send } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/diaries", label: "Travel Diaries" },
    { href: "/blog", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/" && location === "/") return true;
    if (href !== "/" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <div className="bg-kashmir-blue text-white p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Send size={20} />
              </div>
              <span className="font-playfair text-2xl font-bold text-slate-900">
                Milesalone
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-kashmir-blue cursor-pointer ${
                    isActiveRoute(item.href)
                      ? "text-kashmir-blue border-b-2 border-kashmir-blue pb-1"
                      : "text-slate-600"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            
            <Button
              className="bg-golden-hour hover:bg-yellow-600 text-white px-4 py-2 text-sm"
            >
              Subscribe
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-base font-medium transition-colors hover:text-kashmir-blue cursor-pointer ${
                      isActiveRoute(item.href)
                        ? "text-kashmir-blue"
                        : "text-slate-600"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="bg-golden-hour hover:bg-yellow-600 text-white w-full"
              >
                Subscribe
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}