import { Input } from "@/components/ui/input";

export function FilterInput(){
    return(
        <Input
            id="search"
            type="text"
            //placeholder="Digite aqui..."
            placeholder="Filtrar por nome"
        />
    )
}