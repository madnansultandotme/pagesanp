import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Shield, 
  Code, 
  Heart, 
  Globe, 
  Lock, 
  Zap,
  FileImage,
  Users
} from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Privacy by Design',
    description: 'Your documents never leave your device. All processing happens locally in your browser using modern web technologies.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Optimized for speed with efficient memory management and progressive rendering for smooth conversions.',
  },
  {
    icon: Code,
    title: 'Modern Technology',
    description: 'Built with React, PDF.js, and Canvas API to deliver reliable, high-quality image conversions.',
  },
  {
    icon: Heart,
    title: 'Free Forever',
    description: 'No subscriptions, no hidden fees, no premium tiers. PageSnap is completely free to use.',
  },
];

const stats = [
  { icon: FileImage, value: 'PNG & JPEG', label: 'Export Formats' },
  { icon: Lock, value: '100%', label: 'Private' },
  { icon: Globe, value: 'Offline', label: 'Works Anywhere' },
  { icon: Users, value: 'Everyone', label: 'Free For' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="container max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              About PageSnap
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PageSnap is a privacy-first, browser-based tool that converts PDF documents 
              into high-quality images. Built for professionals, students, and anyone who 
              needs a fast, reliable way to extract images from PDFs without compromising 
              their data security.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-card border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="container max-w-7xl mx-auto px-4 py-16 border-t">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              The principles that guide how we build PageSnap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="flex gap-4 p-6 rounded-2xl bg-card border animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How it works technically */}
        <section className="container max-w-7xl mx-auto px-4 py-16 border-t">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              How It Works
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="font-semibold text-foreground mb-3">1. Local Processing</h3>
                <p className="text-sm leading-relaxed">
                  When you upload a PDF, it's read directly by your browser using the File API. 
                  The file never leaves your device and is never sent to any server.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="font-semibold text-foreground mb-3">2. PDF.js Rendering</h3>
                <p className="text-sm leading-relaxed">
                  We use Mozilla's PDF.js library to parse and render PDF pages. Each page is 
                  rendered to an HTML Canvas element at your chosen resolution.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-card border">
                <h3 className="font-semibold text-foreground mb-3">3. Image Export</h3>
                <p className="text-sm leading-relaxed">
                  The Canvas content is converted to PNG or JPEG format using the native 
                  Canvas API. You can download individual images or bundle them into a ZIP file.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact / Support */}
        <section className="container max-w-7xl mx-auto px-4 py-16 border-t">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Questions or Feedback?
            </h2>
            <p className="text-muted-foreground">
              PageSnap is continuously improving. If you have suggestions, find bugs, 
              or just want to say hello, we'd love to hear from you.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for the web
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
