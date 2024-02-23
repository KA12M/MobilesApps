
using Application.Core;
using AutoMapper;
using Domain;
using Domain.Entity;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.HearingApp;

public class EditHearing
{
    public class Command : IRequest<Result<Unit>>
    {
        public int UserId { get; set; }
        public Hearing Hearing { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext context;

        public Handler(DataContext context)
        {
            this.context = context;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .Include(a => a.Hearings)
                    .ThenInclude(a => a.Items)
                .FirstOrDefaultAsync(a => a.Id == request.UserId);
            if (user == null) return null;

            var currentHearing = user.Hearings.FirstOrDefault(a => a.Id == request.Hearing.Id);
            if (currentHearing == null) return null;
            
            currentHearing = request.Hearing;
            
            var success = await context.SaveChangesAsync() > 0;
            return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to edit hearing! Please try again later.");
        }
    }
}
