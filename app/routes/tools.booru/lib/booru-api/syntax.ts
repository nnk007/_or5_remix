//https://danbooru.donmai.us/wiki_pages/help%3Anumber_syntax 💀

export function numberSyntax(string:string):boolean{
    //is timestamp
    if(string.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}.{0,5}/)!=null){
        //it's not 100% correct but should work for most users
        const dateInterval = string.match(/(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\..*)\.\.(?:\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\..*)/);
        const dateComparison = string.match(/(>|<|<=|>=)?(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}.{0,5})/);
        return dateInterval != null || dateComparison != null;
    }
    //is number
    else{
        const intMatches = string.match(/([0-9]+\.\.[0-9]+)|((((<|>)?=?))[0-9]+)/);//match numbers
        return intMatches!=null && intMatches.find(v=>v==string)!=undefined

    }
}
export const NumSyntaxError =  new Error('Incorrect input, only %i, ><=%i or %i..%i supported')