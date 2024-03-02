
using Domain.Entity.DTOS;

namespace Application.Users.DTOs;

public class UserDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public Gender Gender { get; set; }
    public DateTime Birthday { get; set; }
    public int Age { get; set; }
    public string Phone { get; set; }
    public string Address { get; set; }
    public string Note { get; set; } = String.Empty;

    public ICollection<Domain.Entity.Sickness> Sicknesses { get; set; }
    public ICollection<Domain.Entity.Diabetes> Diabetes { get; set; }
}

public class UserCreateDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Phone { get; set; }
}

public class RegisterDto : UserCreateDTO
{
    public DateTime Birthday { get; set; }
}
