
using System.ComponentModel.DataAnnotations;

namespace Domain.Entity;

public class Diabetes
{
    [Key]
    public int Id { get; set; }
    public string Note { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;

    public string ImageEyeLeft { get; set; } = string.Empty;
    public string ResultLeft { get; set; } = string.Empty;
    public string ImageEyeRight { get; set; } = string.Empty;
    public string ResultRight { get; set; } = string.Empty;

    //public DiabetesItem EyeLeft { get; set; } = new DiabetesItem();
    //public DiabetesItem EyeRight { get; set; } = new DiabetesItem();
}

//public class DiabetesItem
//{
//    [Key]
//    public int Id { get; set; }
//    public string Image { get; set; }
//    public string Result { get; set; }
//}
