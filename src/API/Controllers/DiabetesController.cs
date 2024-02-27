
using ClassLibrary1;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
using Application.Diabete;
using System.Text.Json;

namespace API.Controllers;

public class DiabetesController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> UploadImageEyes([FromForm] AddDiabete request)
    {
        var diabete = new Diabetes()
        {
            Note = request.Note,
            CreatedAt = DateTime.Now,
            ImageEyeLeft = await ConvertImageToBase64(request.ImageEyeLeft),
            ResultLeft = await Predict(request.ImageEyeLeft),
            ImageEyeRight = await ConvertImageToBase64(request.ImageEyeRight),
            ResultRight = await Predict(request.ImageEyeRight),
        };

        return Ok(diabete);
    }

    private async Task<string> Predict(IFormFile file)
    {
        byte[] imageBytes;

        using (var memoryStream = new MemoryStream())
        {
            var format = "image/png";
            await file.CopyToAsync(memoryStream);
            imageBytes = memoryStream.ToArray();
        }

        // Create single instance of sample data from first line of dataset for model input

        //imageBytes = System.IO.File.ReadAllBytes(@"C:\Users\Mr.Teeradet\Downloads\archive (3)\train\DR\000c1434d8d7_png.rf.620970d7d209700b4cf09b8f36f52ff9.jpg");

        MLModel1.ModelInput sampleData = new MLModel1.ModelInput()
        {
            ImageSource = imageBytes,
        };

        // Make a single prediction on the sample data and print results.
        var sortedScoresWithLabel = MLModel1.PredictAllLabels(sampleData);

        //Console.WriteLine($"{"Class",-40}{"Score",-20}");
        //Console.WriteLine($"{"-----",-40}{"-----",-20}");

        //var result = new Dictionary<string, double>();

        //foreach (var score in sortedScoresWithLabel)
        //{
        //Console.WriteLine($"{score.Key,-40}{score.Value,-20}");
        //var temp = new Dictionary<string, double>() {  };
        //result.Add(score.Key, score.Value);
        //}

        string jsonResult = JsonSerializer.Serialize(sortedScoresWithLabel);

        return jsonResult;
    }

    private async Task<string> ConvertImageToBase64(IFormFile imageFile)
    {
        if (imageFile == null || imageFile.Length == 0)
            return null;

        using (var ms = new MemoryStream())
        {
            await imageFile.CopyToAsync(ms);
            byte[] imageBytes = ms.ToArray();
            return Convert.ToBase64String(imageBytes);
        }
    }


}
