"use server";

import { useRouter } from "next/navigation";

function changeViewParam(urlString: string, view: string) {
    const router = useRouter();
    const modifiedUrl = new URL(urlString)
    console.log(modifiedUrl, urlString, view)
    modifiedUrl.searchParams.set("view", view)
    router.refresh()
}