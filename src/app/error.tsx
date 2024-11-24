'use client'

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

export default function Error({
    error,
    reset
}: any) {
    useEffect(() => {
        toast({ title: "Erro", description: error.message, variant: "error" });
    }, [error]);

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <h1>Algum erro ocorreu:</h1>
            <p>{error.message}</p>
            <Button
                onClick={
                    () => reset()
                }
            >
                Tentar novamente
            </Button>
        </div>
    );
}