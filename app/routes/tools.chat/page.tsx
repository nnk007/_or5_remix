import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import Test from "./components/Test";
import CPage from "./Client";
import { useEffect, useState } from "react";

async function getMessages() { return ["1"] }

export default function Page() {
    const [messages, setMessages] = useState<string[]>();
    useEffect(() => {
        getMessages().then(setMessages)
    }, [])
    return (
        <CPage />
    )
}
