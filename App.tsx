
import React, { useState, useEffect } from 'react';
import { generateCityIllustration } from './services/geminiService';
import { CITIES } from './constants';
import { Loader2, ChevronRight, Map, RefreshCw } from 'lucide-react';

const App: React.FC = () => {
  const [currentCityIndex, setCurrentCityIndex] = useState(0);
  const [images, setImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const currentCity = CITIES[currentCityIndex];
  const currentImage = images[currentCity.id];

  const handleReveal = async () => {
    if (currentImage || isLoading) return;
    
    setIsLoading(true);
    const url = await generateCityIllustration(currentCity.visualPrompt);
    if (url) {
      setImages(prev => ({ ...prev, [currentCity.id]: url }));
    }
    setIsLoading(false);
  };

  const handleCityChange = (index: number) => {
    setCurrentCityIndex(index);
    // On mobile, close menu after selection
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-[#fdf6e3] text-[#2c2c2c] overflow-hidden font-serif">
      {/* Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0 mix-blend-multiply" 
           style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z\' fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'}}
      ></div>

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed md:relative z-30 h-full bg-[#f4ece0] border-r border-[#d4c5b0] shadow-xl md:shadow-none
          transition-all duration-500 ease-in-out flex flex-col
          ${isMenuOpen ? 'w-80 translate-x-0' : 'w-80 -translate-x-full md:w-0 md:overflow-hidden'}
        `}
      >
        <div className="p-8 flex-grow overflow-y-auto custom-scrollbar">
          <h2 className="font-display text-2xl tracking-widest mb-8 text-[#1a1a1a] border-b border-[#d4c5b0] pb-4">
            Invisible Cities
          </h2>
          <ul className="space-y-4">
            {CITIES.map((city, index) => (
              <li key={city.id}>
                <button 
                  onClick={() => handleCityChange(index)}
                  className={`
                    w-full text-left group transition-all duration-300
                    ${index === currentCityIndex ? 'opacity-100 translate-x-2' : 'opacity-50 hover:opacity-80 hover:translate-x-1'}
                  `}
                >
                  <span className={`block font-display text-sm tracking-widest ${index === currentCityIndex ? 'text-black' : 'text-[#555]'}`}>
                    {city.name.toUpperCase()}
                  </span>
                  <span className="block text-xs italic text-[#888] group-hover:text-[#666]">
                    {city.subtitle}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-8 text-xs text-[#888] italic border-t border-[#d4c5b0]">
          "Traveling, you realize that differences are lost: each city takes to resembling all cities..."
        </div>
      </aside>

      {/* Menu Toggle (Mobile/Desktop) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-6 left-6 z-40 p-2 bg-[#1a1a1a] text-[#fdf6e3] rounded-full hover:scale-110 transition-transform shadow-lg"
      >
        <Map size={20} />
      </button>

      {/* Main Content Area */}
      <main className="flex-grow relative h-screen overflow-y-auto flex flex-col items-center justify-center p-6 md:p-16">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
          
          {/* Left Column: Text */}
          <div className="space-y-8 order-2 md:order-1 animate-fadeIn">
            <div className="space-y-2">
              <span className="font-display text-sm tracking-[0.3em] text-[#666] uppercase">
                {currentCity.subtitle}
              </span>
              <h1 className="text-6xl md:text-7xl font-display tracking-tighter text-[#1a1a1a]">
                {currentCity.name}
              </h1>
              <div className="h-1 w-12 bg-[#1a1a1a]"></div>
            </div>

            <p className="text-lg md:text-xl leading-loose italic text-[#3c3c3c] font-serif border-l-2 border-[#d4c5b0] pl-6">
              "{currentCity.description}"
            </p>

            <div className="pt-4 flex gap-4">
               <button 
                 onClick={() => {
                    const next = (currentCityIndex + 1) % CITIES.length;
                    handleCityChange(next);
                 }}
                 className="flex items-center gap-2 text-sm font-display tracking-widest hover:gap-4 transition-all uppercase border-b border-transparent hover:border-black pb-1"
               >
                 Next Journey <ChevronRight size={16} />
               </button>
            </div>
          </div>

          {/* Right Column: Black Card */}
          <div className="order-1 md:order-2 flex justify-center perspective-1000">
            <div 
              onClick={handleReveal}
              className={`
                relative w-full max-w-md aspect-[3/4] md:aspect-square
                bg-[#0a0a0a] shadow-2xl cursor-pointer 
                transition-all duration-700 ease-out transform hover:-translate-y-2
                ${currentImage ? '' : 'hover:shadow-xl'}
                group border-8 border-[#1a1a1a] overflow-hidden bg-contain
              `}
            >
              {/* Illustration */}
              {currentImage && (
                <img 
                  src={currentImage} 
                  alt={`Etching of ${currentCity.name}`} 
                  className="w-full h-full object-cover animate-fadeIn"
                  style={{ filter: 'sepia(30%) contrast(120%) brightness(0.9)' }}
                />
              )}

              {/* Overlay / Loading State */}
              <div className={`
                absolute inset-0 flex flex-col items-center justify-center text-[#fdf6e3]
                transition-all duration-1000 bg-[#0a0a0a]
                ${currentImage ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              `}>
                {isLoading ? (
                  <div className="flex flex-col items-center space-y-6">
                    <div className="relative">
                       <Loader2 className="animate-spin h-12 w-12 opacity-80" />
                    </div>
                    <span className="font-display tracking-widest text-xs opacity-60 animate-pulse uppercase">
                      Etching Memory...
                    </span>
                  </div>
                ) : (
                  <div className="text-center space-y-3 p-6 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-16 h-16 border border-[#fdf6e3] rounded-full flex items-center justify-center mx-auto mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                      <div className="w-1 h-1 bg-[#fdf6e3] rounded-full"></div>
                    </div>
                    <span className="block font-display text-2xl tracking-[0.2em] uppercase">
                      Reveal
                    </span>
                    <span className="block font-serif italic text-sm opacity-50">
                      Tap to conjure the invisible
                    </span>
                  </div>
                )}
              </div>
              
              {/* Paper Texture Overlay on top of image to blend it */}
              <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
                style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'}}
              ></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
