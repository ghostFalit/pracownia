namespace Application.DTOs;

public record CommentDto(int Id, int ProductId, string Description, DateTime CreationDate);