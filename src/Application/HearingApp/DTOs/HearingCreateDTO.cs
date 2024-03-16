using Domain.Entity;
namespace Application.HearingApp.DTOs;

public class HearingCreateDTO
{
    public int UserId { get; set; }
    public string Note { get; set; } = String.Empty; 

    public ICollection<HearingItem> Items { get; set; } = new List<HearingItem>();
}
 