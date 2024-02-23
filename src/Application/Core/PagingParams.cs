 
namespace Application.Core;

public class PagingParams
{
    private const int MaxPageSize = 50;

    public string Search { get; set; } = "";
    public int currentPage { get; set; } = 1;
    private int pageSize = 9;
    public int PageSize
    {
        get => pageSize;
        set => pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

}
