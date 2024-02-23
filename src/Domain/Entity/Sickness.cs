
using System.ComponentModel.DataAnnotations;

namespace Domain.Entity;

public class Sickness
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; }
    public string Note { get; set; } = String.Empty;
    public bool IsUsed { get; set; } = true;
}

public class UserSickness
{
    public int UserId { get; set; }
    public int SicknessId { get; set; }

    public User User { get; set; }
    public Sickness Sickness { get; set; }
}