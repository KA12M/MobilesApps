
using Application.Core;
using Application.Users.DTOs;
using AutoMapper;
using Domain;
using Domain.Entity;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users;

public class EditUser
{
    public class Command : IRequest<Result<Unit>>
    {
        public UserDTO User { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var currentUser = await context.Users
                .Include(a => a.UserSicknessList)
                .FirstOrDefaultAsync(a => a.Id == request.User.Id);
            if (currentUser == null) return null;

            mapper.Map(request.User, currentUser);

            var success = await context.SaveChangesAsync() > 0;
            return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to edit user! Please try again later.");
        }
    }
}
