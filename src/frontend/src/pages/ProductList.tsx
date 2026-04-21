import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { ProductDto } from '../types/product';
import { productApi } from '../api/productApi';

export default function ProductList() {
    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await productApi.getAll();
                setProducts(data);
            } catch (error) {
                console.error('Failed to load products', error);
            }
        };

        loadProducts();
    },[]);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this product?')) return;
        try {
            await productApi.delete(id);
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Products</h2>
                <Link to="/product/new" className="btn btn-primary">Add Product</Link>
            </div>
            <table className="table table-striped table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.description}</td>
                            <td>
                                <Link to={`/product/edit/${product.id}`} className="btn btn-sm btn-warning me-2">Edit</Link>
                                <button onClick={() => handleDelete(product.id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}