import { Code, Heart } from "lucide-react";

export const DeveloperSection = () => {
  return (
    <div className="container mx-auto px-4 max-w-6xl mb-12">
      <div className="glass-effect rounded-3xl p-8 hover-lift">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Developer Image */}
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
              <img 
                src="rauf.png" 
                alt="Rauf Jatoi - Developer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-paradise rounded-full p-3 border-4 border-white/20">
              <Code className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Developer Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-4">
              <h3 className="text-3xl font-bold text-white mb-2">Rauf Jatoi</h3>
              <p className="text-lg text-lavender font-medium">Full Stack Developer & AI Enthusiast</p>
            </div>
            
            <div className="glass-effect rounded-xl p-6 mb-4">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-paradise mt-1 flex-shrink-0" />
                <blockquote className="text-white italic text-lg leading-relaxed">
                  "Just doing the stuffs, I like : )"
                </blockquote>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <span className="bg-vanilla-ice/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                React & TypeScript
              </span>
              <span className="bg-vanilla-ice/20 text-white px-3 py-1 rounded-full text-sm font-medium">
                AI & ML
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};