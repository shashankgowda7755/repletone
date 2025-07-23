import type { GalleryImage } from "@shared/schema";

interface GalleryGridProps {
  images: GalleryImage[];
  layout: "masonry" | "slideshow";
  onImageClick: (image: GalleryImage) => void;
}

export default function GalleryGrid({ images, layout, onImageClick }: GalleryGridProps) {
  if (layout === "slideshow") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => onImageClick(image)}
          >
            <img 
              src={image.imageUrl} 
              alt={image.title}
              className="w-full h-64 object-cover" 
            />
            <div className="p-4">
              <h3 className="font-semibold text-slate-900 mb-1">{image.title}</h3>
              <p className="text-slate-600 text-sm">{image.description}</p>
              <p className="text-slate-500 text-xs mt-2">{image.location}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
      {images.map((image) => (
        <div
          key={image.id}
          className="break-inside-avoid bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          onClick={() => onImageClick(image)}
        >
          <img 
            src={image.imageUrl} 
            alt={image.title}
            className="w-full h-auto" 
          />
          <div className="p-4">
            <h3 className="font-semibold text-slate-900 mb-1">{image.title}</h3>
            <p className="text-slate-600 text-sm">{image.description}</p>
            <p className="text-slate-500 text-xs mt-2">{image.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
