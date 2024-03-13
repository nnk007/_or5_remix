import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
    const links = await import("./sns.json");
    const { sns } = params as { sns: string };
    return json(links[sns]);
}

export default function Route() {
    const path = useLoaderData<typeof loader>();
    useEffect(() => {
        if (path) {
            console.log(path);
            window.location.replace(path);
        }
    }, [])
    return (
        <div className="flex flex-col items-center justify-center bg-black text-white h-full w-full text-3xl">
            <p>Unknown contact option</p>
            <div className="relative flex flex-row gap-1">
                <div className="animate-nuhuh">☝</div>
                <div>😐</div>
            </div>
        </div>
    )
}