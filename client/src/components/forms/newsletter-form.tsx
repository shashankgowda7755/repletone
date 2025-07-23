import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const newsletterMutation = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/newsletter", { email });
    },
    onSuccess: () => {
      toast({
        title: "Welcome aboard!",
        description: "You're now part of the journey. Check your email for confirmation.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      if (error.message.includes("already subscribed")) {
        toast({
          title: "Already subscribed",
          description: "This email is already on our journey list!",
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
    if (email) {
      newsletterMutation.mutate(email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-3">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
          required
        />
        <Button
          type="submit"
          disabled={newsletterMutation.isPending}
          className="bg-white text-kashmir-blue hover:bg-slate-100"
        >
          {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
    </form>
  );
}
