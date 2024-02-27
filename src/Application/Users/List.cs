
using Application.Core;
using Application.Users.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users;

public class List
{
    public class Query : IRequest<Result<PagedList<UserDTO>>>
    {
        public PagingParams Params { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<PagedList<UserDTO>>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        
        public async Task<Result<PagedList<UserDTO>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Users
                    .Include(a => a.UserSicknessList)
                        .ThenInclude(a => a.Sickness)
                    .Include(x => x.Diabetes)
                    .Where(a => a.IsUsed)
                    .OrderByDescending(a => a.CreatedAt)
                    .AsQueryable();
            var search = request.Params.Search.ToLower();
            query = query.Where(a => 
                a.FirstName.ToLower().Contains(search) ||
                a.LastName.ToLower().Contains(search) ||
                a.Phone.ToLower().Contains(search)
            );

            var data = query.ProjectTo<UserDTO>(mapper.ConfigurationProvider);

            return Result<PagedList<UserDTO>>.Success(await PagedList<UserDTO>.CreateAsync(data, request.Params.currentPage, request.Params.PageSize));
        }
    }
}
