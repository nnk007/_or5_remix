import { Count } from "./count";
import { DonmaiSubdomain } from "./danbooru";
import { Post } from "./post";
import * as https from 'https';
import * as qs from 'querystring';
/* 
GET    /counts/posts(.:format)                                      counts#posts
GET    /counts(.:format)                                            counts#index
GET    /counts/new(.:format)                                        counts#new
GET    /counts/:id/edit(.:format)                                   counts#edit
GET    /counts/:id(.:format)                                        counts#show
POST   /counts(.:format)                                            counts#create
PATCH  /counts/:id(.:format)                                        counts#update
PUT    /counts/:id(.:format)                                        counts#update
DELETE /counts/:id(.:format)                                        counts#destroy
 */
export class Counts {
    private _server:DonmaiSubdomain
    private _tags:string;
    constructor({server}:{server:DonmaiSubdomain}={server:"testbooru"}){
        this._server = server
        this._tags = '';
        return this;
    }
    tags(tags:string | string[]):Counts{
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
    get():Promise<Count>{
        console.log(this._tags);
        const body:{_method:string,tags:string} = {
            _method:'get',
            tags:this._tags == undefined ? '' : this._tags,   
        };
        const options: https.RequestOptions = {
            host: this._server + '.donmai.us',
            headers: {
                'User-Agent': 'curl/7.68.0',
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(qs.stringify(body))
            },
            path: '/counts/posts.json',
            method: 'POST',
        }
        return new Promise((res, rej) => {
            const req = https.request(options, (response) => {
                if (response.statusCode != 200) {
                    return rej(new Error('Request denied'));
                }

                let b = '';
                response.on('data', (c) => {
                    b += c;
                });
                response.on('close', () => {
                    const ps: Count = JSON.parse(b);
                    res(ps);
                })
            });
            req.end(qs.stringify(body));
        })    
    }
}