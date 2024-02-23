
using Application.Core;
using AutoMapper;
using Domain;
using Domain.Entity;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.HearingApp;

public class ListByUserId
{
    public class Command : IRequest<Result<List<Hearing>>>
    {
        public int UserId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<List<Hearing>>>
    {
        private readonly DataContext context;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
        }

        public async Task<Result<List<Hearing>>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .Include(a => a.Hearings)
                    .ThenInclude(a => a.Items)
                .FirstOrDefaultAsync(a => a.Id == request.UserId);
            if (user == null) return null;

            return Result<List<Hearing>>.Success(user.Hearings.OrderByDescending(a => a.CreatedAt).ToList());
        }
    }
}
