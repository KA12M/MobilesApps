
using Application.Core;
using Application.Users;
using Application.Users.DTOs;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class UserController : BaseApiController
{
    private readonly DataContext _context;

    public UserController(DataContext context)
    {
        _context = context;
    }

    [HttpGet("[action]")]
    public async Task<ActionResult> GetUsers([FromQuery] PagingParams param)
    {
        return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult> GetUser(int userId)
    {
        return HandleResult(await Mediator.Send(new One.Query { UserId = userId }));
    }

    //[HttpPost("new-user-by-name")]
    [HttpPost("[action]")]
    public async Task<ActionResult> NewUserByName(UserCreateDTO user)
    {
        return HandleResult(await Mediator.Send(new CreateByName.Command { User = user }));
    }

    [HttpPut("[action]")]
    public async Task<ActionResult> EditUser(UserDTO user)
    {
        return HandleResult(await Mediator.Send(new EditUser.Command { User = user }));
    }

    [HttpDelete("[action]")]
    public async Task<ActionResult> RemoveUser(int userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));

        if (user is null) return StatusCode(StatusCodes.Status404NotFound);

        _context.Users.Remove(user);

        return Ok(await _context.SaveChangesAsync() > 0 
            ? StatusCode(StatusCodes.Status200OK) 
            : StatusCode(StatusCodes.Status400BadRequest));
    }

}
