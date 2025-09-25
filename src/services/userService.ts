
import api from './api';
import {User, Post, CreatePostRequest} from "../types/user.ts";

export const userService = {
    // 获取所有用户
    getAllUsers: async (): Promise<User[]> => {
        const response = await api.get<User[]>('/users');
        return response.data;
    },

    // 根据ID获取用户
    getUserById: async (id: number): Promise<User> => {
        const response = await api.get<User>(`/users/${id}`);
        return response.data;
    },

    // 获取用户的所有文章
    getUserPosts: async (userId: number): Promise<Post[]> => {
        const response = await api.get<Post[]>(`/users/${userId}/posts`);
        return response.data;
    },

    // 创建新文章
    createPost: async (postData: CreatePostRequest): Promise<Post> => {
        const response = await api.post<Post>('/posts', postData);
        return response.data;
    },

    // 更新文章
    updatePost: async (postId: number, postData: Partial<Post>): Promise<Post> => {
        const response = await api.put<Post>(`/posts/${postId}`, postData);
        return response.data;
    },

    // 删除文章
    deletePost: async (postId: number): Promise<void> => {
        await api.delete(`/posts/${postId}`);
    },
};