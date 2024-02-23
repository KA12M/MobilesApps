
using System.ComponentModel.DataAnnotations;
using Domain.Entity.DTOS;

namespace Domain.Entity;

public class Hearing
{
    [Key]
    public int Id { get; set; }
    public string Note { get; set; } = String.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public ICollection<HearingItem> Items { get; set; } = new List<HearingItem>();
}

public class HearingItem
{
    [Key]
    public int Id { get; set; }
    public EarLeftRight Ear { get; set; }
    public int V250 { get; set; }
    public int V500 { get; set; }
    public int V1000 { get; set; }
    public int V2000 { get; set; }
    public int V4000 { get; set; }
    public int V8000 { get; set; }
    public string Result { get; set; }
}