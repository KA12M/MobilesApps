
using Application.Core;
using Application.Image.DTOS;
using Application.Interfaces;
using MediatR; 
using Microsoft.AspNetCore.Http; 

namespace Application.Image
{
    public class CalDiabete
    {
        public class Command : IRequest<Result<MLOutputDTO>>
        {
            public IFormFileCollection FileImages { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<MLOutputDTO>>
        {
            private readonly IUploadFileAccessor uploadFileAccessor;
            private readonly IDiabetesAccessor diabetesAccessor;

            public Handler(IUploadFileAccessor uploadFileAccessor, IDiabetesAccessor diabetesAccessor)
            {
                this.uploadFileAccessor = uploadFileAccessor;
                this.diabetesAccessor = diabetesAccessor;
            }

            public async Task<Result<MLOutputDTO>> Handle(Command request, CancellationToken cancellationToken)
            {
                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOne(request.FileImages);
                if (!string.IsNullOrEmpty(errorMessage)) throw new Exception(errorMessage);
                if (string.IsNullOrEmpty(imageName)) return null;

                var result = diabetesAccessor.CalculateDiabetes(imageName);

                return Result<MLOutputDTO>.Success(new MLOutputDTO(result));
            }
        }
    }
}
