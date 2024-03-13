import { LoaderFunctionArgs } from "@remix-run/node";

export function loader({context}:LoaderFunctionArgs){
    const {ip} = context;
    console.log(context);
    return new Response(JSON.stringify({ip:ip}),{headers:{
        "Content-Type":"application/json"
    }})
}