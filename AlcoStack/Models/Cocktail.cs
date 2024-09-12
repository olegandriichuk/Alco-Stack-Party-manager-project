namespace AlcoStack.Models;

public class Cocktail
{
    public string IdDrink { get; set; }
    public string StrDrink { get; set; }
    public string StrDrinkThumb { get; set; }
}

public class CocktailList
{
    public List<Cocktail> Drinks { get; set; }
}