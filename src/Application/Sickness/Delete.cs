
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Sickness;

public class Delete
{
    public class Query : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<Unit>>
    {
        private readonly DataContext context;

        public Handler(DataContext context)
        {
            this.context = context;
        }

        public async Task<Result<Unit>> Handle(Query request, CancellationToken cancellationToken)
        {
            var currentSickness = await context.Sicknesses.FirstOrDefaultAsync(a => a.Id == request.Id);

            if (currentSickness == null) return null;

            currentSickness.IsUsed = false;

            var success = await context.SaveChangesAsync() > 0; 
            return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to update sickness! Please try again later.");
        }
    }
}
