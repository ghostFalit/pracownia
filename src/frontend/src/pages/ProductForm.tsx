import { useProductForm } from '../hooks/useProductForm';
import ProductFormFields from '../components/ProductFormFields';
import CommentSection from '../components/CommentSection';
import { useParams } from 'react-router-dom';

export default function ProductForm() {
    const { 
        formData, 
        isEditMode, 
        handleChange, 
        handleSubmit, 
        handleCancel 
    } = useProductForm();
    
    const { id } = useParams<{ id: string }>();

    return (
        <div className="container mt-4 mb-5">
            <h2 className="mb-4">{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
            
            <div className="card p-4 shadow-sm">
                <ProductFormFields 
                    formData={formData} 
                    onChange={handleChange} 
                    onSubmit={handleSubmit} 
                    onCancel={handleCancel}
                    isEditMode={isEditMode}
                />
            </div>

            {isEditMode && id && (
                <CommentSection productId={Number(id)} />
            )}
        </div>
    );
}