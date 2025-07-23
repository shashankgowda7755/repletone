import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CommentFormProps {
  diaryId?: number;
  blogPostId?: number;
}

export default function CommentForm({ diaryId, blogPostId }: CommentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: async (data: typeof formData & { diaryId?: number; blogPostId?: number }) => {
      return apiRequest("POST", "/api/comments", data);
    },
    onSuccess: () => {
      toast({
        title: "Comment submitted!",
        description: "Your comment is awaiting moderation and will appear shortly.",
      });
      setFormData({ name: "", email: "", message: "" });
      
      // Invalidate comments query
      if (diaryId) {
        queryClient.invalidateQueries({ queryKey: ["/api/comments/diary", diaryId] });
      } else if (blogPostId) {
        queryClient.invalidateQueries({ queryKey: ["/api/comments/blog", blogPostId] });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit comment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      commentMutation.mutate({
        ...formData,
        diaryId,
        blogPostId,
      });
    }
  };

  return (
    <div className="bg-slate-50 p-6 rounded-xl">
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
            placeholder="Email (optional)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <Textarea
          placeholder="Share your thoughts, questions, or experiences..."
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />
        <Button 
          type="submit" 
          disabled={commentMutation.isPending}
          className="bg-kashmir-blue hover:bg-blue-700"
        >
          {commentMutation.isPending ? "Submitting..." : "Share Your Thoughts"}
        </Button>
      </form>
    </div>
  );
}
