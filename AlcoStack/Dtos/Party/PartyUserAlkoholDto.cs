namespace AlcoStack.Dtos;

public class PartyUserAlcoholDto
{
    public List<AlcoholVolumeDto> AlcoholVolume { get; set; }
}

public class AlcoholVolumeDto
{
    /*public int type = 5;
    public string description = null;
    public string photo = null;*/
    public string Name { get; set; } // Unique identifier for the alcohol
    public double Volume { get; set; }    // Volume of alcohol for the user
}