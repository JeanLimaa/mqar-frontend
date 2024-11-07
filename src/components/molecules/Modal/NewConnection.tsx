'use client'
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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TooltipBase from "@/components/atoms/Tooltip/Tooltip"
import { useNewConnection } from "@/hooks/useNewConnection"
import InputIcon from "@/components/atoms/Inputs/InputIcon"
import CopyIcon from "@mui/icons-material/ContentCopy"
import { useState } from "react"
import DoneIcon from '@mui/icons-material/Done';

export function NewConnection() {
  const {
    isOpen,
    setIsOpen,
    device,
    handleOpen,
    handleSubmit
  } = useNewConnection();

  const [isCopied, setIsCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(device.deviceId);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 800);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen} variant="default" className="bg-slate-700 px-7">
            Nova conexão
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nova conexão</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-3">
            <Label htmlFor="username" className="text-left">
              ID do dispositvo 
              <TooltipBase text="Copie este ID e cole nas configurações do seu MQ-AR (ESP-32).">
                <HelpOutlineIcon sx={{width: '32px'}} className="hover:cursor-help" />
              </TooltipBase>
            </Label>
            
            {/* <Input disabled value={device.deviceId} id="username" className="col-span-3" /> */}
            <InputIcon 
              icon={
                !isCopied ? <CopyIcon sx={{width: '24px'}} className={`hover:cursor-pointer`} />
                : <DoneIcon sx={{width: '24px'}} className={`hover:cursor-pointer`} />
              }
              onClickIcon={handleCopy}
              disabled 
              value={device.deviceId} 
              id="username" 
              className="col-span-3" 
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name" className="text-left">
              Nome para o dispositvo
            </Label>
            <div>
              <Input minLength={3} maxLength={14} id="name" placeholder="Ex: Meu sensor 1" className="col-span-3" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="button" className="bg-slate-700">
            Salvar
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
