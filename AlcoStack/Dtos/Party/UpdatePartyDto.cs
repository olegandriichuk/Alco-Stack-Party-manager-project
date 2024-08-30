﻿namespace AlcoStack.Dtos;

public class UpdatePartyDto
{
    public string Name { get; set; }
    
    public string? Description { get; set; }
    
    public string? Photo { get; set; }
    
    public DateTime Date { get; set; }
    
    public string? Location { get; set; }
    
    public bool Liquors { get; set; } = false;
    
    public bool  LowAlcohol { get; set; } = false;
    
    public bool  MidAlcohol { get; set; } = false;
    
    public bool  HighAlcohol { get; set; } = false;
    
    public bool Status { get; set; } = true;
    
    public int[]? VolumeList { get; set; }
}