import { useState, useEffect } from 'react';
import type { ProductDto } from '../types/product';
import type { PagedResponse } from '../types/pagination';
import { productServiceApi } from '../api/productServiceApi';

export function useProducts() {
    const [data, setData] = useState<PagedResponse<ProductDto>>({ items: [], totalCount: 0, pageNumber: 1, pageSize: 10 });
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await productServiceApi.getPaged(searchTerm, pageNumber, 10);
                setData(result);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [searchTerm, pageNumber]);

    const deleteProduct = async (id: number) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await productServiceApi.delete(id);
            const result = await productServiceApi.getPaged(searchTerm, pageNumber, 10);
            setData(result);
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPageNumber(1); 
    };

    const handlePageChange = (newPage: number) => {
        setPageNumber(newPage);
    };

    return { data, searchTerm, handleSearchChange, handlePageChange, deleteProduct };
}