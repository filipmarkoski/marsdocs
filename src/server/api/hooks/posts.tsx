import { useQuery } from "@tanstack/react-query";
import { type Post } from "~/server/db/types";


const fetchPosts = async (postId?: number): Promise<Post[]> => {
    const link: string = postId ? `https://dummyjson.com/posts/${postId}` : 'https://dummyjson.com/posts'
    const response = await fetch(link)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const posts: Post[] = await response.json() as Post[]
    return posts
}

export const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => fetchPosts(),
    })
}

export const usePost = (postId: number) => {
    return useQuery({
        queryKey: ['posts', postId],
        queryFn: () => fetchPosts(postId),
    })
}