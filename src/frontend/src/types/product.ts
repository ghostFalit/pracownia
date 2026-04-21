export interface ProductDto {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    creationDate: string;
}

export interface CreateProductDto {
    title: string;
    description: string;
    imageUrl?: string;
}

export interface UpdateProductDto {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
}