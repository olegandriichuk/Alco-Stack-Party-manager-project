namespace AlcoStack.Dtos;

public class CocktailDetailsDto
{
    public string IdDrink { get; set; }
    public string StrDrink { get; set; }
    public string StrCategory { get; set; }
    public string StrAlcoholic { get; set; }
    public string StrGlass { get; set; }
    public string StrInstructions { get; set; }
    public string StrDrinkThumb { get; set; }
    public List<string> Ingredients { get; set; }
}

public class CocktailDetailsList
{
    public List<CocktailDetailsDto> Drinks { get; set; }
}