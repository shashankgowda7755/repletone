import { useAppContext } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send, Check, X } from "lucide-react";

export default function NewsletterModal() {
  const { isNewsletterModalOpen, setIsNewsletterModalOpen } = useAppContext();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Welcome to the journey!",
        description: "You're now part of the Milesalone community.",
      });
      setEmail("");
      setIsNewsletterModalOpen(false);
    },
    onError: (error: any) => {
      if (error.message.includes("already subscribed")) {
        toast({
          title: "Already on board!",
          description: "This email is already part of our journey.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to subscribe. Please try again.",
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
    <Dialog open={isNewsletterModalOpen} onOpenChange={setIsNewsletterModalOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div className="text-center w-full">
              <div className="bg-kashmir-blue text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={24} />
              </div>
              <DialogTitle className="font-playfair text-3xl font-bold text-slate-900 mb-4">
                Walk With Me
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>
        
        <div className="text-center">
          <p className="text-slate-600 mb-6 leading-relaxed">
            Join fellow travelers on this incredible journey. Get weekly stories, exclusive photos, 
            and practical tips delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <Button
              type="submit"
              disabled={newsletterMutation.isPending}
              className="w-full bg-kashmir-blue hover:bg-blue-700"
            >
              {newsletterMutation.isPending ? "Joining..." : "Start Walking With Me"}
            </Button>
          </form>
          
          <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-slate-500">
            <span className="flex items-center">
              <Check className="text-green-500 mr-2" size={16} />
              No spam
            </span>
            <span className="flex items-center">
              <Check className="text-green-500 mr-2" size={16} />
              No fluff
            </span>
            <span className="flex items-center">
              <Check className="text-green-500 mr-2" size={16} />
              Just the road
            </span>
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setIsNewsletterModalOpen(false)}
            className="text-slate-400 hover:text-slate-600 text-sm mt-4"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
