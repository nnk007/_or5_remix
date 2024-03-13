import { LoaderFunctionArgs } from "@remix-run/node";

export function loader({params}:LoaderFunctionArgs){
    return new Response('API down',{status:400});
}