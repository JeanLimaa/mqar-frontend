import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewConnection() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="bg-slate-700 px-7">
            Nova conexão
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova conexão</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="name" className="text-left">
              Nome para o dispositvo
            </Label>
            <Input id="name" placeholder="John Doe" className="col-span-3" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="username" className="text-left">
              ID do dispositvo
            </Label>
            <Input id="username" placeholder="Z@sBlPqW" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="bg-slate-700">
            Salvar
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
