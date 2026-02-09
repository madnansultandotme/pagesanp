import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card/50">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">PageSnap</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/convert" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Convert
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Privacy note */}
          <p className="text-sm text-muted-foreground text-center md:text-right">
            Your files never leave your device.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PageSnap. All processing happens locally in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
