import { useState, useEffect } from 'react';
import type { CommentDto } from '../types/comment';
import { commentServiceApi } from '../api/commentServiceApi';

export function useComments(productId: number) {
    const [comments, setComments] = useState<CommentDto[]>([]);
    const [newCommentText, setNewCommentText] = useState('');
    
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            if (!productId) return;
            try {
                const data = await commentServiceApi.getByProductId(productId);
                setComments(data);
            } catch (error) {
                console.error('Failed to load comments', error);
            }
        };

        fetchComments();
    }, [productId]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCommentText.trim()) return;

        try {
            const newComment = await commentServiceApi.create({ 
                productId, 
                description: newCommentText 
            });
            setComments(prev => [newComment, ...prev]);
            setNewCommentText('');
        } catch (error) {
            console.error('Failed to add comment', error);
        }
    };

    const handleDeleteComment = async (id: number) => {
        if (!window.confirm('Delete this comment?')) return;
        try {
            await commentServiceApi.delete(id);
            setComments(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Failed to delete comment', error);
        }
    };

    const startEditing = (comment: CommentDto) => {
        setEditingId(comment.id);
        setEditingText(comment.description);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingText('');
    };

    const handleSaveEdit = async (id: number) => {
        if (!editingText.trim()) return;
        try {
            await commentServiceApi.update(id, { id, description: editingText });
            setComments(prev => prev.map(c => 
                c.id === id ? { ...c, description: editingText } : c
            ));
            cancelEditing();
        } catch (error) {
            console.error('Failed to update comment', error);
        }
    };

    return {
        comments,
        newCommentText,
        setNewCommentText,
        handleAddComment,
        handleDeleteComment,
        editingId,
        editingText,
        setEditingText,
        startEditing,
        cancelEditing,
        handleSaveEdit
    };
}