import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function usePagination(){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    function makeQueryChange(queryName: string, value: string) {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        current.set(queryName, value);

        //quando alterar o dia, é necessario retornar para a primeira pagina
        if (queryName === "days") {
            current.set("page", "1"); // Resetar a página para 1
        }
        
        const search = current.toString();

        const query = search ? `?${search}` : "";

        router.push(`${pathname}${query}`);
    }

    function handlePageChange(newPage: number) {
        makeQueryChange("page", newPage.toString());
    }

    function handleDayFilterChange(newDay: string) {
        makeQueryChange("days", newDay.toString());
    }

    function handleViewChange(newView: "history" | "charts") {
        makeQueryChange("view", newView.toString());
    }

    return {
        handlePageChange,
        handleDayFilterChange,
        handleViewChange
    }
}