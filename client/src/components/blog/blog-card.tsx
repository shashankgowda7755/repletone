import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@shared/schema";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "philosophy":
        return "bg-golden-hour/10 text-golden-hour";
      case "gear":
        return "bg-kashmir-blue/10 text-kashmir-blue";
      case "tips":
        return "bg-green-100 text-green-800";
      case "reflections":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <img 
        src={post.featuredImage} 
        alt={post.title}
        className="w-full h-48 object-cover" 
      />
      
      <div className="p-6">
        <Badge className={getCategoryColor(post.category)}>
          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
        </Badge>
        
        <h3 className="font-playfair text-xl font-bold text-slate-900 mt-3 mb-3">
          {post.title}
        </h3>
        
        <p className="text-slate-600 mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 text-sm text-slate-500">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {post.readTime} min
            </span>
          </div>
          <Button variant="ghost" className="text-kashmir-blue hover:text-blue-700 p-0">
            Read More 
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </article>
  );
}
