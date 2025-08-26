export const Footer = () => {
  return (
    <footer className="glass-effect mt-16 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-white/70">
          Created by{" "}
          <a 
            href="https://raufjatoi.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-vanilla-ice transition-colors font-semibold"
          >
            Abdul Rauf Jatoi
          </a>
        </p>
      </div>
    </footer>
  );
};