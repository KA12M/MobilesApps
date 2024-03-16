
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
        Dictionary<string, double> ResultEyeLeft = null;
        string ImageEyeLeft = null;
        Dictionary<string, double> ResultEyeRight = null;
        string ImageEyeRight = null;

        if (request.ImageEyeLeft != null)
        {
            ResultEyeLeft = await PredictTrueFalse(request.ImageEyeLeft);
            ImageEyeLeft = "data:image/jpeg;base64," + await ConvertImageToBase64(request.ImageEyeLeft);
        }

        if (request.ImageEyeRight != null)
        {
            ResultEyeRight = await PredictTrueFalse(request.ImageEyeRight);
            ImageEyeRight = "data:image/jpeg;base64," + await ConvertImageToBase64(request.ImageEyeRight);
        }

        var diabete = new Diabetes()
        {
            Note = request.Note,
            CreatedAt = DateTime.Now,
            ImageEyeLeft = request.ImageEyeLeft == null ? null : ImageEyeLeft,
            ResultLeft = request.ImageEyeLeft == null
                ? "ไม่มีรูปภาพ"
                : ResultEyeLeft.ToArray()[0].Key == "No_DR"
                    ? JsonSerializer.Serialize(ResultEyeLeft.ToArray())
                    : await PredictAll(request.ImageEyeLeft),
            ImageEyeRight = request.ImageEyeRight == null ? null : ImageEyeRight,
            ResultRight = request.ImageEyeRight == null
                ? "ไม่มีรูปภาพ"
                : ResultEyeRight.ToArray()[0].Key == "No_DR"
                    ? JsonSerializer.Serialize(ResultEyeRight.ToArray())
                    : await PredictAll(request.ImageEyeRight)
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

    [HttpDelete("[action]")]
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

        var result = new Dictionary<string, double>();

        foreach (var score in sortedScoresWithLabel)
        {
            result.Add(score.Key, score.Value * 100);
        }

        return JsonSerializer.Serialize(result.ToArray());
    }

    private async Task<Dictionary<string, double>> PredictTrueFalse(IFormFile file)
    {
        byte[] imageBytes;

        using (var memoryStream = new MemoryStream())
        {
            await file.CopyToAsync(memoryStream);
            imageBytes = memoryStream.ToArray();
        }

        MLModel1.ModelInput sampleData = new MLModel1.ModelInput()
        {
            ImageSource = imageBytes,
        };

        var sortedScoresWithLabel = MLModel1.PredictAllLabels(sampleData);

        var result = new Dictionary<string, double>();

        foreach (var score in sortedScoresWithLabel)
        {
            result.Add(score.Key, score.Value * 100);
        }

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
