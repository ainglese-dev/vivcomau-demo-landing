import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Jenkins',
    role: 'Homeowner, Surry Hills',
    content:
      'Juan and his team installed a complete CCTV system for our home. Professional, clean, and took the time to explain how the app works. Highly recommended!',
    rating: 5,
  },
  {
    name: 'David Chen',
    role: 'Office Manager, North Sydney',
    content:
      'VIVCOM handled our entire office network cabling and AV setup for the new boardroom. Flawless execution and great communication throughout the project.',
    rating: 5,
  },
  {
    name: 'Michael R.',
    role: 'IT Director',
    content:
      "The VIV53 team's expertise in network automation helped us migrate our legacy infrastructure to a modern VXLAN fabric with zero downtime. Exceptional consulting.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-vivcom-dark-blue text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-white/60">
            Don't just take our word for it. Here's what our customers have to
            say about our services.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="bg-white/10 border-white/15 text-white"
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-white/80 mb-6 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-white/50">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
