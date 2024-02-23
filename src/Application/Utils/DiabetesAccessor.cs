 
using Application.Interfaces;
using Microsoft.AspNetCore.Hosting;
using MLDiabetesService;

namespace Application.Utils
{
    public class DiabetesAccessor : IDiabetesAccessor
    {
        private readonly IHostingEnvironment webHostEnvironment;

        public DiabetesAccessor(IHostingEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }

        public MLDiabetes.ModelOutput CalculateDiabetes(string fileName)
        {
            var imagePath = $"{webHostEnvironment.WebRootPath}/image-upload/{fileName}";

            MLDiabetes.ModelInput data = new MLDiabetes.ModelInput()
            {
                ImageSource = File.ReadAllBytes(imagePath)
            };
            return MLDiabetes.Predict(data);
        }
    }
}
