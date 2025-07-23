import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import BlogCard from "@/components/blog/blog-card";
import NewsletterForm from "@/components/forms/newsletter-form";
import type { BlogPost } from "@shared/schema";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["/api/blog", { category: activeCategory === "all" ? "" : activeCategory }],
  });

  const categories = ["all", "philosophy", "gear", "tips", "reflections"];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Letters, Lessons & Dust
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Beyond the destinations—deeper thoughts on travel, life philosophy, gear reviews, 
            and the lessons learned on the road.
          </p>
        </div>

        {/* Featured Blog Post */}
        {posts.length > 0 && (
          <div className="mb-16">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={posts[0].featuredImage} 
                    alt={posts[0].title}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="md:w-1/2 p-8 lg:p-12">
                  <span className="bg-golden-hour/10 text-golden-hour px-3 py-1 rounded-full text-sm font-medium">
                    {posts[0].category}
                  </span>
                  <h3 className="font-playfair text-3xl font-bold text-slate-900 mt-4 mb-6">
                    {posts[0].title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {posts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span>{new Date(posts[0].createdAt).toLocaleDateString()}</span>
                      <span>{posts[0].readTime} min read</span>
                    </div>
                    <Button className="bg-kashmir-blue hover:bg-blue-700">
                      Read More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category 
                    ? "bg-kashmir-blue text-white border-kashmir-blue" 
                    : "border-slate-300 hover:bg-slate-100"
                }
              >
                {category === "all" ? "All Posts" : category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-200 animate-pulse rounded-xl h-96" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post: BlogPost) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}

        {/* Newsletter Integration */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h3 className="font-playfair text-3xl font-bold text-slate-900 mb-4">Never Miss a Letter</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Get weekly insights, travel philosophy, and behind-the-scenes stories delivered to your inbox. 
              No spam, just authentic connections from the road.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
}
