
using Application.Core;
using Application.Users.DTOs;
using AutoMapper;
using Domain;
using Domain.Entity;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Users;

public class CreateByName
{
    public class Command : IRequest<Result<User>>
    {
        public UserCreateDTO User { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<User>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<User>> Handle(Command request, CancellationToken cancellationToken)
        {
            var currentUser = await context.Users.FirstOrDefaultAsync(a => a.Phone == request.User.Phone);

            User user = new User();

            if (currentUser != null) mapper.Map(request.User, currentUser);
            else
            {
                var newUser = mapper.Map<User>(request.User);
                context.Users.Add(newUser);
                user = newUser;
            }

            var success = await context.SaveChangesAsync() > 0;
            return success ? Result<User>.Success(currentUser ?? user) : Result<User>.Failure("Failed to new user! Please try again later.");
        }
    }
}
