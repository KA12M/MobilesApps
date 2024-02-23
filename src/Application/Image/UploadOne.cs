
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Image
{
    public class UploadOne
    {
        public class Command : IRequest<Result<string>>
        {
            public IFormFileCollection FileImages { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<string>>
        {
            private readonly IUploadFileAccessor uploadFileAccessor;

            public Handler(IUploadFileAccessor uploadFileAccessor)
            {
                this.uploadFileAccessor = uploadFileAccessor;
            }

            public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
            {
                (string errorMessage, string imageName) = await uploadFileAccessor.UpLoadImageOne(request.FileImages);
                if (!String.IsNullOrEmpty(errorMessage)) return Result<string>.Failure(errorMessage);

                return Result<string>.Success(imageName);
            }
        }
    }

}