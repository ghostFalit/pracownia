import { Link } from 'react-router-dom';
import type { ProductDto } from '../types/product';

interface ProductTableProps {
    products: ProductDto[];
    onDelete: (id: number) => void;
}

export default function ProductTable({ products, onDelete }: ProductTableProps) {
    return (
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
                            <button onClick={() => onDelete(product.id)} className="btn btn-sm btn-danger">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}