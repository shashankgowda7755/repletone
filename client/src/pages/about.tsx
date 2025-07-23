import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Mountain, Camera, Send } from "lucide-react";

export default function About() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  });
  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.subject && formData.message && formData.category) {
      contactMutation.mutate(formData);
    }
  };

  const milestones = [
    {
      title: "Kashmir Valley",
      date: "March 2024",
      description: "Started the journey from Srinagar, experiencing the ethereal beauty of Dal Lake and the warm hospitality of Kashmiri people.",
      icon: MapPin,
    },
    {
      title: "Himachal Pradesh",
      date: "April 2024",
      description: "Trekked through the mountains of Manali and Dharamshala, discovering hidden monasteries and local traditions.",
      icon: Mountain,
    },
    {
      title: "Rajasthan",
      date: "May 2024 - Current",
      description: "Currently exploring the royal palaces and desert landscapes, documenting the rich cultural heritage of the land of kings.",
      icon: Camera,
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-6">The One Behind</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Every journey tells a story. Here's mine, and why I chose to walk the length of incredible India.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Personal Story */}
          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="Backpacker on mountain journey" 
              className="rounded-2xl shadow-lg w-full" 
            />
            
            <div className="prose prose-lg text-slate-700">
              <p className="text-lg leading-relaxed">
                At 24, I made a decision that changed everything. Instead of following the conventional path, 
                I chose to understand my country through its roads, its people, and its stories. Armed with 
                just a backpack and endless curiosity, I began the ultimate Indian odyssey.
              </p>
              <p className="leading-relaxed">
                From the snow-capped peaks of Kashmir to the southernmost tip of Kanyakumari, 
                this isn't just a travel blog—it's a documentation of transformation, both personal and cultural. 
                Every mile teaches something new, every conversation opens a new perspective.
              </p>
            </div>

            {/* Contact Form Integration */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Send className="mr-3 text-kashmir-blue" />
                Send a Signal
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="sponsorship">Sponsorship</SelectItem>
                    <SelectItem value="collaboration">Collaboration</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                />
                <Textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                />
                <Button 
                  type="submit" 
                  disabled={contactMutation.isPending}
                  className="w-full bg-kashmir-blue hover:bg-blue-700"
                >
                  {contactMutation.isPending ? "Sending..." : "Send Signal"}
                  <Send className="ml-2" size={16} />
                </Button>
              </form>
              <p className="text-sm text-slate-500 mt-4 text-center">Response time: Usually within 24 hours</p>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="space-y-8">
            <h3 className="font-playfair text-3xl font-bold text-slate-900 mb-8">Journey Milestones</h3>
            
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon;
              return (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-kashmir-blue rounded-full flex items-center justify-center">
                    <IconComponent className="text-white" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="bg-white p-6 rounded-xl shadow-md">
                      <h4 className="font-semibold text-lg text-slate-900 mb-2">{milestone.title}</h4>
                      <p className="text-slate-600 text-sm mb-2">{milestone.date}</p>
                      <p className="text-slate-700">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-kashmir-blue to-kanyakumari-red p-8 rounded-2xl text-white">
              <h4 className="font-playfair text-2xl font-bold mb-4">Mission & Values</h4>
              <p className="text-lg leading-relaxed mb-4">
                To showcase India's incredible diversity through authentic storytelling, 
                budget-conscious travel tips, and genuine cultural exchanges.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Authentic Stories</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Budget Travel</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Cultural Exchange</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Sustainable Tourism</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
