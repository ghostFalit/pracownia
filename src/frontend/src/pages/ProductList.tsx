import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';

export default function ProductList() {
    const { products, deleteProduct } = useProducts();

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3">
                <h2>Products</h2>
                <Link to="/product/new" className="btn btn-primary">Add Product</Link>
            </div>
            <ProductTable products={products} onDelete={deleteProduct} />
        </div>
    );
}