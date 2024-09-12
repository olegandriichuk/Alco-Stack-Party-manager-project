using AlcoStack.Dtos;
using AlcoStack.Extensions;
using AlcoStack.Interface;
using AlcoStack.Models;
using AlcoStack.Enums;
using AlcoStack.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Controllers;

[Route("api/alcohol")]
[ApiController]
public class AlcoholController(
    IAlcoholRepository alcoholRepository,
    UserManager<User> userManager,
    SignInManager<User> signinManager,
    IUserAlcoholRepository userAlcoholRepository,
    IPartyAlcoholRepository partyAlcoholRepository)
    : ControllerBase
{
    
    private readonly IAlcoholRepository _alcoholRepository = alcoholRepository;
    private readonly IUserAlcoholRepository _userAlcoholRepository = userAlcoholRepository;
    private readonly IPartyAlcoholRepository _partyAlcoholRepository = partyAlcoholRepository;
    private readonly UserManager<User> _userManager = userManager;
    private readonly SignInManager<User> _signinManager = signinManager;
    
    [Authorize]
    [HttpPost("create")]
    public async Task<IActionResult> CreateAlcohol([FromBody] CreateAlcoholDto alcoholDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var username = User.GetUsername();
        var user = await _userManager.FindByNameAsync(username);

        if (user == null)
        {
            return BadRequest("User not found");   
        }
        
        var alcohol = alcoholDto.MapToModel();
        
        var createdAlcohol = await _alcoholRepository.CreateAlcoholAsync(alcohol);
        return CreatedAtAction(nameof(GetAlcohol), new { Id = createdAlcohol.Id }, createdAlcohol.MapToDto());
    }
    
    [HttpGet("{Id}")]
    public async Task<IActionResult> GetAlcohol(Guid Id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var alcohol = await _alcoholRepository.GetAlcoholByIdAsync(Id);
        if (alcohol == null)
        {
            return NotFound();
        }
        return Ok(alcohol.MapToDto());
    }
    
    [HttpGet("{name}/name")]
    public async Task<IActionResult> GetAlcohol(string name)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var alcohol = await _alcoholRepository.GetAlcoholByNameAsync(name);
        if (alcohol == null)
        {
            return NotFound();
        }
        return Ok(alcohol.MapToDto());
    }
    
    [HttpGet("all")]
    public async Task<IActionResult> GetAllAlcohols()
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var alcohols = await _alcoholRepository.GetAllAsync();

        if (alcohols == null)
        {
            return NotFound();
        }
        
        return Ok(alcohols.Select(alcohol => alcohol.MapToDto()));
    }
    
    [HttpGet("{partyId}/limitByRank/{rankLimit}")]
    public async Task<IActionResult> GetAllAlcoholsByRank(Guid partyId, int rankLimit)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var alcohols = await _partyAlcoholRepository.GetByRankAndLimitAsync(partyId, rankLimit);

        if (alcohols == null)
        {
            return NotFound();
        }
        
        return Ok(alcohols.Select(alcohol => alcohol.MapToDto()));
    }
    
    [HttpGet("{partyId}/allByRank")]
    public async Task<IActionResult> GetAllAlcoholsByRank(Guid partyId)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var alcohols = await _partyAlcoholRepository.GetByRankAsync(partyId);

        if (alcohols == null)
        {
            return NotFound();
        }
        
        return Ok(alcohols.Select(alcohol => alcohol.MapToDto()));
    }
    // [Authorize]
    // [HttpPut("{Id}")]
    // public async Task<IActionResult> UpdateAlcohol(Guid Id, [FromBody] UpdateAlcoholDto alcoholDto)
    // {
    //     if (!ModelState.IsValid)
    //         return BadRequest(ModelState);
    //     
    //     var alcohol = await _alcoholRepository.GetAlcoholByIdAsync(Id);
    //     if (alcohol == null)
    //     {
    //         return NotFound();
    //     }
    //     
    //     alcohol.Name = alcoholDto.Name;
    //     alcohol.Type = alcoholDto.Type;
    //     alcohol.Photo = alcoholDto.Photo;
    //     alcohol.Description = alcoholDto.Description;
    //     
    //     await _alcoholRepository.UpdateAlcoholAsync(alcohol);
    //     return NoContent();
    // }
    //
    
    [HttpGet("{userName}UserAlcohol")]
    public async Task<IActionResult> GetAlcoholUsers(string userName)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var user = await _userManager.FindByNameAsync(userName);
        if (user == null)
        {
            return NotFound();
        }
        
        var alcohols = await _userAlcoholRepository.GetAlcoholsByUserNameAsync(userName);
        return Ok(alcohols.Select(alcohol => alcohol.MapToDto()));
    }
    
    [HttpGet("{partyId}PartyAlcohol")]
    public async Task<IActionResult> GetAlcoholParties(Guid partyId)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var parties = await _partyAlcoholRepository.GetAlcoholsByPartyIdAsync(partyId);
        return Ok(parties.Select(party => party.MapToDto()));
    }
    
    [HttpGet("{type}AlcoholByType")]
    public async Task<IActionResult> GetAlcoholByType(AlcoType type)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var alcohols = await _alcoholRepository.GetAlcoholsByTypeAsync(type);
        
        if (alcohols == null)
        {
            return NotFound();
        }
        
        return Ok(alcohols.Select(alcohol => alcohol.MapToDto()));
    }
    
    [Authorize]
    [HttpDelete("{Id}")]
    public async Task<IActionResult> DeleteAlcohol(Guid Id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        await _alcoholRepository.DeleteAlcoholAsync(Id);
        return NoContent();
    }
}