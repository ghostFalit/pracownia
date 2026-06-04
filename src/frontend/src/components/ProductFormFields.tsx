import React from 'react';

interface ProductFormFieldsProps {
    formData: {
        title: string;
        description: string;
        imageUrl: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    onCancel: () => void;
    isEditMode: boolean;
}

export default function ProductFormFields({ 
    formData, 
    onChange, 
    onSubmit, 
    onCancel, 
    isEditMode 
}: ProductFormFieldsProps) {
    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    className="form-control" 
                    value={formData.title} 
                    onChange={onChange} 
                    required 
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea 
                    name="description" 
                    className="form-control" 
                    value={formData.description} 
                    onChange={onChange} 
                    required 
                    rows={3}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input 
                    type="text" 
                    name="imageUrl" 
                    className="form-control" 
                    value={formData.imageUrl} 
                    onChange={onChange} 
                />
            </div>
            <button type="submit" className="btn btn-success me-2">
                {isEditMode ? 'Save Changes' : 'Create'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}