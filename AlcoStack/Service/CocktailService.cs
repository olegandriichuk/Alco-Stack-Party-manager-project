using AlcoStack.Dtos;
using AlcoStack.Data;
using AlcoStack.Models;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using AlcoStack.Interface;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Service
{
    public class CocktailService : ICocktailService
    {
        private readonly AppDataContext _context;
        private readonly HttpClient _httpClient;
        private readonly string _cocktailDbListUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
        private readonly string _cocktailDbDetailsUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

        // Inject HttpClient via constructor
        public CocktailService(HttpClient httpClient, AppDataContext context)
        {
            _httpClient = httpClient;
            _context = context;
        }

        public async Task<List<CocktailListDto>> GetCocktailsByIngredientAsync(string ingredient)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_cocktailDbListUrl}{ingredient}");
        
                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var cocktailList = JsonSerializer.Deserialize<CocktailList>(jsonResponse, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
        
                    if (cocktailList?.Drinks != null)
                    {
                        return cocktailList.Drinks.Select(drink => new CocktailListDto
                        {
                            id = drink.IdDrink,
                            Name = drink.StrDrink,
                            Photo = drink.StrDrinkThumb
                        }).ToList();
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                Console.WriteLine($"Error fetching cocktails: {ex.Message}");
            }
        
            return new List<CocktailListDto>();
        }
        
        // public async Task<List<CocktailListDto>> GetCocktailsByIngredientAsync(string alcoholName)
        // {
        //     try
        //     {
        //         // Check if the provided alcohol name exists in the database
        //         var alcoholInDb = await _context.Alcohols
        //             .FirstOrDefaultAsync(a => a.Name.ToLower() == alcoholName.ToLower());
        //
        //         if (alcoholInDb == null)
        //         {
        //             // If the alcohol is not found, return an empty list
        //             return new List<CocktailListDto>();
        //         }
        //
        //         // Fetch cocktails using the alcohol ingredient name from the external API
        //         var response = await _httpClient.GetAsync($"{_cocktailDbListUrl}{alcoholName}");
        //
        //         if (response.IsSuccessStatusCode)
        //         {
        //             var jsonResponse = await response.Content.ReadAsStringAsync();
        //             var cocktailList = JsonSerializer.Deserialize<CocktailList>(jsonResponse, new JsonSerializerOptions
        //             {
        //                 PropertyNameCaseInsensitive = true
        //             });
        //
        //             if (cocktailList?.Drinks != null)
        //             {
        //                 var filteredCocktails = new List<CocktailListDto>();
        //
        //                 foreach (var drink in cocktailList.Drinks)
        //                 {
        //                     var cocktailDetails = await GetCocktailDetailsAsync(drink.IdDrink);
        //
        //                     if (cocktailDetails != null && await IsOnlyAlcoholIngredient(cocktailDetails, alcoholInDb.Name))
        //                     {
        //                         filteredCocktails.Add(new CocktailListDto
        //                         {
        //                             Id = drink.IdDrink,
        //                             Name = drink.StrDrink,
        //                             Photo = drink.StrDrinkThumb
        //                         });
        //                     }
        //                 }
        //
        //                 return filteredCocktails;
        //             }
        //         }
        //     }
        //     catch (Exception ex)
        //     {
        //         // Log the exception or handle it accordingly
        //         Console.WriteLine($"Error fetching cocktails: {ex.Message}");
        //     }
        //
        //     return new List<CocktailListDto>();
        // }

// Helper method to check if the given alcohol is the only alcoholic ingredient in the cocktail
// private async Task<bool> IsOnlyAlcoholIngredient(CocktailDetailsDto cocktail, string alcoholIngredient)
// {
//     // Get all alcohol names from the database
//     var alcoholNames = await _context.Alcohols.Select(a => a.Name.ToLower()).ToListAsync();
//
//     int alcoholCount = 0;
//     bool containsDesiredAlcohol = false;
//
//     // Check ingredients (assuming Ingredient1 to Ingredient15)
//     for (int i = 1; i <=25 ; i++)
//     {
//         var ingredient = cocktail.GetType().GetProperty($"StrIngredient{i}")?.GetValue(cocktail)?.ToString()?.ToLower();
//
//         if (!string.IsNullOrEmpty(ingredient))
//         {
//             if (alcoholNames.Contains(ingredient))
//             {
//                 alcoholCount++;
//             }
//             if (ingredient.Contains(alcoholIngredient.ToLower()))
//             {
//                 containsDesiredAlcohol = true;
//             }
//         }
//     }
//
//     // Return true if the only alcohol present is the one passed as the ingredient
//     return alcoholCount == 1 && containsDesiredAlcohol;
// }


        // Method for getting detailed cocktail information
        public async Task<CocktailDetailsDto?> GetCocktailDetailsAsync(string id)
        {
            try
            {
                var response = await _httpClient.GetAsync($"{_cocktailDbDetailsUrl}{id}");

                if (response.IsSuccessStatusCode)
                {
                    var jsonResponse = await response.Content.ReadAsStringAsync();
                    var detailedList = JsonSerializer.Deserialize<CocktailDetailsList>(jsonResponse, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    var cocktail = detailedList?.Drinks?.FirstOrDefault();

                    if (cocktail != null)
                    {
                        // Extract ingredients and measurements
                        var ingredients = new List<string>();
                        for (int i = 1; i <= 15; i++) // Assuming up to 15 ingredients
                        {
                            var ingredient = cocktail.GetType().GetProperty($"StrIngredient{i}")?.GetValue(cocktail) as string;
                            var measure = cocktail.GetType().GetProperty($"StrMeasure{i}")?.GetValue(cocktail) as string;

                            if (!string.IsNullOrEmpty(ingredient))
                            {
                                ingredients.Add(!string.IsNullOrEmpty(measure) 
                                    ? $"{measure.Trim()} {ingredient.Trim()}" 
                                    : ingredient.Trim());
                            }
                        }

                        // Assign ingredients back to the DTO
                        cocktail.Ingredients = ingredients;
                    }

                    return cocktail;
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it accordingly
                Console.WriteLine($"Error fetching cocktail details: {ex.Message}");
            }

            return null;
        }
        public async Task<List<string>> ExtractIngredientsAsync(CocktailDetailsDto? cocktail)
        {
            if (cocktail == null)
            {
                throw new ArgumentNullException(nameof(cocktail), "Cocktail cannot be null");
            }
            return await Task.Run(() =>
            {
                return new List<string>
                {
                    cocktail.StrIngredient1,
                    cocktail.StrIngredient2,
                    cocktail.StrIngredient3,
                    cocktail.StrIngredient4,
                    cocktail.StrIngredient5,
                    cocktail.StrIngredient6,
                    cocktail.StrIngredient7,
                    cocktail.StrIngredient8,
                    cocktail.StrIngredient9,
                    cocktail.StrIngredient10,
                    cocktail.StrIngredient11,
                    cocktail.StrIngredient12,
                    cocktail.StrIngredient13,
                    cocktail.StrIngredient14,
                    cocktail.StrIngredient15
                }.Where(ingredient => !string.IsNullOrEmpty(ingredient)) // Исключаем null и пустые строки
                .ToList();
            });
        }


    }
}
