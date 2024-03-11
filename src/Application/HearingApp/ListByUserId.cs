using Application.Core;
using Application.HearingApp.DTOs;
using AutoMapper;
using Domain;
using Domain.Entity;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.HearingApp;

public class ListByUserId
{
    public class Command : IRequest<Result<UserResults>>
    {
        public int UserId { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<UserResults>>
    {
        private readonly DataContext context;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
        }

        public async Task<Result<UserResults>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await context.Users
                .Include(a => a.Hearings)
                    .ThenInclude(a => a.Items)
                .Include(x => x.Diabetes)
                .Include(x => x.FMHTs)
                .FirstOrDefaultAsync(a => a.Id == request.UserId);
            if (user == null) return null;

            var results = new UserResults
            {
                Hearing = Result<List<Hearing>>.Success(user.Hearings.OrderByDescending(a => a.CreatedAt).ToList()),
                Diabetes = Result<List<Diabetes>>.Success(user.Diabetes.OrderByDescending(a => a.CreatedAt).ToList()),
                FMHTs = Result<List<FMHT>>.Success(user.FMHTs.OrderByDescending(a => a.CreatedAt).ToList()),
            };

            return Result<UserResults>.Success(results);
        }
    }
}
