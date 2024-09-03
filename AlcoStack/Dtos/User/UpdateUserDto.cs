using System.ComponentModel.DataAnnotations;
using AlcoStack.Enums;
using AlcoStack.Models;
using Newtonsoft.Json;

namespace AlcoStack.Dtos;

public class UpdateUserDto
{
    public string? Username { get; set; }
    
    [EmailAddress]
    public string? Email { get; set; }
    public string? FirstName { get; set; }   

    public string? LastName { get; set; }
    
    public Gender Gender { get; set; } = Gender.Other;
    public DateOnly? DateOfBirth { get; set; }   

    public AddressDto? Address { get; set; }  

    public string? PhoneNumber { get; set; }  
    
    public string? Bio { get; set; }
   
    public DateTime UpdatedDate { get; set; } = DateTime.Now;
}