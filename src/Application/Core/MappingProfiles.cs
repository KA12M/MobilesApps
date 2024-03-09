
using Application.Diabete.DTOs;
using Application.HearingApp.DTOs;
using Application.Users.DTOs;
using Domain.Entity;

namespace Application.Core;

public class MappingProfiles : AutoMapper.Profile
{
    public MappingProfiles()
    {
        CreateMap<User, UserDTO>()
            .ForMember(a => a.Age, b => b.MapFrom(c => (DateTime.Now.Year - c.Birthday.Year) - (DateTime.Now.Month < c.Birthday.Month || (DateTime.Now.Month == c.Birthday.Month && DateTime.Now.Day < c.Birthday.Day) ? 1 : 0)))
               .ForMember(a => a.Sicknesses, b => b.MapFrom(c => c.UserSicknessList.Select(a => a.Sickness)));
        CreateMap<UserDTO, User>()
               .ForMember(a => a.UserSicknessList, b => b.MapFrom(c => c.Sicknesses.Select(s => new UserSickness { Sickness = s })));
        CreateMap<UserCreateDTO, User>();

        CreateMap<HearingCreateDTO, Hearing>();
        CreateMap<AddDiabete, Diabetes>();

        CreateMap<HearingItemDto, HearingItem>();

    }
}
