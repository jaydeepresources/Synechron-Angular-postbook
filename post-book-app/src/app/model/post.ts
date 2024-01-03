import { User } from "./user";

export interface Post {
    postId: number
    postTitle: string
    postBody: string
    user: User
}