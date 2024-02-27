
using ClassLibrary1;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DiabetesController : BaseApiController
{
    [HttpPost]
    public async Task<IActionResult> Predict(IFormFile file)
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

        var result = new Dictionary<string, double>();

        foreach (var score in sortedScoresWithLabel)
        {
            //Console.WriteLine($"{score.Key,-40}{score.Value,-20}");
            //var temp = new Dictionary<string, double>() {  };
            result.Add(score.Key, score.Value);
        }


        return Ok(result);
    }
}
