
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Sickness;

public class List
{
    public class Query : IRequest<Result<List<Domain.Entity.Sickness>>>
    {

    }

    public class Handler : IRequestHandler<Query, Result<List<Domain.Entity.Sickness>>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<List<Domain.Entity.Sickness>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var query = context.Sicknesses
                    .Where(a => a.IsUsed)
                    .AsQueryable();

            return Result<List<Domain.Entity.Sickness>>.Success(await query.ToListAsync());
        }
    }
}
