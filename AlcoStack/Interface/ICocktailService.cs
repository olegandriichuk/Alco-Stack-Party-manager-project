using AlcoStack.Dtos;

namespace AlcoStack.Interface;

public interface ICocktailService
{
    Task<List<CocktailListDto>> GetCocktailsByIngredientAsync(string ingredient);
    Task<CocktailDetailsDto?> GetCocktailDetailsAsync(string id);
}