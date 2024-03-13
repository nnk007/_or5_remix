export interface Message {
    readonly id:string;
    readonly author:string;
    readonly message:string;
    readonly timestamp:Date;
    toString():string;
}
export type FirestoreMessage = {
    author:string,
    message:string,
    timestamp:Date
}