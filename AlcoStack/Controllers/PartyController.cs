using AlcoStack.Dtos;
using AlcoStack.Extensions;
using AlcoStack.Interface;
using AlcoStack.Models;
using AlcoStack.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Controllers;

[Route("api/party")]
[ApiController]
public class PartyController(
    IPartyRepository repository,
    IPartyAlcoholRepository partyAlcoholRepository,
    IUserPartyRepository userPartyRepository,
    IAlcoholRepository alcoholRepository,
    UserManager<User> userManager,
    SignInManager<User> signinManager)
    : ControllerBase
{
    private readonly SignInManager<User> _signinManager = signinManager;


    [Authorize]
    [HttpPost("create")]
    public async Task<IActionResult> CreateParty([FromBody] CreatePartyDto partyDto)
    {
        var username = User.GetUsername();
        var user = await userManager.FindByNameAsync(username);

        if (user == null)
        {
            return BadRequest("User not found");   
        }
        
        
        var party = partyDto.MapToCreateModel();
        
        party.CreatorUserName = user.UserName;
        party.Creator = user;
        
        
        var createdParty = await repository.CreateAsync(party);
        return CreatedAtAction(nameof(GetParty), new { Id = createdParty.Id }, createdParty.MapToDto());
    }

    [Authorize]
    [HttpGet("{Id}")]
    public async Task<IActionResult> GetParty(Guid Id)
    {
        var party = await repository.GetByIdAsync(Id);
        if (party == null)
        {
            return NotFound();
        }
        return Ok(party.MapToDto());
    }

    [Authorize]
    [HttpGet("all")]
    public async Task<IActionResult> GetAllParties()
    {
        var parties = await repository.GetAllAsync();
        return Ok(parties.Select(PartyMapper.MapToDto));
    }

    [Authorize]
    [HttpPut("{Id}")]
    public async Task<IActionResult> UpdateParty(Guid Id, [FromBody] UpdatePartyDto partyDto)
    {
        var party = await repository.UpdateAsync(Id, partyDto);
        if (party == null)
        {
            return NotFound();
        }
        return Ok(party.MapToDto());
    }

    [Authorize]
    [HttpDelete("{Id}")]
    public async Task<IActionResult> DeleteParty(Guid Id)
    {
        var party = await repository.DeleteAsync(Id);
        if (party == null)
        {
            return NotFound();
        }
        return Ok(party.MapToDto());
    }
    
    [Authorize]
    [HttpPost("{partyId}/add-alcohol/{alcoholId}")]
    public async Task<IActionResult> AddAlcoholToParty(Guid partyId, Guid alcoholId)
    {
        return Ok(await partyAlcoholRepository.AddAsync(partyId, alcoholId));
    }
    
    [Authorize]
    [HttpPost("{partyId}/add-user/{userName}")]
    public async Task<IActionResult> AddUserToParty(Guid partyId, string userName)
    {
        return Ok(await userPartyRepository.AddAsync(userName, partyId));
    }
    
    [Authorize]
    [HttpDelete("{partyId}/delete-alcohol/{alcoholId}")]
    public async Task<IActionResult> DeleteAlcoholFromParty(Guid partyId, Guid alcoholId)
    {
        var partyAlcohol = await partyAlcoholRepository.DeleteAsync(partyId, alcoholId);
        if (partyAlcohol == null)
        {
            return NotFound();
        }
        return Ok(partyAlcohol);
    }
    
    [Authorize]
    [HttpGet("{partyId}/alcohols")]
    public async Task<IActionResult> GetAlcoholsByPartyId(Guid partyId)
    {
        return Ok(await partyAlcoholRepository.GetAlcoholsByPartyIdAsync(partyId));
    }
    
    [Authorize]
    [HttpPut("{partyId}/update-volume/{alcoholId}")]
    public async Task<IActionResult> UpdateVolume(Guid partyId, Guid alcoholId, [FromBody] int volume)
    {
        return Ok(await partyAlcoholRepository.UpdateVolumeAsync(partyId, alcoholId, volume));
    }
    
    [Authorize]
    [HttpPut("{partyId}/update-rating/{alcoholId}")]
    public async Task<IActionResult> UpdateRating(Guid partyId, Guid alcoholId, [FromBody] int rating)
    {
        return Ok(await partyAlcoholRepository.UpdateRatingAsync(partyId, alcoholId, rating));
    }
    
}