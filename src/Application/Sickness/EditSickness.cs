
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Sickness;

public class EditSickness
{
    public class Command : IRequest<Result<Unit>>
    {
        public Domain.Entity.Sickness Sickness { get; set; }
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
            var currentSickness = await context.Sicknesses.FirstOrDefaultAsync(a => a.Id == request.Sickness.Id);
            
            if (currentSickness == null) return null;
            
            currentSickness.Title = request.Sickness.Title;
            currentSickness.Note = request.Sickness.Note; 

            var success = await context.SaveChangesAsync() > 0; 
            return success ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Failed to edit sickness! Please try again later.");
        }
    }
}
