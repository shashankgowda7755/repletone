import { useAppContext } from "@/App";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function LightboxModal() {
  const {
    isLightboxOpen,
    setIsLightboxOpen,
    currentLightboxImage,
    setCurrentLightboxImage,
  } = useAppContext();

  if (!currentLightboxImage) return null;

  return (
    <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
      <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X size={24} />
          </Button>

          <img
            src={currentLightboxImage.url || currentLightboxImage}
            alt={currentLightboxImage.title || "Gallery image"}
            className="max-w-full max-h-full object-contain"
          />

          {currentLightboxImage.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
              <h3 className="font-semibold text-lg">{currentLightboxImage.title}</h3>
              {currentLightboxImage.description && (
                <p className="text-sm opacity-90 mt-1">{currentLightboxImage.description}</p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}