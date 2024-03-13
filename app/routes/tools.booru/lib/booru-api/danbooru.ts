import { Counts } from "./counts";
import { Post } from "./post";
import { Posts } from "./posts";
import { Tags } from "./tags";
export type DonmaiSubdomain = 'testbooru' | 'safebooru' | 'danbooru';
class Booru {
    private _server:DonmaiSubdomain = 'testbooru';
    protected static _Posts: (server: DonmaiSubdomain) => Posts = (server) => { return new Posts({ server: server }); }
    protected static _Tags: (server: DonmaiSubdomain) => Tags = (server) => { return new Tags({ server: server }) };
    protected static _Counts:(server:DonmaiSubdomain)=> Counts = (server)=>{return new Counts({server:server})};
}
export class Testbooru extends Booru{
    static Posts = this._Posts("testbooru");
    static Tags = this._Tags("testbooru");
    static Counts = this._Counts("testbooru");
    Posts:Posts;
    Tags:Tags;
    Counts:Counts;
    constructor(){
        super();
        this.Posts = Testbooru.Posts;
        this.Tags = Testbooru.Tags;
        this.Counts = Testbooru.Counts;
    }
}
export class Danbooru extends Booru{
    static Posts:Posts = this._Posts("danbooru")
    static Tags:Tags = this._Tags("danbooru");
    static Counts = this._Counts("danbooru");
    Posts:Posts;
    Tags:Tags;
    Counts:Counts;
    constructor(){
        super();
        this.Posts = Danbooru.Posts;
        this.Tags = Danbooru.Tags;
        this.Counts = Danbooru.Counts;
    }
}
export class Safebooru extends Booru{
    static Posts:Posts = this._Posts("safebooru");
    static Tags:Tags = this._Tags("safebooru");
    static Counts = this._Counts("safebooru");
    Posts:Posts;
    Tags:Tags;
    Counts:Counts;
    constructor(){
        super();
        this.Posts = Safebooru.Posts;
        this.Tags = Safebooru.Tags;
        this.Counts = Safebooru.Counts;
    }
}
