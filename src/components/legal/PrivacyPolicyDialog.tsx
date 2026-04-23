import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PrivacyPolicyContent } from '@/content/privacy-policy'

export function PrivacyPolicyDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl text-black">
            Privacy Policy
          </DialogTitle>
        </DialogHeader>
        <PrivacyPolicyContent />
      </DialogContent>
    </Dialog>
  )
}
