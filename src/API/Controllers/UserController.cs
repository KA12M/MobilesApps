
using Application.Core;
using Application.Users;
using Application.Users.DTOs;
using AutoMapper;
using Domain;
using Domain.Entity;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tensorflow.Contexts;

namespace API.Controllers;

public class UserController : BaseApiController
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UserController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
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

    [HttpPost("[action]")]
    public async Task<ActionResult> LoginByPhone(string phone)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Phone.Equals(phone));

        return Ok(user is null ? StatusCode(StatusCodes.Status404NotFound) : user); 
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

    [HttpPost("[action]")]
    public async Task<ActionResult> Register(RegisterDto request)
    {
        var currentUser = await _context.Users
            .Include(x => x.UserSicknessList)
            .FirstOrDefaultAsync(x => x.Phone.Equals(request.Phone));
        
        if (currentUser is not null) return null;

        var user = _mapper.Map<User>(request);
        user.Birthday = request.Birthday;

        await _context.Users.AddAsync(user);
        
        return Ok(await _context.SaveChangesAsync() > 0 ? user : StatusCode(StatusCodes.Status400BadRequest));
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
