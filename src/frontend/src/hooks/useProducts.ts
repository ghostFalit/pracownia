import { useState, useEffect } from 'react';
import type { ProductDto } from '../types/product';
import { productServiceApi } from '../api/productServiceApi';

export function useProducts() {
    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productServiceApi.getAll();
                setProducts(data);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };

        fetchProducts();
    }, []);

    const deleteProduct = async (id: number) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await productServiceApi.delete(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    return { products, deleteProduct };
}