
using System.ComponentModel.DataAnnotations;
using Domain.Entity.DTOS;

namespace Domain.Entity;

public class User
{
    [Key]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public Gender Gender { get; set; }
    public DateTime Birthday { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string Note { get; set; } = String.Empty;
    public bool IsUsed { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public ICollection<UserSickness> UserSicknessList { get; set; } = new List<UserSickness>();
    public ICollection<Hearing> Hearings { get; set; } = new List<Hearing>();
    public ICollection<Diabetes> Diabetes { get; set; } = new List<Diabetes>();
}
