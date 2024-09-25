using System.ComponentModel.DataAnnotations;
using AlcoStack.Enums;
using AlcoStack.Models;
using Newtonsoft.Json;

namespace AlcoStack.Dtos;

public class UpdateUserPhotoDto
{
    public IFormFile? PhotoFile { get; set; }
    public IFormFile? FormBackgroundFile { get; set; }
}