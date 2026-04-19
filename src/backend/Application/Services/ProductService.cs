using Application.Common.Interfaces;
using Application.DTOs;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class ProductService : IProductService
{
    private readonly IApplicationDbContext _context;

    public ProductService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductDto>> GetAllAsync()
    {
        return await _context.Products
            .AsNoTracking()
            .Select(p => new ProductDto(p.Id, p.Title, p.Description, p.ImageUrl, p.CreationDate))
            .ToListAsync();
    }

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var product = await _context.Products
            .AsNoTracking()
            .FirstOrDefaultAsync(p => p.Id == id);

        if (product == null) return null;

        return new ProductDto(product.Id, product.Title, product.Description, product.ImageUrl, product.CreationDate);
    }

    public async Task<ProductDto> CreateAsync(CreateProductDto dto)
    {
        var product = new Product
        {
            Title = dto.Title,
            Description = dto.Description,
            ImageUrl = dto.ImageUrl
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return new ProductDto(product.Id, product.Title, product.Description, product.ImageUrl, product.CreationDate);
    }

    public async Task UpdateAsync(UpdateProductDto dto)
    {
        var product = await _context.Products.FindAsync(dto.Id);

        if (product == null)
            throw new KeyNotFoundException($"Product with ID {dto.Id} not found.");

        product.Title = dto.Title;
        product.Description = dto.Description;
        product.ImageUrl = dto.ImageUrl;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
            throw new KeyNotFoundException($"Product with ID {id} not found.");

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
    }
}