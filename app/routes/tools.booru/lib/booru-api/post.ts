// https://safebooru.donmai.us/wiki_pages/api%3Aposts
type PostRating = 'g'|'s'|'q'|'e';
export interface Post {
    id: number;
    uploader_id: number;
    approver_id: number;
    tag_string: string;
    tag_string_general: string;
    tag_string_artist: string;
    tag_string_copyright: string;
    tag_string_character: string;
    tag_string_meta: string;
    rating: PostRating | null;
    parent_id: number | null;
    source: string;
    md5: string;
    file_url: string;
    large_file_url: string;
    preview_file_url: string;
    file_ext: string;
    file_size: number;
    image_width: number;
    score: number;
    fav_count: number;
    tag_count_general: number;
    tag_count_artist: number;
    tag_count_copyright: number;
    tag_count_character: number;
    tag_count_meta: number;
    last_comment_bumped_at: Date | null;
    last_noted_at: Date | null;
    has_children: boolean;
    image_height: number;
    created_at: Date;
    updated_at: Date;
}