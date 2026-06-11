import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';

export default function ProductList() {
    const { data, searchTerm, handleSearchChange, handlePageChange, deleteProduct } = useProducts();
    const totalPages = Math.ceil(data.totalCount / data.pageSize);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between mb-3 align-items-center">
                <h2>Products</h2>
                <Link to="/product/new" className="btn btn-primary">Add Product</Link>
            </div>

            <div className="mb-3">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search by title..." 
                    value={searchTerm} 
                    onChange={handleSearchChange} 
                />
            </div>

            <ProductTable products={data.items} onDelete={deleteProduct} />

            {totalPages > 1 && (
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className={`page-item ${data.pageNumber === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(data.pageNumber - 1)}>Previous</button>
                        </li>
                        <li className="page-item disabled">
                            <span className="page-link">Page {data.pageNumber} of {totalPages}</span>
                        </li>
                        <li className={`page-item ${data.pageNumber === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(data.pageNumber + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    );
}