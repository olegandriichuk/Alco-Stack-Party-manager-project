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
public class PartyController : ControllerBase
{
    private readonly IPartyRepository _repository;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signinManager;


    public PartyController(IPartyRepository repository, UserManager<User> userManager, SignInManager<User> signinManager)
    {
        _repository = repository;
        _userManager = userManager;
        _signinManager = signinManager;
    }

    [Authorize]
    [HttpPost("create")]
    public async Task<IActionResult> CreateParty([FromBody] CreatePartyDto partyDto)
    {
        var username = User.GetUsername();
        var user = await _userManager.FindByNameAsync(username);

        if (user == null)
        {
            return BadRequest("User not found");   
        }
        
        
        var party = partyDto.MapToCreateModel();
        
        party.CreatorUserName = user.UserName;
        party.Creator = user;
        
        
        var createdParty = await _repository.CreateAsync(party);
        return CreatedAtAction(nameof(GetParty), new { Id = createdParty.Id }, PartyMapper.MapToDto(createdParty));
    }

    [Authorize]
    [HttpGet("{Id}")]
    public async Task<IActionResult> GetParty(Guid Id)
    {
        var party = await _repository.GetByIdAsync(Id);
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
        var parties = await _repository.GetAllAsync();
        return Ok(parties.Select(PartyMapper.MapToDto));
    }

    [Authorize]
    [HttpPut("{Id}")]
    public async Task<IActionResult> UpdateParty(Guid Id, [FromBody] UpdatePartyDto partyDto)
    {
        var party = await _repository.UpdateAsync(Id, partyDto);
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
        var party = await _repository.DeleteAsync(Id);
        if (party == null)
        {
            return NotFound();
        }
        return Ok(party.MapToDto());
    }
}