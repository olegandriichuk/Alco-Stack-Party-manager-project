using AlcoStack.Dtos;
using AlcoStack.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AlcoStack.Controllers
{
    [Route("api/cocktail")]
    [ApiController]
    public class CocktailController : ControllerBase
    {
        private readonly ICocktailService _cocktailService;
        private readonly IPartyAlcoholRepository _partyAlcoholRepository;
        private readonly IAlcoholRepository _alcoholRepository;
        private readonly IAlcoholRankingService _alcoholRankingService;

        // Inject all dependencies in a single constructor
        public CocktailController(
            ICocktailService cocktailService,
            IPartyAlcoholRepository partyAlcoholRepository,
            IAlcoholRepository alcoholRepository,
            IAlcoholRankingService alcoholRankingService)
        {
            _cocktailService = cocktailService;
            _partyAlcoholRepository = partyAlcoholRepository;
            _alcoholRepository = alcoholRepository;
            _alcoholRankingService = alcoholRankingService;
        }

        [Authorize]
        [HttpGet("ingredient/{partyId}/{ingredient}")]
        public async Task<ActionResult<HashSet<CocktailListDto>>> GetCocktailsByIngredient(string ingredient, Guid partyId) {
        // Получаем алкоголь с рейтингом на вечеринке
        var ratedAlcohols = await _partyAlcoholRepository.GetByRankAsync(partyId);

        if (ratedAlcohols == null || ratedAlcohols.Count == 0)
        {
            return NotFound("No alcohol with rating found for this party.");
        }

        // Получаем весь алкоголь из базы данных
        var allAlcohols = await _alcoholRepository.GetAllAsync();

        // Получаем список коктейлей с указанным ингредиентом
        var cocktails = await _cocktailService.GetCocktailsByIngredientAsync(ingredient);
        var newCocktails = new List<CocktailDetailsDto?>();
        foreach (var cocktail in cocktails)
        {
            newCocktails.Add(await _cocktailService.GetCocktailDetailsAsync(cocktail.id));
        }
        //var newCocktails = await _cocktailService.GetCocktailDetailsAsync(cocktails[0].Name);
        var filteredCocktails = new List<CocktailDetailsDto?>();

        foreach (var cocktail in newCocktails)
        {
          //  var newCocktail = await _cocktailService.GetCocktailDetailsAsync(cocktail.Name);
            // Извлекаем ингредиенты коктейля
            if (cocktail == null)
            {
                Console.WriteLine("One of the cocktails is null. Skipping...");
                continue;
            }
            var ingredients = await _cocktailService.ExtractIngredientsAsync(cocktail);

            // Флаг, который указывает, следует ли исключить коктейль
            bool shouldExclude = false;

            foreach (var ingredientName in ingredients)
            {
                // Проверяем, является ли ингредиент алкоголем из базы данных
                var matchingAlcohol = allAlcohols.FirstOrDefault(alcohol =>
                    string.Equals(alcohol.Name, ingredientName, StringComparison.OrdinalIgnoreCase));

                if (matchingAlcohol != null) // Если ингредиент - это алкоголь
                {
                    // Проверяем, есть ли он в списке ratedAlcohols
                    var isRated = ratedAlcohols.Any(ratedAlcohol =>
                        string.Equals(ratedAlcohol.Name, ingredientName, StringComparison.OrdinalIgnoreCase));

                    if (!isRated) // Если алкоголя нет в ratedAlcohols, исключаем коктейль
                    {
                        shouldExclude = true;
                        break;
                    }
                }
            }

            if (!shouldExclude)
            {
                filteredCocktails.Add(cocktail); // Добавляем коктейль, если он прошел фильтр
            }
        }
    
        /*if (!filteredCocktails.Any())
        {
            return NotFound("No cocktails found with available ingredients.");
        }*/
        var updatedCocktails =  new HashSet<CocktailListDto?>();
        foreach (var filterCocktail in filteredCocktails)
        {
            if (filterCocktail != null)
            {
                foreach (var cocktail in cocktails)
                {
                
                    if (filterCocktail.IdDrink == cocktail.id)
                    {
                        updatedCocktails.Add(cocktail);
                    }
                }
            }
            
                
        }
        return Ok(updatedCocktails);
    }



        [Authorize]
        [HttpGet("details/{Id}")]
        public async Task<ActionResult<CocktailDetailsDto>> GetCocktailDetails(string Id)
        {
            var cocktail = await _cocktailService.GetCocktailDetailsAsync(Id);

            if (cocktail == null)
            {
                return NotFound();
            }

            return Ok(cocktail);
        }
    }
}