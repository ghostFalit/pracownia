import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productServiceApi } from '../api/productServiceApi';
import type { CreateProductDto, UpdateProductDto } from '../types/product';

export function useProductForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        if (!isEditMode || !id) return;

        const fetchProduct = async () => {
            try {
                const data = await productServiceApi.getById(Number(id));
                setFormData({
                    title: data.title,
                    description: data.description,
                    imageUrl: data.imageUrl || ''
                });
            } catch (error) {
                console.error('Failed to load product', error);
            }
        };

        fetchProduct();
    }, [id, isEditMode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                const updateData: UpdateProductDto = { id: Number(id), ...formData };
                await productServiceApi.update(Number(id), updateData);
            } else {
                const createData: CreateProductDto = { ...formData };
                await productServiceApi.create(createData);
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to save product', error);
        }
    };

    const handleCancel = () => navigate('/');

    return { formData, isEditMode, handleChange, handleSubmit, handleCancel };
}