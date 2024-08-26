using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using AlcoStack.Enums;
using Microsoft.AspNetCore.Identity;

namespace AlcoStack.Models;

public class User : IdentityUser
{
    public string? FirstName { get; set; }    
    public string? LastName { get; set; }
    public Gender Gender { get; set; } = Gender.Other;
    public DateOnly? DateOfBirth { get; set; }
    public Address? Address { get; set; }
    public string? Photo { get; set; }
    public string? Bio { get; set; }
    
    public string? FormBackgroundUrl { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
    public DateTime UpdatedDate { get; set; } = DateTime.Now; 
}