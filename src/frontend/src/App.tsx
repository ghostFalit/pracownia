import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import ProductForm from './pages/ProductForm';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/product/new" element={<ProductForm />} />
                <Route path="/product/edit/:id" element={<ProductForm />} />
            </Routes>
        </Router>
    );
}