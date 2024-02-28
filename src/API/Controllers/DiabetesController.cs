
using ClassLibrary1;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json; 
using Application.Diabete.DTOs; 
using Domain;
using Microsoft.EntityFrameworkCore;
using ClassLibrary4Groups;
using System.IO;
using AutoMapper;
using System.Buffers.Text;

namespace API.Controllers;

public class DiabetesController : BaseApiController
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public DiabetesController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> RecheckDiabete([FromForm] TestDiabete request)
    {
        Dictionary<string, double> ImageEyeLeft = null;
        Dictionary<string, double> ImageEyeRight = null;
         
        if (request.ImageEyeLeft is not null)
        {
            ImageEyeLeft = await PredictTrueFalse(request.ImageEyeLeft);
        }

        if(request.ImageEyeRight is not null)
        {
            ImageEyeRight = await PredictTrueFalse(request.ImageEyeRight);
        }
        
        var diabete = new Diabetes()
        {
            Note = request.Note,
            CreatedAt = DateTime.Now,
            ImageEyeLeft = request.ImageEyeLeft is null ? null : "data:image/jpeg;base64," +  await ConvertImageToBase64(request.ImageEyeLeft),
            ResultLeft = request.ImageEyeLeft is null 
            ? "" : ImageEyeLeft.ElementAt(0).Key == ("No_DR") 
            ? "ไม่เป็นเบาหวาน" : await PredictAll(request.ImageEyeLeft),
            ImageEyeRight = request.ImageEyeRight is null ? null : "data:image/jpeg;base64," + await ConvertImageToBase64(request.ImageEyeRight),
            ResultRight = request.ImageEyeRight is null 
            ? "" : ImageEyeRight.ElementAt(0).Key == ("No_DR") 
            ? "ไม่เป็นเบาหวาน" : await PredictAll(request.ImageEyeRight)
        };

        return Ok(diabete);
    }
    
    [HttpPost("[action]")]
    public async Task<IActionResult> CreateDiabete(AddDiabete request)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id.Equals(request.UserId));

        var diabete = _mapper.Map<Diabetes>(request);
        diabete.CreatedAt = DateTime.Now;

        user.Diabetes.Add(diabete);
        
        return Ok(await _context.SaveChangesAsync() > 0 ? StatusCode(StatusCodes.Status200OK) : StatusCode(StatusCodes.Status404NotFound)); 
    }

    [HttpDelete]
    public async Task<IActionResult> RemoveDiabete(int eyeId)
    {
        var result = await _context.Diabetes.FirstOrDefaultAsync(x => x.Id.Equals(eyeId));

        _context.Diabetes.Remove(result);

        return Ok(await _context.SaveChangesAsync() > 0 
            ? StatusCode(StatusCodes.Status200OK) 
            : StatusCode(StatusCodes.Status400BadRequest));
    }

    private async Task<string> PredictAll(IFormFile file)
    {
        byte[] imageBytes;

        using (var memoryStream = new MemoryStream())
        {
            var format = "image/png";
            await file.CopyToAsync(memoryStream);
            imageBytes = memoryStream.ToArray();
        }

        MLModel4Groups.ModelInput sampleData = new MLModel4Groups.ModelInput()
        {
            ImageSource = imageBytes,
        };

        // Make a single prediction on the sample data and print results.
        var sortedScoresWithLabel = MLModel4Groups.PredictAllLabels(sampleData);
        
        return JsonSerializer.Serialize(sortedScoresWithLabel);
    }

    private async Task<Dictionary<string, double>> PredictTrueFalse(IFormFile file)
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
            Console.WriteLine($"{score.Key,-40}{score.Value,-20}");
            var temp = new Dictionary<string, double>() { };
            result.Add(score.Key, score.Value);
        }

        //string jsonResult = JsonSerializer.Serialize(sortedScoresWithLabel);

        return result;
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
