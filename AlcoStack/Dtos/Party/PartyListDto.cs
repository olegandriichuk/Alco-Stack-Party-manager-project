namespace AlcoStack.Dtos;

public class PartyListDto
{
    public string Name { get; set; }
    
    public string? Description { get; set; }
    
    public DateTime Date { get; set; }
    
    public bool CreatedByMe { get; set; }
}