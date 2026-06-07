namespace Application.DTOs;

public record PagedResponse<T>(IEnumerable<T> Items, int TotalCount, int PageNumber, int PageSize);