import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Instagram, Twitter, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Welcome aboard!",
        description: "You'll get weekly updates from the road.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      if (error.message.includes("already subscribed")) {
        toast({
          title: "Already subscribed!",
          description: "This email is already on our journey.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      newsletterMutation.mutate(email.trim());
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-kashmir-blue">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h3 className="font-playfair text-3xl font-bold mb-4">
              Never Miss a Story
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Get weekly insights from the road - authentic stories, hidden gems, 
              and practical travel tips delivered to your inbox.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 flex-1"
                required
              />
              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="bg-golden-hour hover:bg-yellow-600 text-white px-6"
              >
                {newsletterMutation.isPending ? "..." : "Join"}
              </Button>
            </form>
            
            <Button
              variant="ghost"
              className="text-blue-200 hover:text-white text-sm mt-4"
            >
              Tell me more →
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-kashmir-blue text-white p-2 rounded-lg">
                <Send size={20} />
              </div>
              <span className="font-playfair text-2xl font-bold">Milesalone</span>
            </div>
            <p className="text-slate-400 mb-6 max-w-md">
              Following the roads less traveled, from Kashmir to Kanyakumari. 
              A solo journey across India, sharing authentic experiences and 
              practical wisdom for fellow travelers.
            </p>
            <div className="flex items-center text-slate-400 mb-2">
              <MapPin size={16} className="mr-2" />
              <span className="text-sm">Currently in: Rajasthan</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/diaries" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Travel Diaries
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Blog Posts
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors text-sm">
                  About Me
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Instagram size={16} className="mr-2" />
                Instagram
              </a>
              <a
                href="#"
                className="flex items-center text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Twitter size={16} className="mr-2" />
                Twitter
              </a>
              <a
                href="mailto:hello@milesalone.com"
                className="flex items-center text-slate-400 hover:text-white transition-colors text-sm"
              >
                <Mail size={16} className="mr-2" />
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            © 2024 Milesalone. Crafted with ❤️ on the road.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}