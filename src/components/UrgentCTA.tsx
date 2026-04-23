import { Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function UrgentCTA() {
  return (
    <section className="bg-black py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
        {/* Availability indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vivcom-green/10 border border-vivcom-green/25 text-vivcom-green text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vivcom-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-vivcom-green" />
          </span>
          Available Now
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          Send us a message through the contact form and we'll call you to discuss your project and arrange a meeting.
        </p>

        <Button
          asChild
          size="lg"
          className="rounded-full gap-3 px-8 py-6 text-base font-semibold bg-[rgb(0,194,203)] hover:bg-[rgb(0,194,203)] [a]:hover:bg-[rgb(0,194,203)] text-black shadow-lg shadow-vivcom-green/20 transition-transform hover:scale-105"
        >
          <a href="#contact">
            <Mail className="w-5 h-5" />
            Send Us a Message
          </a>
        </Button>
      </div>
    </section>
  )
}
