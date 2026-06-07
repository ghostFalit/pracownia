using Application.DTOs;

namespace Application.Services;

public interface IProductService
{
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto> CreateAsync(CreateProductDto dto);
    Task UpdateAsync(UpdateProductDto dto);
    Task DeleteAsync(int id);
    Task<PagedResponse<ProductDto>> GetPagedAsync(string? searchTerm, int pageNumber, int pageSize);
}