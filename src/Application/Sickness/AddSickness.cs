
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Sickness;

public class AddSickness
{
    public class Command : IRequest<Result<Domain.Entity.Sickness>>
    {
        public string Title { get; set; }
        public string Note { get; set; }
    }

    public class Handler : IRequestHandler<Command, Result<Domain.Entity.Sickness>>
    {
        private readonly DataContext context;
        private readonly IMapper mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        public async Task<Result<Domain.Entity.Sickness>> Handle(Command request, CancellationToken cancellationToken)
        {
            var newSickness = new Domain.Entity.Sickness
            {
                Title = request.Title,
                Note = request.Note,
            };

            context.Sicknesses.Add(newSickness);

            var success = await context.SaveChangesAsync() > 0;

            return success ? Result<Domain.Entity.Sickness>.Success(newSickness) : Result<Domain.Entity.Sickness>.Failure("Failed to new sickness! Please try again later.");
        }
    }
}
