'use client'
import React, { useState } from "react";
import {useNavigate} from "@remix-run/react";
export function _Button({ className, children, action: handleClick }: { children: React.ReactNode, className?: string, action: (...args: any) => any }) {
    const [hover, setHover] = useState(false);
    const [toggled, setToggled] = useState(false);
    return (
        <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={() => { setToggled(!toggled); handleClick() }} className={`${className} hover:text-white`} style={toggled ? { fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48` } : {}}>
            {children}
        </button>
    )
}
class Button extends React.Component {
    state = {
        hover: false,
        toggled: false
    }
    //@ts-expect-error
    props: Readonly<{ className: string, children: React.ReactNode, action: any,toggle?:boolean }>;
    constructor(props: { className: string, children: React.ReactNode, action: any | Function, toggle?:boolean}) {
        super(props)
    }
    setHover(state: boolean) {
        this.setState({ ...this.state, hover: state });
    }
    setToggled(state: boolean) {
        this.setState({ ...this.state, toggled: state });
    }
    handleClick = (e: React.MouseEvent) => {
        if(this.props.toggle)this.setToggled(!this.state.toggled);
        this.props.action();
    }
    render(): React.ReactNode {
        return (
            <button onMouseEnter={() => this.setHover(true)} onMouseLeave={() => this.setHover(false)} onClick={this.handleClick} className={`${this.props.className} hover:text-white`} style={this.state.toggled ? { fontVariationSettings: `'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48` } : {}}>
                {this.props.children}
            </button>
        )
    }
}

//@ts-expect-error
export function LikeButton({ className, children, action }) {
    return <Button className={className} action={() => { }} toggle>{children}</Button>
}
export function DLButton({ className, children, action: getBuffer }: { children: React.ReactNode, className?: string, action: () => Promise<{name:string,type:string,data:number[]}> }) {
    function handleDL() {
        getBuffer().then(({name,type,data}) => {
            console.table({name:name,type:type,bytes:data.length});
           const blob = new Blob([Uint8Array.from(data)],{type:type});
           const url = window.URL.createObjectURL(blob);
           const a = document.createElement('a');
           a.href = url;
           a.target='_blank';
           a.download = name;
           a.click();
        })
    }
    return <Button action={handleDL} className={className as string}>{children}</Button>
}
export function DeleteButton({ className, children, action }:{action:()=>Promise<boolean>,children:React.ReactNode,className:string}) {
    const navigate = useNavigate();
    async function handleDelete(){
        await action() ? navigate('.',{replace:true}) : console.error(400);
    }
    return <Button className={className} action={handleDelete}>{children}</Button>
}

export function UploadButton({className,action,children}:{className:string,action:(arg0:any)=>Promise<boolean>,children:React.ReactNode}){
    const navigate = useNavigate();
    function handleClick(){
        alert('File Size < 1MB')
        const inp = document.createElement('input');
        inp.type = 'file';
        inp.onchange = async (e)=>{
            if(inp.files && inp.files?.length!==0){
                const file = inp.files[0];
                const ab = await file.arrayBuffer();
                const u8a = new Uint8Array(ab);
                const res = await action({name:file.name,type:file.type,size:file.size,data:u8a});
                res ? navigate('.',{replace:true}):console.error(400);
            }
        }
        inp.click();
    }
    return(
        <button className={className} onClick={handleClick}>
            {children}
        </button>
    )
}