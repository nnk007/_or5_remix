'use client';
import { createContext, useContext, useReducer, useState } from "react";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";

// 
enum MAppSections {
    HOME = 0,
    CHAT = 1,
    CALL = 2,
    ADD = 3

}
type SidebarState = {
    section: MAppSections
}
type SidebarAction = {
    type: 'setSidebarSection',
    section: MAppSections
}
export interface SideBarContext {
    state: SidebarState,
    reducer: React.Dispatch<SidebarAction>
}
// 
type ChatState = {
    chat: number
}
type ChatAction = {
    type: 'setChatId',
    id: number
}
interface ChatContext {
    state: ChatState,
    reducer: React.Dispatch<ChatAction>
}

// 
type MAppState = SidebarState & ChatState;
type MAppAction = SidebarAction | ChatAction
type MAppContext = SideBarContext | ChatContext;
const MAppReducer: React.Reducer<MAppState, MAppAction> = (state, action) => {
    switch (action.type) {
        case 'setChatId': {
            return {
                ...state,
                chat: action.id
            }
        }
        case 'setSidebarSection': {
            return {
                ...state,
                section: action.section
            }
        }
    }
}

export const Context = createContext<MAppContext>(0 as unknown as MAppContext);
export default function CPage() {
    const [state, dispatch] = useReducer<typeof MAppReducer, MAppState>(MAppReducer, { chat: 0, section: MAppSections.CHAT }, (arg0) => arg0);
    return (
        <Context.Provider value={{ state: state, reducer: dispatch }}>
            <div className="w-screen h-screen grid grid-cols-[auto_minmax(25%,auto)_1fr] grid-rows-1 grid-flow-col bg-neutral-950 text-white gap-2 font-medium">
                <Sidebar />
                {
                    state.section == MAppSections.CHAT &&
                    <>
                        <ChatList />
                        <ChatWindow />
                    </>
                }
            </div>
        </Context.Provider>
    )
}