import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const outcomeCards = [
  {
    icon: '🧭',
    title: 'Strategy',
    description:
      'Clarity on goals, ICP, revenue model, and decision-making frameworks.',
    color: 'border-primary/30',
    accent: 'text-primary',
  },
  {
    icon: '🎨',
    title: 'Brand',
    description:
      'Positioning, visual identity, and messaging that converts attention into trust.',
    color: 'border-secondary/30',
    accent: 'text-secondary',
  },
  {
    icon: '📈',
    title: 'Marketing',
    description:
      'Lead generation systems, content, and conversion that create predictable growth.',
    color: 'border-primary/30',
    accent: 'text-primary',
  },
  {
    icon: '🤖',
    title: 'AI & Automation',
    description:
      'Scaling beyond yourself with intelligent systems that work while you sleep.',
    color: 'border-secondary/30',
    accent: 'text-secondary',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-[#2a2a2a] bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-primary font-bold text-lg tracking-tight">
            Audio Jones
          </span>
          <Link href="/assessment">
            <Button variant="outline" size="sm">
              Start Diagnostic
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm font-medium">
              Signal Diagnostic System
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#f5f5f5] mb-6 leading-tight tracking-tight">
            Diagnose Your{' '}
            <span className="text-primary">Business Signal</span>
          </h1>

          <p className="text-xl text-[#a3a3a3] mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop solving the wrong problem. Find out exactly where your business
            is blocked — and what to fix first.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment">
              <Button variant="primary" size="lg">
                Start Your Free Diagnostic →
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button variant="ghost" size="lg">
                How It Works
              </Button>
            </a>
          </div>

          <p className="text-[#555] text-sm mt-6">
            20 questions · 5 minutes · Personalized results
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#f5f5f5] mb-4">
              What is the Signal Diagnostic?
            </h2>
            <p className="text-[#a3a3a3] text-lg max-w-2xl mx-auto">
              Most businesses don&apos;t have an AI problem. They have a signal
              problem — and they&apos;re investing in the wrong solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Answer 20 questions',
                desc: 'Covering strategy, branding, marketing, and AI readiness.',
              },
              {
                step: '02',
                title: 'We analyze your signal',
                desc: 'Our diagnostic engine scores each domain and identifies your real bottleneck.',
              },
              {
                step: '03',
                title: 'Get your personalized report',
                desc: 'See exactly where you are, what\'s blocking you, and what to do next.',
              },
            ].map((item) => (
              <Card key={item.step} variant="bordered">
                <div className="text-primary font-mono text-sm font-bold mb-3">
                  {item.step}
                </div>
                <h3 className="text-[#f5f5f5] font-semibold mb-2">{item.title}</h3>
                <p className="text-[#a3a3a3] text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome cards */}
      <section className="py-24 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#f5f5f5] mb-4">
              Four Possible Diagnoses
            </h2>
            <p className="text-[#a3a3a3] text-lg">
              Every business bottleneck falls into one of four categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {outcomeCards.map((card) => (
              <Card
                key={card.title}
                variant="bordered"
                className={`border ${card.color} hover:border-opacity-60 transition-all duration-200`}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className={`text-lg font-bold mb-2 ${card.accent}`}>
                  {card.title}
                </h3>
                <p className="text-[#a3a3a3] text-sm">{card.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-[#2a2a2a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#f5f5f5] mb-4">
            Ready to Find Your Bottleneck?
          </h2>
          <p className="text-[#a3a3a3] mb-8">
            The diagnostic is free, takes 5 minutes, and gives you a clear
            picture of what&apos;s actually holding your business back.
          </p>
          <Link href="/assessment">
            <Button variant="primary" size="lg">
              Start Your Free Diagnostic →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#2a2a2a] py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[#555] text-sm">
          <span>© {new Date().getFullYear()} Audio Jones. All rights reserved.</span>
          <span>Signal Diagnostic System v1.0</span>
        </div>
      </footer>
    </main>
  );
}
