using Domain;
using Domain.Entity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Rewrite;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class FMHTController : BaseApiController
    {
        private readonly DataContext _context;

        public FMHTController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<List<FMHT>>> GetFMHT()
        {
            var result = await _context.FMHTs.ToListAsync();

            return Ok(result.OrderByDescending(a => a.CreatedAt).ToList());
        }

        [HttpGet("[action]")] 
        public async Task<ActionResult> GetFMHTByUserId(int userId)
        {
            var result = await _context.FMHTs.FirstOrDefaultAsync(a => a.UserId == userId);
             
            return Ok(result is not null ? result : null);
        }

        [HttpPost("[action]")]
        public async Task<ActionResult> CreateFMHT(FMHTDto request)
        {
            var user = await _context.Users.Include(x => x.FMHTs).FirstOrDefaultAsync(x => x.Id.Equals(request.UserId));

            if (user is null) return Ok(StatusCode(StatusCodes.Status404NotFound));

            var existingFMHT = user.FMHTs.FirstOrDefault(x => x.UserId.Equals(request.UserId));

            if (existingFMHT is not null)
            {
                existingFMHT.CreatedAt = DateTime.Now;
                existingFMHT.Result = request.Result;
            }
            else
            {
                var newFMHT = new FMHT()
                {
                    CreatedAt = DateTime.Now,
                    Result = request.Result,
                    UserId = request.UserId
                };

                user.FMHTs.Add(newFMHT);
            }

            return Ok(StatusCode(await _context.SaveChangesAsync() > 0 ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest));
        }

        [HttpDelete("[action]")]
        public async Task<ActionResult> RemoveFMHT(int fmhtId)
        {
            var result = await _context.FMHTs.FirstOrDefaultAsync(x => x.Id.Equals(fmhtId));

            if (result is null) StatusCode(StatusCodes.Status404NotFound);

            _context.FMHTs.Remove(result);

            return Ok(StatusCode(await _context.SaveChangesAsync() > 0 ? StatusCodes.Status200OK : StatusCodes.Status400BadRequest));
        }

    }
}
