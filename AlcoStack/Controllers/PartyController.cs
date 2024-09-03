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
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var username = User.GetUsername();
        var user = await userManager.FindByNameAsync(username);

        if (user == null)
        {
            return BadRequest("User not found");   
        }
        
        var party = partyDto.MapToCreateModel();
        
        var createdParty = await repository.CreateAsync(party);
        return CreatedAtAction(nameof(GetParty), new { Id = createdParty.Id }, createdParty.MapToDto());
    }

    [Authorize]
    [HttpGet("{Id}")]
    public async Task<IActionResult> GetParty(Guid Id)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
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
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var parties = await repository.GetAllAsync();
        return Ok(parties.Select(PartyMapper.MapToDto));
    }

    [Authorize]
    [HttpPut("{Id}")]
    public async Task<IActionResult> UpdateParty(Guid Id, [FromBody] UpdatePartyDto partyDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
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
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
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
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(await partyAlcoholRepository.AddAsync(partyId, alcoholId));
    }
    
    [Authorize]
    [HttpPost("{partyId}/add-user")]
    public async Task<IActionResult> AddUserToParty(Guid partyId)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var userName = User.GetUsername();
        
        return Ok(await userPartyRepository.AddAsync(userName, partyId));
    }
    
    [Authorize]
    [HttpDelete("{partyId}/delete-alcohol/{alcoholId}")]
    public async Task<IActionResult> DeleteAlcoholFromParty(Guid partyId, Guid alcoholId)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var partyAlcohol = await partyAlcoholRepository.DeleteAsync(partyId, alcoholId);
        if (partyAlcohol == null)
        {
            return NotFound();
        }
        return Ok(partyAlcohol);
    }
    
    [HttpGet("{partyId}/alcohols")]
    public async Task<IActionResult> GetAlcoholsByPartyId(Guid partyId)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(await partyAlcoholRepository.GetAlcoholsByPartyIdAsync(partyId));
    }
    
    // [HttpGet("{userName}/userParties")]
    // public async Task<IActionResult> GetPartiesByUserName(string userName)
    // {
    //     if (!ModelState.IsValid)
    //         return BadRequest(ModelState);
    //     
    //     return Ok(await userPartyRepository.GetByUserNameAsync(userName));
    // }
    
    [Authorize]
    [HttpGet("userParties")]
    public async Task<IActionResult> GetPartiesByUserName()
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var userName = User.GetUsername();
        
        return Ok(await userPartyRepository.GetByUserNameAsync(userName));
    }
   
    [Authorize]
    [HttpDelete("{partyId}remove-user/{userName}")]
    public async Task<IActionResult> RemoveUserFromParty(Guid partyId, string userName)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        var UserName = User.GetUsername();
        
        var party = await repository.GetByIdAsync(partyId);
        
        if(party == null)
        {
            throw new Exception("Party not found");
        }
        
        if(party.CreatorUserName != UserName)
        {
            throw new Exception("You are not the creator of this party");
        }
        
        var userParty = await userPartyRepository.DeleteAsync(userName, partyId);
        if (userParty == null)
        {
            return NotFound();
        }
        return Ok(userParty);
    }
    
    [Authorize]
    [HttpPatch("{partyId}/update-volume/{alcoholId}")]
    public async Task<IActionResult> UpdateVolume(Guid partyId, Guid alcoholId, [FromBody] int volume)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(await partyAlcoholRepository.UpdateVolumeAsync(partyId, alcoholId, volume));
    }
    
    [Authorize]
    [HttpPatch("{partyId}/update-rating/{alcoholId}")]
    public async Task<IActionResult> UpdateRating(Guid partyId, Guid alcoholId, [FromBody] int rating)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        
        return Ok(await partyAlcoholRepository.UpdateRatingAsync(partyId, alcoholId, rating));
    }
    
}