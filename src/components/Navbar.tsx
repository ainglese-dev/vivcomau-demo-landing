import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why VIVCOM' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
  { href: '#testimonials', label: 'Testimonials' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'bg-black/90 backdrop-blur border-white/10'
          : 'bg-transparent border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#hero" aria-label="VIVCOM home">
          <img src="/vivcom-logo.svg" alt="VIVCOM" className="h-8 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex lg:items-center lg:gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Button
          asChild
          className="hidden lg:inline-flex bg-vivcom-green hover:bg-vivcom-green/90 text-black font-semibold"
        >
          <a href="#contact">Get in Touch</a>
        </Button>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white hover:bg-white/10 hover:text-white">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-sm">
            <SheetTitle className="sr-only">Site navigation</SheetTitle>
            <SheetDescription className="sr-only">
              Jump to a section of the page or get in touch with VIVCOM.
            </SheetDescription>
            <nav className="mt-12 flex flex-col gap-1 px-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild size="lg" className="mt-6 bg-vivcom-green hover:bg-vivcom-green/90 text-black font-semibold">
                <a href="#contact" onClick={() => setOpen(false)}>
                  Get in Touch
                </a>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
