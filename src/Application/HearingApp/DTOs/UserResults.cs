using Application.Core;
using Domain.Entity; 

namespace Application.HearingApp.DTOs
{
    public class UserResults
    {
        public Result<List<Hearing>> Hearing { get; set; }
        public Result<List<Diabetes>> Diabetes { get; set; }
    }
}
