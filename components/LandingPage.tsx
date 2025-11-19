
import React from 'react';
import { WandSparkles, GraduationCap, Image as ImageIcon, Download, ArrowRight, Sparkles, Shapes, Zap } from 'lucide-react';

interface LandingPageProps {
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  
  const showcaseImages = [
      { url: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=500&auto=format&fit=crop", label: "Zwierzęta", complexity: "Prosty" },
      { url: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=500&auto=format&fit=crop", label: "Kosmos", complexity: "Średni" },
      { url: "https://images.unsplash.com/photo-1560807707-8cc77767d783?q=80&w=500&auto=format&fit=crop", label: "Natura", complexity: "Mistrz" },
      { url: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?q=80&w=500&auto=format&fit=crop", label: "Fantazja", complexity: "Średni" },
      { url: "https://images.unsplash.com/photo-1559657699-82a2dd780d03?q=80&w=500&auto=format&fit=crop", label: "Pojazdy", complexity: "Prosty" },
      { url: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=500&auto=format&fit=crop", label: "Miasto", complexity: "Mistrz" },
  ];

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px] animate-blob mix-blend-multiply" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-200/40 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-100/40 rounded-full blur-[90px] animate-blob animation-delay-4000 mix-blend-multiply" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex justify-between items-center px-6 py-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <WandSparkles size={18} />
          </div>
          <span className="font-black text-xl tracking-tight">ColorAI</span>
        </div>
        <button 
          onClick={onEnterApp}
          className="px-6 py-2.5 bg-black text-white text-sm font-bold rounded-full hover:scale-105 hover:bg-gray-900 transition-all duration-300 shadow-xl shadow-black/20"
        >
          Uruchom Aplikację
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-100 bg-white/60 backdrop-blur-md mb-8 animate-fade-in-up shadow-sm">
            <Sparkles size={14} className="text-amber-500 mr-2" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-indigo-900">Sztuczna Inteligencja dla Dzieci</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] mb-8 animate-fade-in-up animation-delay-200">
            Zamień słowa w <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 animate-gradient-x">
              kreatywną zabawę.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-400 font-medium">
            Pierwszy w Polsce generator kolorowanek, który uczy i bawi. 
            Twórz personalizowane arkusze edukacyjne, bajkowe sceny i łamigłówki matematyczne w sekundy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
            <button 
              onClick={onEnterApp}
              className="group relative px-8 py-4 bg-black text-white font-bold rounded-2xl overflow-hidden shadow-2xl shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center text-lg">
                Stwórz Kolorowankę <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-4 bg-white text-black font-bold border-2 border-gray-100 rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:-translate-y-1 text-lg">
              Zobacz Galerię
            </button>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="group p-8 bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-indigo-600 shadow-inner">
              <GraduationCap size={36} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Tryb Edukacyjny</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Generuj zadania z matematyki, nauki języka angielskiego czy przyrody. 
              AI dostosuje poziom trudności do wieku dziecka.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group p-8 bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
             <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-pink-600 shadow-inner">
              <ImageIcon size={36} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Ze Zdjęcia w Szkic</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Zrób zdjęcie ulubionej zabawki lub pupila, a my zamienimy je w profesjonalną kolorowankę gotową do druku.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group p-8 bg-white/60 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
             <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 text-emerald-600 shadow-inner">
              <Download size={36} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Zestawy PDF</h3>
            <p className="text-gray-500 leading-relaxed font-medium">
              Wybierz kilka wygenerowanych obrazków i stwórz własną, unikalną książeczkę z kolorowankami w jednym pliku PDF.
            </p>
          </div>

        </div>
      </section>

      {/* Showcase Section - Infinite Scroll */}
      <section className="relative z-10 py-24 overflow-hidden bg-gradient-to-b from-transparent via-white/30 to-transparent">
         
         {/* Floating Shapes Background */}
         <div className="absolute top-10 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
         <div className="absolute bottom-10 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>

         <div className="relative max-w-7xl mx-auto px-6 text-center mb-16">
            <span className="inline-block mb-4 p-2 bg-black rounded-lg text-white animate-bounce">
               <Shapes size={24} />
            </span>
            <h2 className="text-4xl md:text-6xl font-black mb-6">Nieskończone możliwości</h2>
            <p className="text-lg text-gray-500 font-medium max-w-lg mx-auto">
                Od prostych kształtów dla maluchów po skomplikowane sceny dla małych artystów.
            </p>
         </div>
         
         <div className="flex w-full overflow-hidden fade-mask">
             <div className="flex space-x-8 animate-infinite-scroll py-8 px-4">
                {[...showcaseImages, ...showcaseImages].map((img, i) => (
                   <div 
                     key={i} 
                     className="flex-shrink-0 w-72 aspect-[3/4] bg-white p-3 pb-8 rounded shadow-xl transform hover:scale-105 hover:-rotate-1 transition-transform duration-300 cursor-pointer"
                     style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-2deg'})` }}
                   >
                      <div className="w-full h-full overflow-hidden bg-gray-50 border-2 border-gray-100 relative">
                         {/* CSS Filter to simulate sketch look from photo */}
                         <img 
                            src={img.url} 
                            alt={img.label} 
                            className="w-full h-full object-cover contrast-125 grayscale brightness-110 mix-blend-multiply"
                         />
                      </div>
                      <div className="mt-3 text-center">
                          <span className="font-handwriting text-xl font-bold text-gray-800">{img.label}</span>
                          <div className="text-xs font-bold text-gray-400 uppercase mt-1">{img.complexity}</div>
                      </div>
                   </div>
                ))}
             </div>
         </div>
      </section>

      {/* CTA Footer */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-5xl mx-auto bg-black rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-purple-900/40">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-full opacity-30 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
          
          <Zap className="w-16 h-16 mx-auto mb-8 text-yellow-400 animate-bounce relative z-10" />
          <h2 className="text-5xl md:text-6xl font-black mb-8 relative z-10 tracking-tight">Gotowy na zabawę?</h2>
          <p className="text-gray-400 text-xl mb-12 max-w-lg mx-auto relative z-10 font-medium">
            Dołącz do tysięcy rodziców i nauczycieli. Nie potrzebujesz konta, aby zacząć tworzyć magię.
          </p>
          <button 
            onClick={onEnterApp}
            className="relative z-10 px-12 py-5 bg-white text-black font-bold text-xl rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl shadow-white/10"
          >
            Uruchom Kreator
          </button>
        </div>
      </section>
      
      <footer className="py-12 text-center text-gray-400 text-sm relative z-10 font-medium">
        <div className="flex justify-center items-center space-x-2 mb-4 opacity-50">
            <WandSparkles size={16} />
            <span>Made with AI for Kids</span>
        </div>
        &copy; {new Date().getFullYear()} ColorAI. Wszystkie prawa zastrzeżone.
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');
        .font-handwriting { font-family: 'Caveat', cursive; }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
            animation: infinite-scroll 20s linear infinite;
            width: max-content;
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
            transform: translateY(30px);
        }
        @keyframes fadeInUp {
            to { opacity: 1; transform: translateY(0); }
        }
        .animation-delay-200 { animation-delay: 0.1s; }
        .animation-delay-400 { animation-delay: 0.2s; }
        .animation-delay-600 { animation-delay: 0.3s; }
        
        .fade-mask {
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
};
