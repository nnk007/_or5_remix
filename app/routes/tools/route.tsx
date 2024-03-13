import { Outlet } from "@remix-run/react";
import { useState } from "react";
import Tooltip from "~/shared/Tooltip";

export default function Route() {
    const [tooltipClose, setTTC] = useState(false)
    return <div className="w-full h-full">
        {tooltipClose ? null : <Tooltip handleClick={() => { setTTC(true) }} />}
        <Outlet />
    </div>
}
