
using System.ComponentModel.DataAnnotations;

namespace Domain.Entity;

public class Diabetes
{
    [Key]
    public int Id { get; set; }
    public string Note { get; set; } = String.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public ICollection<DiabetesItem> Items { get; set; } = new List<DiabetesItem>();
}

public class DiabetesItem
{
    [Key]
    public int Id { get; set; }
    public string Image { get; set; }
    public string Result { get; set; }
}