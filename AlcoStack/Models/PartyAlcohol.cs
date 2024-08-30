namespace AlcoStack.Models;

public class PartyAlcohol
{
    public Guid PartyId { get; set; }

    public Party Party { get; set; }
    
    public Guid AlcoholId { get; set; }
    
    public Alcohol Alcohol { get; set; }
    
    public int Volume { get; set; } = 0;
    
    public int Rating { get; set; } = 0;
}