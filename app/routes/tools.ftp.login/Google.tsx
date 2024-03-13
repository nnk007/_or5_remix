'use client';
import { useEffect } from "react";

const ID = 'env var';
export default function GoogleButton({action}:{action:(jwt:string)=>any}) {
    function handleCredentialResponse(response: any) {
        console.log(response);
        console.log("Encoded JWT ID token: " + response.credential);
        action(response.credential);
    }
    
    useEffect(()=>{
        //@ts-expect-error
        google.accounts.id.initialize({
            client_id: ID,
            callback: handleCredentialResponse
        });
        //@ts-expect-error
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
        );
        //@ts-ignore
        // google.accounts.id.prompt();
    },[])
    return (
        <div>
            <script src="https://accounts.google.com/gsi/client" async defer></script>
            <div id="buttonDiv"></div>
        </div>)
}