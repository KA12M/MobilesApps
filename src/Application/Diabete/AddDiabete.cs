using Microsoft.AspNetCore.Http;

namespace Application.Diabete
{
    public class AddDiabete
    {
        //public int Id { get; set; }
        public string Note { get; set; } = string.Empty;

        public IFormFile ImageEyeLeft { get; set; } 
        //public string ResultLeft { get; set; } = string.Empty;
        public IFormFile ImageEyeRight { get; set; } 
        //public string ResultRight { get; set; } = string.Empty;
    }
}
