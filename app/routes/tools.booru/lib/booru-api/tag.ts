// https://danbooru.donmai.us/wiki_pages/api%3Atags
/* 0   General
1	Artist
3	Copyright
4	Character
5	Meta */
export type TagCategory = 0|1|3|4|5;
export interface Tag{
    id:number;
    name:string;
    category:TagCategory;
    post_count:number;
    is_locked:boolean;
    is_deprecated:boolean;
    created_at:Date;
    updated_at:Date;
}