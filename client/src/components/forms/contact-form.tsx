import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

export default function ContactForm() {
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

  return (
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
            className="focus:ring-2 focus:ring-kashmir-blue focus:border-transparent transition-colors"
            required
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="focus:ring-2 focus:ring-kashmir-blue focus:border-transparent transition-colors"
            required
          />
        </div>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger className="focus:ring-2 focus:ring-kashmir-blue focus:border-transparent transition-colors">
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
          className="focus:ring-2 focus:ring-kashmir-blue focus:border-transparent transition-colors"
          required
        />
        <Textarea
          placeholder="Your Message"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="focus:ring-2 focus:ring-kashmir-blue focus:border-transparent transition-colors resize-none"
          required
        />
        <Button 
          type="submit" 
          disabled={contactMutation.isPending}
          className="w-full bg-kashmir-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {contactMutation.isPending ? "Sending..." : "Send Signal"}
          <Send className="ml-2" size={16} />
        </Button>
      </form>
      <p className="text-sm text-slate-500 mt-4 text-center">Response time: Usually within 24 hours</p>
    </div>
  );
}
