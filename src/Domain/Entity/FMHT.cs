
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Domain.Entity
{
    public class FMHT
    {
        [Key]
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Result { get; set; }

        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }

    public class FMHTDto 
    {
        public int Id { get; set; }
        public string Result { get; set; }
        public int UserId { get; set; }
    }
}
