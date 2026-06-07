using Application.DTOs;

namespace Application.Services;

public interface ICommentService
{
    Task<IEnumerable<CommentDto>> GetByProductIdAsync(int productId);
    Task<CommentDto> CreateAsync(CreateCommentDto dto);
    Task UpdateAsync(UpdateCommentDto dto);
    Task DeleteAsync(int id);
}