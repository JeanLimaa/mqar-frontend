import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export function usePagination(){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [paramValues, setParamValues] = useState({
        page: searchParams.get("page"),
        days: searchParams.get("days"),
        view: searchParams.get("view"),
        orderBy: searchParams.get("orderBy")
    });

    function makeQueryChange(queryName: string, value: string) {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        current.set(queryName, value);

        //quando alterar o dia, é necessario retornar para a primeira pagina
        if (queryName === "days") {
            current.set("page", "1"); // Resetar a página para 1
        }
        
        const search = current.toString();

        const query = search ? `?${search}` : "";

        setParamValues((prev) => {
            const updated = {
                ...prev,
                [queryName]: value,
            };
        
            return updated;
        });
        
        router.push(`${pathname}${query}`);
/*         setParamValues((prev) => ({
            ...prev,
            [queryName]: value
        }));

        console.log(paramValues, value);

        router.push(`${pathname}${query}`); */
        //router.refresh();
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

    function handleOrderByChange(orderBy: "history" | "charts") {
        makeQueryChange("orderBy", orderBy.toString());
    }

    return {
        handlePageChange,
        handleDayFilterChange,
        handleViewChange,
        handleOrderByChange,
        paramValues
    }
}