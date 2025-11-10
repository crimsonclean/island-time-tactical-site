import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const products = [
  {
    id: 1,
    name: "AR-15 Complete Rifle",
    category: "Rifles",
    description: "Premium quality AR-15 platform with accessories and optics ready mounting system.",
    image: product1,
    status: "In Stock",
  },
  {
    id: 2,
    name: "Tactical Handgun",
    category: "Handguns",
    description: "High-performance tactical pistol with enhanced features for reliability and accuracy.",
    image: product2,
    status: "In Stock",
  },
  {
    id: 3,
    name: "Tactical Gear Bundle",
    category: "Accessories",
    description: "Complete tactical gear set including holster, magazine pouches, and belt system.",
    image: product3,
    status: "Available",
  },
  {
    id: 4,
    name: "Precision Optics",
    category: "Optics",
    description: "Premium red dot sights and scopes for enhanced accuracy and target acquisition.",
    image: product4,
    status: "In Stock",
  },
];

const Inventory = () => {
  return (
    <section id="inventory" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-primary">Inventory</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our carefully curated selection of firearms and tactical equipment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50">
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-secondary/90 backdrop-blur-sm">
                    {product.status}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                </div>
                <Badge variant="outline" className="w-fit text-xs">
                  {product.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-sm">
                  {product.description}
                </CardDescription>
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Inquire Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Looking for something specific? We have access to a wide network of suppliers.
          </p>
          <Button variant="outline" size="lg">
            Request Special Order
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
