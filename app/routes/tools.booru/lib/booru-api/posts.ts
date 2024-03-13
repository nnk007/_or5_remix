import * as https from 'https';
import * as QueryString from 'querystring';
import { Post } from './post';
import { DonmaiSubdomain } from './danbooru';
class PostsIndex{
    private _server: DonmaiSubdomain = 'testbooru';
    private _tags:string = '';
    private pageOffset:number = 0;
    private returnLimit:number = 200;
    private log:boolean = false;
    constructor({server}:{server?:DonmaiSubdomain}={server:undefined}){
        if(server!==undefined) this._server = server;
        return this;
    }
    debug(state:boolean):PostsIndex{
        this.log = state;
        return this
    }
    limit(limit:number):PostsIndex{
        this.returnLimit = limit>0 && limit<200 ? limit : 200;
        return this;
    }
    page(page:number):PostsIndex{
        if(page >=0){
            this.pageOffset = page;
        } else throw new Error("Negative page number");
        return this;
    }
    tags(tags:string | string[]):PostsIndex{
        if(typeof tags == 'string'){
            this._tags = tags;
        } else {
            this._tags ='';
            for(let tag of tags){
                this._tags = this._tags.concat(tag,' ');
            }
            this._tags = this._tags.slice(0,-1);
        }
        return this;
    }
    async get():Promise<Post[]>{
        const body = QueryString.stringify({
            _method:"get",
            page:this.pageOffset,
            limit:this.returnLimit,
            tags:this._tags
        });
        const options:https.RequestOptions = {
            host:this._server+'.donmai.us',
            headers: {
                'User-Agent': 'curl/7.68.0', 
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length":Buffer.byteLength(body)
            },
            path:'/posts.json',
            method:'POST',
        }
        if(this.log){
            console.log('httpRequestOptions',options);
            console.log('Request body',body);
        }
        return new Promise((res,rej)=>{
            const req = https.request(options, (response) => {
                if(response.statusCode == 422){
                    rej(new Error('You cannot search for more than 2 tags at a time.'));
                }
                else if(response.statusCode!=200){
                    return rej(new Error('Request denied'));
                }

                let b = '';
                response.on('data',(c)=>{
                    b+=c;
                });
                response.on('close',()=>{
                    const ps:Post[] = JSON.parse(b);
                    res(ps);
                })
            });
            req.end(body);
        })
    }
}
class PostsShow{
    private _server:DonmaiSubdomain = 'testbooru';
    constructor({server}:{server:DonmaiSubdomain}={server:'testbooru'}){
        this._server = server;
        return this;
    }
    async get(id:number):Promise<Post>{
        const body = QueryString.stringify({
            _method:"get",
        });
        const options:https.RequestOptions = {
            host:this._server+'.donmai.us',
            headers: {
                'User-Agent': 'curl/7.68.0', 
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length":Buffer.byteLength(body)
            },
            path:'/posts/'+id+'.json',
            method:'POST',
        }
        return new Promise((res,rej)=>{
            const req = https.request(options, (response) => {
                if(response.statusCode!=200){
                    return rej(new Error('Request denied'));
                }

                let b = '';
                response.on('data',(c)=>{
                    b+=c;
                });
                response.on('close',()=>{
                    const ps:Post = JSON.parse(b);
                    res(ps);
                })
            });
            req.end(body);
        })
    }
}
export class Posts{
    Index:PostsIndex = new PostsIndex();
    Show:PostsShow = new PostsShow();
    //Update, Revert
    constructor({server}:{server:DonmaiSubdomain}={server:'testbooru'}){
        this.Index = new PostsIndex({server:server});
        this.Show = new PostsShow({server:server});
        return this;
    }
}