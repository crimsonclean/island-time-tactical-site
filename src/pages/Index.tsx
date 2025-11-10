import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Inventory from "@/components/Inventory";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <Inventory />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
