import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ChevronDown } from "lucide-react";
import DiaryCard from "@/components/diary/diary-card";
import NewsletterForm from "@/components/forms/newsletter-form";
import type { Diary } from "@shared/schema";

export default function Diaries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRegion, setFilterRegion] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [limit, setLimit] = useState(9);

  const { data: diaries = [], isLoading } = useQuery({
    queryKey: ["/api/diaries", { search: searchQuery, region: filterRegion, tags: activeTag, limit, offset: 0 }],
  });

  const tags = ["mountains", "culture", "food", "budget", "adventure"];

  const handleLoadMore = () => {
    setLimit(prev => prev + 6);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-6">Travel Diaries</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive guides and stories from each destination, complete with practical tips, 
            local insights, and authentic experiences.
          </p>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Input
                  type="text"
                  placeholder="Search destinations, experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              </div>
              <Select value={filterRegion} onValueChange={setFilterRegion}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="All Regions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Regions</SelectItem>
                  <SelectItem value="north">Northern India</SelectItem>
                  <SelectItem value="west">Western India</SelectItem>
                  <SelectItem value="central">Central India</SelectItem>
                  <SelectItem value="east">Eastern India</SelectItem>
                  <SelectItem value="south">Southern India</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                variant={activeTag === "" ? "default" : "outline"}
                onClick={() => setActiveTag("")}
                className={activeTag === "" ? "bg-kashmir-blue text-white" : ""}
              >
                All
              </Button>
              {tags.map((tag) => (
                <Button
                  key={tag}
                  variant={activeTag === tag ? "default" : "outline"}
                  onClick={() => setActiveTag(tag)}
                  className={activeTag === tag ? "bg-kashmir-blue text-white" : ""}
                >
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Diary Cards Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-200 animate-pulse rounded-2xl h-96" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {diaries.map((diary: Diary) => (
              <DiaryCard key={diary.id} diary={diary} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {diaries.length > 0 && diaries.length >= limit && (
          <div className="text-center mt-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="text-slate-700 border-slate-300 hover:bg-slate-100"
            >
              Load More Stories
              <ChevronDown className="ml-2" size={16} />
            </Button>
          </div>
        )}

        {/* Newsletter Integration */}
        <div className="bg-gradient-to-r from-kashmir-blue to-kanyakumari-red rounded-2xl p-8 mt-16 text-white text-center">
          <h3 className="font-playfair text-3xl font-bold mb-4">Walk With Me</h3>
          <p className="text-xl mb-6 opacity-90">
            Get exclusive stories, budget tips, and behind-the-scenes moments delivered weekly.
          </p>
          <NewsletterForm />
          <p className="text-sm mt-3 opacity-75">No spam. No fluff. Just the road.</p>
        </div>
      </div>
    </section>
  );
}
