
using Application.HearingApp;
using Application.HearingApp.DTOs;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class HearingController : BaseApiController
{
    [HttpGet("[action]")]
    public async Task<ActionResult> GetAllByUserId([FromQuery] int userId)
    {
        return HandleResult(await Mediator.Send(new ListByUserId.Command { UserId = userId }));
    }

    [HttpPost("[action]")]
    public async Task<ActionResult> AddHearingByUserId([FromBody] HearingCreateDTO hearing)
    {
        return HandleResult(await Mediator.Send(new AddHearingWithUserId.Command { hearing = hearing }));
    }

    [HttpPut("[action]")]
    public async Task<ActionResult> EditHearingByUserId([FromBody] Hearing hearing, [FromQuery] int userId)
    {
        return HandleResult(await Mediator.Send(new EditHearing.Command { UserId = userId, Hearing = hearing }));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteHearing(int id)
    {
        return HandleResult(await Mediator.Send(new DeleteHearing.Command { Id = id }));
    }
}
