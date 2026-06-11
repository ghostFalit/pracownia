import { apiClient } from './axiosConfig';
import type { CommentDto, CreateCommentDto, UpdateCommentDto } from '../types/comment';

export const commentServiceApi = {
    getByProductId: async (productId: number): Promise<CommentDto[]> => {
        const response = await apiClient.get<CommentDto[]>(`/comments/product/${productId}`);
        return response.data;
    },
    create: async (data: CreateCommentDto): Promise<CommentDto> => {
        const response = await apiClient.post<CommentDto>('/comments', data);
        return response.data;
    },
    update: async (id: number, data: UpdateCommentDto): Promise<void> => {
        await apiClient.put(`/comments/${id}`, data);
    },
    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/comments/${id}`);
    }
};