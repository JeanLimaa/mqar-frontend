import { headers } from "next/headers";

export function getUrlParams(){
    const header =  headers();
    const urlString = header.get('x-url');
    const url = urlString ? new URL(urlString) : null;

    const page = url?.searchParams.get("page");
    const days = url?.searchParams.get("days");
    const view = url?.searchParams.get("view");
    const orderBy = url?.searchParams.get("orderBy");

    return {page, days, view, orderBy};
}