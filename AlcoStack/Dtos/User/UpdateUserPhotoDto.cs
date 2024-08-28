using System.ComponentModel.DataAnnotations;
using AlcoStack.Enums;
using AlcoStack.Models;
using Newtonsoft.Json;

namespace AlcoStack.Dtos;

public class UpdateUserPhotoDto
{
    public string? Photo { get; set; }
    
    public string? FormBackgroundUrl { get; set; }
}