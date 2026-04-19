namespace Application.DTOs;

public record ProductDto(int Id, string Title, string Description, string? ImageUrl, DateTime CreationDate);