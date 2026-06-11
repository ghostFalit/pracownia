export interface CommentDto {
    id: number;
    productId: number;
    description: string;
    creationDate: string;
}

export interface CreateCommentDto {
    productId: number;
    description: string;
}

export interface UpdateCommentDto {
    id: number;
    description: string;
}