
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IUploadFileAccessor
    {
        bool IsUpload(IFormFileCollection formFiles);
        string Validation(IFormFileCollection formFiles); 

        Task<(string errorMessage, string imageName)> UpLoadImageOne(IFormFileCollection formFiles);
        Task<(string errorMessage, List<string> imageName)> UpLoadImages(IFormFileCollection formFiles); 
    }
}