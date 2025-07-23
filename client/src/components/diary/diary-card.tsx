import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Camera } from "lucide-react";
import type { Diary } from "@shared/schema";

interface DiaryCardProps {
  diary: Diary;
}

export default function DiaryCard({ diary }: DiaryCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <img 
        src={diary.featuredImage} 
        alt={diary.title}
        className="w-full h-64 object-cover" 
      />
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge 
            variant="secondary"
            className="bg-kashmir-blue/10 text-kashmir-blue"
          >
            {diary.region}
          </Badge>
          <span className="text-slate-500 text-sm flex items-center">
            <Calendar size={14} className="mr-1" />
            {new Date(diary.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-3">
          {diary.title}
        </h3>
        
        <p className="text-slate-600 mb-4 leading-relaxed">
          {diary.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {diary.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-slate-500">
            <span className="flex items-center">
              <Clock size={14} className="mr-1" />
              {diary.readTime} min read
            </span>
            <span className="flex items-center">
              <Camera size={14} className="mr-1" />
              {diary.photos.length} photos
            </span>
          </div>
          <Link href={`/diaries/${diary.slug}`}>
            <Button className="bg-kashmir-blue hover:bg-blue-700 text-white">
              Read Story
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
