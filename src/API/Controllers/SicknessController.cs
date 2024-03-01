
using Application.Sickness;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class SicknessController : BaseApiController
{
    [HttpGet("[action]")]
    public async Task<ActionResult> CreateSickness()
    {
        return HandleResult(await Mediator.Send(new List.Query { }));
    }

    [HttpPost("[action]")]
    public async Task<ActionResult> CreateSickness(string title, string note)
    {
        return HandleResult(await Mediator.Send(new AddSickness.Command { Title = title, Note = note }));
    }

    [HttpPut("[action]")]
    public async Task<ActionResult> EditSickness(Domain.Entity.Sickness sickness)
    {
        return HandleResult(await Mediator.Send(new EditSickness.Command { Sickness = sickness }));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSickness(int id)
    {
        return HandleResult(await Mediator.Send(new Delete.Query { Id = id }));
    }
}
