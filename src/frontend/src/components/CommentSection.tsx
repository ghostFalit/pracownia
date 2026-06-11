import { useComments } from '../hooks/useComments';

interface CommentSectionProps {
    productId: number;
}

export default function CommentSection({ productId }: CommentSectionProps) {
    const {
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
    } = useComments(productId);

    return (
        <div className="mt-5">
            <h4>Comments</h4>
            
            <form onSubmit={handleAddComment} className="mb-4">
                <div className="input-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Write a comment..." 
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">Add</button>
                </div>
            </form>

            {comments.length === 0 ? (
                <p className="text-muted">No comments yet.</p>
            ) : (
                <ul className="list-group">
                    {comments.map(comment => (
                        <li key={comment.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {editingId === comment.id ? (
                                <div className="w-100 me-3">
                                    <input 
                                        type="text" 
                                        className="form-control mb-2" 
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                    />
                                    <button className="btn btn-sm btn-success me-2" onClick={() => handleSaveEdit(comment.id)}>Save</button>
                                    <button className="btn btn-sm btn-secondary" onClick={cancelEditing}>Cancel</button>
                                </div>
                            ) : (
                                <>
                                    <span>{comment.description}</span>
                                    <div>
                                        <button className="btn btn-sm btn-warning me-2" onClick={() => startEditing(comment)}>Edit</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}