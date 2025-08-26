import { Languages, Zap, Shield } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Languages,
      title: "Multi-Language",
      description: "Support for 80+ languages with high accuracy",
      bgColor: "bg-paradise"
    },
    {
      icon: Zap,
      title: "Lightning Fast", 
      description: "Process images in seconds with advanced algorithms",
      bgColor: "bg-vanilla-ice"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your images are processed locally and never stored", 
      bgColor: "bg-burgundy"
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div key={index} className="glass-effect rounded-2xl p-6 hover-lift text-center">
            <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <feature.icon className="text-white text-2xl h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-lavender">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};