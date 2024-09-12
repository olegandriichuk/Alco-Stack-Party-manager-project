using AlcoStack.Dtos;
using AlcoStack.Models;

namespace AlcoStack.Mappers;

public static class AddressMapper
{
    public static AddressDto MapToDto(this Address address) => new AddressDto
    {
        StreetAddress = address.StreetAddress,
        City = address.City,
        PostalCode = address.PostalCode,
        Country = address.Country
    };

    public static Address MapToModel(this AddressDto addressDto, string userName) => new Address
    {
        UserName = userName,
        StreetAddress = addressDto.StreetAddress,
        City = addressDto.City,
        PostalCode = addressDto.PostalCode,
        Country = addressDto.Country
    };
    
    
}