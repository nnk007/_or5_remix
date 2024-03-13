import { Link } from "@remix-run/react"

export default function _() {
    return (
        <div className="flex flex-col items-center justify-center h-full w-full">
            <p>Tool not found</p>
            <Link to={"/"}><span className='material-symbols-outlined'>arrow_back</span></Link>
        </div>
    )
}