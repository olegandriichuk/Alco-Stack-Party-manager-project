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

        // Inject ICocktailService instead of the concrete CocktailService
        public CocktailController(ICocktailService cocktailService)
        {
            _cocktailService = cocktailService;
        }

        [Authorize]
        [HttpGet("ingredient/{ingredient}")]
        public async Task<ActionResult<List<CocktailListDto>>> GetCocktailsByIngredient(string ingredient)
        {
            var cocktails = await _cocktailService.GetCocktailsByIngredientAsync(ingredient);

            if (cocktails.Count == 0)
            {
                return NotFound();
            }
        
            return Ok(cocktails);
        }

        [Authorize]
        [HttpGet("details/{id}")]
        public async Task<ActionResult<CocktailDetailsDto>> GetCocktailDetails(string id)
        {
            var cocktail = await _cocktailService.GetCocktailDetailsAsync(id);

            if (cocktail == null)
            {
                return NotFound();
            }

            return Ok(cocktail);
        }
    }
}