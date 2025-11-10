import { Shield, Target, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully licensed FFL dealer operating with complete compliance and professional standards.",
  },
  {
    icon: Target,
    title: "Expert Guidance",
    description: "Knowledgeable staff ready to help you find the perfect firearm for your needs.",
  },
  {
    icon: Award,
    title: "Quality Products",
    description: "Curated selection of premium firearms and tactical gear from trusted manufacturers.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-primary">Island Time Tactical</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for firearms and tactical equipment with island hospitality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-colors">
                <CardContent className="pt-8 text-center">
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto bg-card border border-border/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">About Island Time Tactical</h3>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Island Time Tactical is your premier destination for firearms, tactical gear, and accessories. 
              We combine professional expertise with the friendly, relaxed approach that island living inspires.
            </p>
            <p>
              As a licensed FFL dealer, we're committed to serving our community with integrity, knowledge, 
              and dedication to safety. Whether you're a seasoned professional, law enforcement officer, or 
              new to firearms ownership, we're here to help you make informed decisions.
            </p>
            <p>
              Our carefully curated inventory features quality products from trusted manufacturers, and our 
              extensive network allows us to source specialty items to meet your specific needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
