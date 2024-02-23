

using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.DTOs;

public class One
{
    public class Query : IRequest<Result<UserDTO>>
    {
        public int UserId { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<UserDTO>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<UserDTO>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = await context.Users
                    .Include(a => a.UserSicknessList)
                        .ThenInclude(a => a.Sickness)
                    .FirstOrDefaultAsync(a => a.Id == request.UserId);
            if (query == null) return null;

            return Result<UserDTO>.Success(mapper.Map<UserDTO>(query));
        }
    }
}
