
using Application.Core;
using Application.Users;
using Application.Users.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UserController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult> GetUsers([FromQuery] PagingParams param)
    {
        return HandlePagedResult(await Mediator.Send(new List.Query { Params = param }));
    }

    [HttpGet("{userId}")]
    public async Task<ActionResult> GetUser(int userId)
    {
        return HandleResult(await Mediator.Send(new One.Query { UserId = userId }));
    }

    [HttpPost("new-user-by-name")]
    public async Task<ActionResult> NewUserByName(UserCreateDTO user)
    {
        return HandleResult(await Mediator.Send(new CreateByName.Command { User = user }));
    }

    [HttpPut]
    public async Task<ActionResult> EditUser(UserDTO user)
    {
        return HandleResult(await Mediator.Send(new EditUser.Command { User = user }));
    }
}
