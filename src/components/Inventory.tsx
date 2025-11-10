import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
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
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);

      // Call edge function
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          ...validatedData,
          type: "inquiry",
          productName: selectedProduct?.name,
        },
      });

      if (error) throw error;

      toast({
        title: "Inquiry sent!",
        description: "We'll get back to you soon about this product.",
      });

      // Reset form and close dialog
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSelectedProduct(null);
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: "Error",
          description: "Failed to send inquiry. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const openInquiryDialog = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: `I'm interested in learning more about the ${product.name}.`,
    });
    setErrors({});
  };

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
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  onClick={() => openInquiryDialog(product)}
                >
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

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Product Inquiry</DialogTitle>
            <DialogDescription>
              Interested in {selectedProduct?.name}? Fill out the form below and we'll get back to you.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={handleInquirySubmit}>
            <div>
              <label htmlFor="inquiry-name" className="text-sm font-medium mb-2 block">
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="inquiry-name"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="inquiry-email" className="text-sm font-medium mb-2 block">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="inquiry-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label htmlFor="inquiry-phone" className="text-sm font-medium mb-2 block">
                Phone
              </label>
              <Input
                id="inquiry-phone"
                type="tel"
                placeholder="(713) 553-7419"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label htmlFor="inquiry-message" className="text-sm font-medium mb-2 block">
                Message <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="inquiry-message"
                placeholder="Tell us about your interest..."
                className={`min-h-[100px] ${errors.message ? "border-destructive" : ""}`}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
              {errors.message && (
                <p className="text-sm text-destructive mt-1">{errors.message}</p>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedProduct(null)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Inventory;
