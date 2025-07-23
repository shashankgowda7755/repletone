import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, createContext, useContext } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Diaries from "@/pages/diaries";
import Blog from "@/pages/blog";
import Gallery from "@/pages/gallery";
import DiaryDetail from "@/pages/diary-detail";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

interface AppContextType {
  isNewsletterModalOpen: boolean;
  setIsNewsletterModalOpen: (open: boolean) => void;
  isLightboxOpen: boolean;
  setIsLightboxOpen: (open: boolean) => void;
  currentLightboxImage: any;
  setCurrentLightboxImage: (image: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/diaries" component={Diaries} />
          <Route path="/diaries/:slug" component={DiaryDetail} />
          <Route path="/blog" component={Blog} />
          <Route path="/gallery" component={Gallery} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      {/* <NewsletterModal />
      <LightboxModal /> */}
    </div>
  );
}

function App() {
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentLightboxImage, setCurrentLightboxImage] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContext.Provider
          value={{
            isNewsletterModalOpen,
            setIsNewsletterModalOpen,
            isLightboxOpen,
            setIsLightboxOpen,
            currentLightboxImage,
            setCurrentLightboxImage,
          }}
        >
          <Toaster />
          <Router />
        </AppContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
