import {SESH,G_AUTH} from '~/cookies.server';
import {Outlet, useNavigate} from "@remix-run/react";
import { useEffect } from 'react';
function isLoggedIn(){
    const sesh_id = SESH || G_AUTH;
    return sesh_id !== undefined;
}
export default function Page() {
    const authed = isLoggedIn();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!authed) navigate('./login',{replace:true});
    },[]);
    return (
        <>
            <Outlet />
        </>
    )
}

