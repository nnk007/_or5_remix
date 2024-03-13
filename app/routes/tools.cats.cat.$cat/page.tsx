import { LoaderFunctionArgs } from "@remix-run/node";

export default function Cat({params}:LoaderFunctionArgs){
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col gap-2">
            <div className="max-w-full max-h-full outline-8 outline-purple-900  outline overflow-hidden rounded-lg"> 
                <img height={1000} width={1000} src={'/tools/cats/store/'+params.cat} alt="" className="w-full h-full"/>
            </div>
            <div>
                Cat {params.cat}
            </div>

        </div>
    )
}