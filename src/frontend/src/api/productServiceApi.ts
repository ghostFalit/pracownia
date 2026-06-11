import { apiClient } from './axiosConfig';
import type { ProductDto, CreateProductDto, UpdateProductDto } from '../types/product';
import type { PagedResponse } from '../types/pagination';

export const productServiceApi = {
    getPaged: async (searchTerm: string = '', pageNumber: number = 1, pageSize: number = 10): Promise<PagedResponse<ProductDto>> => {
        const response = await apiClient.get<PagedResponse<ProductDto>>('/products', {
            params: { searchTerm, pageNumber, pageSize }
        });
        return response.data;
    },
    getById: async (id: number): Promise<ProductDto> => {
        const response = await apiClient.get<ProductDto>(`/products/${id}`);
        return response.data;
    },
    create: async (data: CreateProductDto): Promise<ProductDto> => {
        const response = await apiClient.post<ProductDto>('/products', data);
        return response.data;
    },
    update: async (id: number, data: UpdateProductDto): Promise<void> => {
        await apiClient.put(`/products/${id}`, data);
    },
    delete: async (id: number): Promise<void> => {
        await apiClient.delete(`/products/${id}`);
    }
};