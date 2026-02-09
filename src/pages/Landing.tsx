import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { 
  FileImage, 
  Lock, 
  Zap, 
  Download, 
  ArrowRight, 
  CheckCircle2,
  Shield
} from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'All processing happens in your browser. No uploads, no servers, no tracking.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Convert PDFs to images in seconds with powerful client-side processing.',
  },
  {
    icon: FileImage,
    title: 'High Quality',
    description: 'Export in PNG or JPEG with adjustable DPI settings up to 216 DPI.',
  },
  {
    icon: Download,
    title: 'Bulk Download',
    description: 'Download individual pages or all at once as a convenient ZIP file.',
  },
];

const benefits = [
  'No sign-up required',
  'No file size watermarks',
  'No quality limits',
  'Works offline',
  'Free forever',
  'Open for all',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Shield className="w-4 h-4" />
              100% Browser-based & Private
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                Snapshot your{' '}
                <span className="text-primary">documents</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Convert PDF pages to high-quality images instantly. 
                No sign-ups, no uploads, no watermarks—just fast, private conversion.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/convert">
                <Button size="xl" className="gap-2">
                  Start Converting
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Benefits pills */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container max-w-7xl mx-auto px-4 py-16 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose PageSnap?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for professionals who value speed, quality, and privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border transition-all duration-300 hover:shadow-lg hover:border-primary/20 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-xl bg-primary/10">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it Works Section */}
        <section className="container max-w-7xl mx-auto px-4 py-16 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Three simple steps to convert your PDFs to images.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Upload', description: 'Drag and drop your PDF or click to browse' },
              { step: '2', title: 'Convert', description: 'Watch as pages are converted in real-time' },
              { step: '3', title: 'Download', description: 'Save individual images or download all as ZIP' },
            ].map((item, index) => (
              <div
                key={item.step}
                className="text-center space-y-4 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground text-xl font-bold flex items-center justify-center mx-auto">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/convert">
              <Button size="lg" className="gap-2">
                Try It Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
