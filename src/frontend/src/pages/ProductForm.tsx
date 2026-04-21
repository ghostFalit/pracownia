import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productApi } from '../api/productApi';
import type { CreateProductDto, UpdateProductDto } from '../types/product';

export default function ProductForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: ''
    });

    useEffect(() => {
        const loadProduct = async (productId: number) => {
            try {
                const data = await productApi.getById(productId);
                setFormData({
                    title: data.title,
                    description: data.description,
                    imageUrl: data.imageUrl || ''
                });
            } catch (error) {
                console.error('Failed to load product', error);
            }
        };

        if (isEditMode && id) {
            loadProduct(Number(id));
        }
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
                await productApi.update(Number(id), updateData);
            } else {
                const createData: CreateProductDto = { ...formData };
                await productApi.create(createData);
            }
            navigate('/');
        } catch (error) {
            console.error('Failed to save product', error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required rows={3}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" name="imageUrl" className="form-control" value={formData.imageUrl} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
            </form>
        </div>
    );
}