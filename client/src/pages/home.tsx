import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Home() {

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 leading-tight">
            From Kashmir to 
            <span className="text-golden-hour"> Kanyakumari</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed max-w-3xl mx-auto">
            Join me on a 4-month backpacking journey across India, discovering hidden gems, 
            authentic experiences, and the stories that connect us all.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/diaries">
              <Button className="bg-kashmir-blue hover:bg-blue-700 text-white px-8 py-4 text-lg h-auto">
                Explore Diaries
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg h-auto bg-transparent"
            >
              Walk With Me
            </Button>
          </div>

          {/* Journey Progress Indicator */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium">Journey Progress</span>
              <span className="text-sm font-bold">47%</span>
            </div>
            <div className="w-full bg-white/30 rounded-full h-2">
              <div className="bg-golden-hour h-2 rounded-full transition-all duration-300" style={{ width: "47%" }} />
            </div>
            <div className="flex justify-between text-xs mt-2 opacity-90">
              <span>Kashmir</span>
              <span>Currently in Rajasthan</span>
              <span>Kanyakumari</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>
    </div>
  );
}
