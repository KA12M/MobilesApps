
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.HearingApp;

public class DeleteHearing
{
    public class Command : IRequest<Result<Unit>>
    {
        public int Id { get; set; }
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
            var hearing = await context.Hearings
                .Include(a => a.Items)
                .FirstOrDefaultAsync(a => a.Id == request.Id);
            if (hearing == null) return null;    

            context.Hearings.Remove(hearing);

            var success = await context.SaveChangesAsync() > 0;
            return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("failed to delete hearing! Please try again later.");
        }
    }
}
