/* eslint-disable jsx-a11y/label-has-associated-control */
export default function Searchbar({onSubmit:submit}:{onSubmit:(tag:string)=>any}){
    return(
        <div className="">
            <form action="" onSubmit={(e)=>{
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const tag = fd.get('searchbar')
                if(tag!=null){
                    submit(tag as string);
                }
            }}>
                <label htmlFor="">
                    <input className="bg-white rounded-md p-2" type="text" name="searchbar" id="" placeholder="Start typing tag name"/>
                </label>
            </form>
        </div>
    )
}