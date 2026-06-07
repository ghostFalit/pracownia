using Application.Common.Interfaces;
using Application.DTOs;
using AutoMapper;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Services;

public class CommentService : ICommentService
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public CommentService(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CommentDto>> GetByProductIdAsync(int productId)
    {
        var comments = await _context.Comments
            .AsNoTracking()
            .Where(c => c.ProductId == productId)
            .OrderByDescending(c => c.CreationDate)
            .ToListAsync();

        return _mapper.Map<IEnumerable<CommentDto>>(comments);
    }

    public async Task<CommentDto> CreateAsync(CreateCommentDto dto)
    {
        var productExists = await _context.Products.AnyAsync(p => p.Id == dto.ProductId);
        if (!productExists) throw new KeyNotFoundException("Product not found.");

        var comment = _mapper.Map<Comment>(dto);
        _context.Comments.Add(comment);
        await _context.SaveChangesAsync();

        return _mapper.Map<CommentDto>(comment);
    }

    public async Task UpdateAsync(UpdateCommentDto dto)
    {
        var comment = await _context.Comments.FindAsync(dto.Id);
        if (comment == null) throw new KeyNotFoundException("Comment not found.");

        _mapper.Map(dto, comment);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var comment = await _context.Comments.FindAsync(id);
        if (comment == null) throw new KeyNotFoundException("Comment not found.");

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();
    }
}