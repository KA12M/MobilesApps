
using Application.Image;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ImageController : BaseApiController
    {  
        [HttpPost("[action]")]
        public async Task<ActionResult> CalulateDiabetes([FromForm] IFormFileCollection fileImages)
        {
            return HandleResult(await Mediator.Send(new CalDiabete.Command { FileImages = fileImages }));
        }
    }
}