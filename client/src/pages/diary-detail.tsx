import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import CommentForm from "@/components/forms/comment-form";
import { 
  MapPin, 
  Bed, 
  UtensilsCrossed, 
  Map, 
  Lightbulb, 
  Camera, 
  Quote,
  Clock,
  Calendar,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import type { Diary, Comment } from "@shared/schema";

export default function DiaryDetail() {
  const { slug } = useParams();

  const { data: diary, isLoading } = useQuery<Diary>({
    queryKey: ["/api/diaries", slug],
    enabled: !!slug,
  });

  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: ["/api/comments/diary", diary?.id],
    enabled: !!diary?.id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Skeleton className="w-full h-80" />
        <div className="max-w-4xl mx-auto p-8 space-y-8">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (!diary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Diary not found</h1>
          <Link href="/diaries">
            <Button>Back to Diaries</Button>
          </Link>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "journey", title: "My Journey", icon: MapPin, content: diary.journey },
    { id: "reach", title: "How to Reach", icon: Map, content: diary.howToReach },
    { id: "stay", title: "Where to Stay", icon: Bed, content: diary.whereToStay },
    { id: "eat", title: "What to Eat", icon: UtensilsCrossed, content: diary.whatToEat },
    { id: "do", title: "What to Do", icon: Map, content: diary.whatToDo },
    { id: "tips", title: "Tips", icon: Lightbulb, content: diary.tips },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Header */}
      <div className="relative">
        <img 
          src={diary.featuredImage} 
          alt={diary.title}
          className="w-full h-80 object-cover" 
        />
        <div className="absolute inset-0 bg-black/40" />
        <Link href="/diaries">
          <Button 
            variant="outline" 
            className="absolute top-4 left-4 bg-white/90 hover:bg-white text-slate-700 border-0"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Diaries
          </Button>
        </Link>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="font-playfair text-4xl font-bold mb-2">{diary.title}</h1>
          <p className="text-lg opacity-90">{diary.location}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm">
            <span className="flex items-center">
              <Calendar size={16} className="mr-1" />
              {new Date(diary.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Clock size={16} className="mr-1" />
              {diary.readTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-8 space-y-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-kashmir-blue/10 text-kashmir-blue">
            {diary.region}
          </Badge>
          {diary.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Excerpt */}
        <div className="text-lg text-slate-700 leading-relaxed">
          {diary.excerpt}
        </div>

        {/* 8 Mandatory Sections */}
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          const isEven = index % 2 === 0;
          
          return (
            <section key={section.id} className={isEven ? "" : "bg-slate-50 p-6 rounded-xl"}>
              <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-6 flex items-center">
                <IconComponent className="text-kashmir-blue mr-3" size={32} />
                {section.title}
              </h2>
              <div 
                className="prose prose-lg text-slate-700 leading-relaxed max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </section>
          );
        })}

        {/* Photos Section */}
        <section>
          <h2 className="font-playfair text-3xl font-bold text-slate-900 mb-6 flex items-center">
            <Camera className="text-kashmir-blue mr-3" size={32} />
            Photos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {diary.photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${diary.title} photo ${index + 1}`}
                className="rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer"
              />
            ))}
          </div>
        </section>

        {/* Closing Quote */}
        <section className="text-center bg-gradient-to-r from-kashmir-blue to-kanyakumari-red text-white p-8 rounded-xl">
          <h2 className="font-playfair text-3xl font-bold mb-6 flex items-center justify-center">
            <Quote className="text-golden-hour mr-3" size={32} />
            Closing Thoughts
          </h2>
          <blockquote className="text-2xl font-light italic leading-relaxed">
            "{diary.closingQuote}"
          </blockquote>
          <p className="text-lg mt-4 opacity-90">- From the road to Kanyakumari</p>
        </section>

        {/* Comments Section */}
        <section className="border-t border-slate-200 pt-8">
          <h3 className="font-playfair text-2xl font-bold text-slate-900 mb-6">Join the Conversation</h3>
          
          <CommentForm diaryId={diary.id} />

          {/* Comments List */}
          <div className="space-y-6 mt-8">
            {comments.filter(comment => comment.approved).map((comment) => (
              <div key={comment.id} className="bg-white border border-slate-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-kashmir-blue text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-slate-900">{comment.name}</h4>
                      <span className="text-slate-500 text-sm">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-relaxed">{comment.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
