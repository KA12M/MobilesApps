
using Application.HearingApp;
using Application.HearingApp.DTOs;
using AutoMapper;
using Domain;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class HearingController : BaseApiController
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public HearingController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

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

    [HttpPost("[action]")]
    public async Task<IActionResult> UpdateHearingItemById(HearingItem request, int HearingId)
    {
        var hearing = await _context.Hearings.FirstOrDefaultAsync(x=>x.Id == HearingId);

        if (hearing == null) return Ok(StatusCode(StatusCodes.Status404NotFound));

        var hearingItem = _mapper.Map<HearingItem>(request);

        hearing.Items.Add(hearingItem);

        return Ok(StatusCode(await _context.SaveChangesAsync() > 0 
            ? StatusCodes.Status200OK 
            : StatusCodes.Status400BadRequest));
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
