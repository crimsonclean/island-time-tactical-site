import ittLogo from "@/assets/itt-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-tactical-dark border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <img src={ittLogo} alt="Island Time Tactical" className="h-16 w-auto" />
          <div className="text-center space-y-2">
            <p className="text-muted-foreground">
              Island Time Tactical - Premium Firearms & Tactical Gear
            </p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Island Time Tactical. All rights reserved.
            </p>
          </div>
          <div className="text-xs text-muted-foreground max-w-2xl text-center">
            <p>
              All firearms sales are subject to federal, state, and local laws. Buyers must pass 
              required background checks and meet all legal requirements for firearm ownership.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
