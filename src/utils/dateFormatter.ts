export function dateFormatter(value: string | Date) {
    let date: Date;

    if (typeof value === "string") {
        // Dividir o valor no formato dd/mm/yyyy
        const [day, month, year] = value.split("/").map(Number);

        // Garantir que valores válidos sejam fornecidos
        if (!day || !month || !year) {
            throw new Error("Formato de data inválido. Use dd/mm/yyyy.");
        }

        // Criar a data com base nos valores extraídos
        date = new Date(year, month - 1, day); // Mês é zero-based
    } else {
        date = value;
    }

    return date.toLocaleDateString("pt-br", {
        month: "short",
        day: "numeric",
    });
}