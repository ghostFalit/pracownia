namespace Application.DTOs;

public record UpdateProductDto(int Id, string Title, string Description, string? ImageUrl);