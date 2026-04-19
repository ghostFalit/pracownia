using Application.DTOs;

namespace Application.Services;

public interface IProductService
{
    Task<IEnumerable<ProductDto>> GetAllAsync();
    Task<ProductDto?> GetByIdAsync(int id);
    Task<ProductDto> CreateAsync(CreateProductDto dto);
    Task UpdateAsync(UpdateProductDto dto);
    Task DeleteAsync(int id);
}