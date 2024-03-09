
using Domain.Entity;
using Domain.Entity.DTOS;
using System.ComponentModel.DataAnnotations;

namespace Application.HearingApp.DTOs;

public class HearingCreateDTO
{
    public int UserId { get; set; }
    public string Note { get; set; } = String.Empty; 

    public ICollection<HearingItemDto> Items { get; set; } = new List<HearingItemDto>();
}

public class HearingItemDto
{
    public EarLeftRight Ear { get; set; }

    public int V1000 { get; set; }
    public int V2000 { get; set; }
    public int V4000 { get; set; }
    public int V6000 { get; set; }
    public int V8000 { get; set; }
    public int V250 { get; set; }
    public int V500 { get; set; }
    public string Result { get; set; }

    public int HearingId { get; set; } 
}

