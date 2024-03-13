import { Tag, TagCategory } from "./tag";
import * as https from 'https'
import * as QueryString from 'querystring';
import { DonmaiSubdomain } from "./danbooru";
import { NumSyntaxError, numberSyntax } from "./syntax";
type TagSearchOrder = 'name' | 'date' | 'count' | 'similarity';
type TagSearchSpecial = 'fuzzy_name_matches' | 'name_matches' | 'name_normalize' | 'name_or_alias_matches' | 'hide_empty';

class TagsIndex {
    private _server: DonmaiSubdomain = 'testbooru';
    private _order: TagSearchOrder = 'date';
    private _special: TagSearchSpecial | undefined;
    private _search_param: string | undefined;
    private _tag_id!: string; //number syntax
    private _category!: TagCategory;
    private _post_count!: string; //>= | <= | < | > number
    private _created_at!: string;
    private _updated_at!: string;
    private _name!: string;
    private _is_locked!: boolean;
    private _is_deprecated!: boolean;
    //I ain't supporting chaining syntax fields
    private _log: boolean = false;

    constructor({server}:{server:DonmaiSubdomain}={server:"testbooru"}){
        this._server = server
        return this;
    }
    
    debug(state: boolean): TagsIndex {
        this._log = state;
        return this
    }
    server(name: DonmaiSubdomain): TagsIndex {
        this._server = name;
        return this;
    }
    order(order: TagSearchOrder): TagsIndex {
        this._order = order;
        return this;
    }
    /**
     * 
     * @param id String in form `%i`, `>=%i` or `%i..%i+1`
     * @returns 
     */
    id(id: string): TagsIndex {
        if (!numberSyntax(id)) throw NumSyntaxError;
        this._tag_id = id;
        return this;
    }
    category(categoryNumber: TagCategory): TagsIndex {
        this._category = categoryNumber;
        return this;
    }
    post_count(count: string): TagsIndex {
        if (!numberSyntax(count)) throw NumSyntaxError;
        this._post_count = count;
        return this;
    }
    created_at(date: Date | string): TagsIndex {
        if (typeof date != "string") {
            this._created_at = date.toISOString();
        } else {
            if (!numberSyntax(date)) throw NumSyntaxError;
            this._created_at = date;
        }
        return this;
    }
    updated_at(date: Date | string): TagsIndex {
        if (typeof date != "string") {
            this._updated_at = date.toISOString();
        } else {
            if (!numberSyntax(date)) throw NumSyntaxError;
            this._updated_at = date;
        }
        return this;
    }
    is_locked(b: boolean): TagsIndex {
        this._is_locked = b;
        return this;
    }
    is_deprecated(b: boolean): TagsIndex {
        this._is_deprecated = b;
        return this;
    }
    name(name: string): TagsIndex {
        this._name = name;
        return this;
    }
    special(option: TagSearchSpecial, param: string): TagsIndex {
        this._special = option;
        this._search_param = param;
        return this;
    }
    /**
     * 
     * @returns {Promise<Tag[]>} Returns an Array of `Tag`, empty if nothing matched;
     */
    async get():Promise<Tag[]> {
        const body = {
            _method: "get",
            "search[order]": this._order,
        };
        if (this._tag_id !== undefined) {
            Object.assign(body, { 'search[id]': this._tag_id });
        }
        if (this._category !== undefined) {
            Object.assign(body, { 'search[category]': this._category });
        }
        if (this._post_count !== undefined) {
            Object.assign(body, { 'search[post_count]': this._post_count });
        }
        if (this._created_at !== undefined) {
            Object.assign(body, { 'search[created_at]': this._created_at });
        }
        if (this._updated_at !== undefined) { 
            Object.assign(body,{'search[updated_at]':this._updated_at});
        }
        if (this._name!==undefined){
            Object.assign(body,{'search[name]':this._name});
        }
        if(this._is_locked!==undefined){
            Object.assign(body,{"search[is_locked]":this._is_locked});
        }
        if(this._is_deprecated!==undefined){
            Object.assign(body,{'search[is_deprecated]':this._is_deprecated});
        }
        if (this._special != undefined && this._search_param != undefined) {
            Object.assign(body, Object.fromEntries(new Map([[`search[${this._special}]`, this._search_param]])));
        }

        const options: https.RequestOptions = {
            host: this._server + '.donmai.us',
            headers: {
                'User-Agent': 'curl/7.68.0',
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(QueryString.stringify(body))
            },
            path: '/tags.json',
            method: 'POST',
        }
        if (this._log) {
            console.log('httpRequestOptions', options);
            console.log('Request body', body);
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
                    const ps: Tag[] = JSON.parse(b);
                    res(ps);
                })
            });
            req.end(QueryString.stringify(body));
        })
    }

    async getRaw(requestBody:Object):Promise<Tag[]> {
        const body = {
            _method: "get",
        };
        Object.assign(body, requestBody);

        const options: https.RequestOptions = {
            host: this._server + '.donmai.us',
            headers: {
                'User-Agent': 'curl/7.68.0',
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": Buffer.byteLength(QueryString.stringify(body))
            },
            path: '/tags.json',
            method: 'POST',
        }
        if (this._log) {
            console.log('httpRequestOptions', options);
            console.log('Request body', body);
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
                    const ps: Tag[] = JSON.parse(b);
                    res(ps);
                })
            });
            req.end(QueryString.stringify(body));
        })
    }
}
class TagsShow{
    private _server:DonmaiSubdomain = 'testbooru';
    constructor({server}:{server:DonmaiSubdomain}={server:"testbooru"}){
        this._server = server
        return this;
    }
    get(id:number):Promise<Tag>{
        const body = {
            _method: "get",
        };

        const options: https.RequestOptions = {
            host: this._server + '.donmai.us',
            headers: {
                'User-Agent': 'curl/7.68.0',
                "Content-Type": "application/x-www-form-urlencoded",
            },
            path: '/tags/'+id+'.json',
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
                    const ps: Tag = JSON.parse(b);
                    res(ps);
                })
            });
            req.end(QueryString.stringify(body));
        })
    }
}
export class Tags{
    Index:TagsIndex=new TagsIndex();
    Show:TagsShow=new TagsShow();
    //Update:TagsUpdaet=new TagsUpdate() need auth as admin, i ain't one, so no functionality
    constructor({server}:{server:DonmaiSubdomain}={server:"testbooru"}){
        this.Index = new TagsIndex({server:server});
        this.Show = new TagsShow({server:server});
        return this;
    }
}