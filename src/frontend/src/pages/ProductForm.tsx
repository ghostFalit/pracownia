import { useProductForm } from '../hooks/useProductForm';
import ProductFormFields from '../components/ProductFormFields';

export default function ProductForm() {
    const { 
        formData, 
        isEditMode, 
        handleChange, 
        handleSubmit, 
        handleCancel 
    } = useProductForm();

    return (
        <div className="container mt-4">
            <h2 className="mb-4">{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
            <ProductFormFields 
                formData={formData} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
                onCancel={handleCancel}
                isEditMode={isEditMode}
            />
        </div>
    );
}