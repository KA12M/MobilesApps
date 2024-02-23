
using Application.Core;
using Application.HearingApp.DTOs;
using AutoMapper;
using Domain;
using Domain.Entity;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.HearingApp;

public class AddHearingWithUserId
{
    public class Command : IRequest<Result<Hearing>>
    {
        public HearingCreateDTO hearing { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Hearing>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<Hearing>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .Include(a => a.Hearings)
                    .ThenInclude(a => a.Items)
                .FirstOrDefaultAsync(a => a.Id == request.hearing.UserId);
            if (user == null) return null;

            user.Hearings.Add(mapper.Map<Hearing>(request.hearing));
            
            var success = await context.SaveChangesAsync() > 0;
            return success ? Result<Hearing>.Success(user.Hearings.Last()) : Result<Hearing>.Failure("Failed to edit hearing! Please try again later.");
        }
    }
}
