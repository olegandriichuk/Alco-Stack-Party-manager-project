using System.ComponentModel.DataAnnotations;
using AlcoStack.Enums;
using AlcoStack.Models;

namespace AlcoStack.Dtos;

public class NewUserDto
{
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Token { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public Gender Gender { get; set; } = Gender.Other;
    public DateOnly? DateOfBirth { get; set; }      
    public AddressDto? Address { get; set; }  
    public string? Phone { get; set; }  
    
    public string? PhotoName { get; set; }
    
    public string? PhotoSrc { get; set; }
    
    public string? FormBackgroundName { get; set; }
    
    public string? FormBackgroundSrc { get; set; }
    public string? Bio { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime UpdatedDate { get; set; } 
}