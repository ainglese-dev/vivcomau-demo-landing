import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CookiePolicyContent } from '@/content/cookie-policy'

export function CookiePolicyDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-black">
            Cookie Policy
          </DialogTitle>
        </DialogHeader>
        <CookiePolicyContent />
      </DialogContent>
    </Dialog>
  )
}
