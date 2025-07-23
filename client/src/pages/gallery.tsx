import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import GalleryGrid from "@/components/gallery/gallery-grid";
import { useAppContext } from "@/App";
import { LayoutGrid, Images, Camera } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

export default function Gallery() {
  const [layout, setLayout] = useState<"masonry" | "slideshow">("masonry");
  const [limit, setLimit] = useState(20);
  const { setIsLightboxOpen, setCurrentLightboxImage } = useAppContext();

  const { data: images = [], isLoading } = useQuery({
    queryKey: ["/api/gallery", { limit, offset: 0 }],
  });

  const handleImageClick = (image: GalleryImage) => {
    setCurrentLightboxImage(image);
    setIsLightboxOpen(true);
  };

  const handleLoadMore = () => {
    setLimit(prev => prev + 20);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Visual Stories
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Every frame tells a story. From breathtaking landscapes to intimate cultural moments, 
            these images capture the essence of India's incredible diversity.
          </p>
          
          {/* Gallery Toggle */}
          <div className="flex justify-center space-x-4">
            <Button
              variant={layout === "masonry" ? "default" : "outline"}
              onClick={() => setLayout("masonry")}
              className={layout === "masonry" ? "bg-kashmir-blue text-white" : ""}
            >
              <LayoutGrid className="mr-2" size={16} />
              Masonry
            </Button>
            <Button
              variant={layout === "slideshow" ? "default" : "outline"}
              onClick={() => setLayout("slideshow")}
              className={layout === "slideshow" ? "bg-kashmir-blue text-white" : ""}
            >
              <Images className="mr-2" size={16} />
              Slideshow
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-slate-200 animate-pulse rounded-xl h-64" />
            ))}
          </div>
        ) : (
          <GalleryGrid
            images={images}
            layout={layout}
            onImageClick={handleImageClick}
          />
        )}

        {/* Load More Button */}
        {images.length > 0 && images.length >= limit && (
          <div className="text-center mt-12">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="text-slate-700 border-slate-300 hover:bg-slate-100"
            >
              Load More Photos
              <Camera className="ml-2" size={16} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
