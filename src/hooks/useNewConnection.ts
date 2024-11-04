import api from "@/services/protectedApiService";
import { useState } from "react"
import { AxiosError } from "axios"
import { toast } from "@/hooks/use-toast"

export function useNewConnection(){
    const [isOpen, setIsOpen] = useState(false);
    const [device, setDevice] = useState({
      id: "",
      deviceName: null,
      deviceId: "",
    });
  
  
    async function handleOpen() {
      try {
        const response = await api.post("/devices");
        const data = response.data;
  
        setDevice({
          id: data._id,
          deviceName: null,
          deviceId: data.deviceId,
        });
      } catch (error) {
        if(error instanceof AxiosError) {
          toast({
            title: "Erro", 
            variant: "error",
            description: error.response?.data.message || "Ocorreu algum erro ao abrir nova conexão"
          });
        }
      }
    }
  
    async function handleSubmit() {
      try {
        const name = (document.getElementById("name") as HTMLInputElement).value;
        await api.put(`/devices/${device.id}`, { deviceName: name });
  
        setIsOpen(false);
  
        toast({
          title: "Sucesso",
          variant: "success",
          description: "Dispositivo salvo com sucesso"
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: "Erro",
            variant: "error",
            description: error.response?.data.error || "Ocorreu algum erro ao salvar o dispositivo"
          });
        }
      }
    }

    return {
        isOpen,
        setIsOpen,
        device,
        handleOpen,
        handleSubmit
    }
}