using AlcoStack.Models;
using AlcoStack.Interface;
using AlcoStack.Dtos;
using AlcoStack.Data;
using AlcoStack.Mappers;
using Microsoft.EntityFrameworkCore;


namespace AlcoStack.Repositories;

public class PartyRepository(AppDataContext context) : IPartyRepository
{
    private readonly AppDataContext _context = context;

    public async Task<Party?> CreateAsync(Party party)
    {
        
        await _context.Parties.AddAsync(party);
        await _context.SaveChangesAsync();
        return party;
    }

    public async Task<Party?> UpdateAsync(Guid id, UpdatePartyDto party)
    {
        var existingParty = await _context.Parties.FirstOrDefaultAsync(x => x.Id == id);
        if (existingParty == null)
        {
            throw new Exception("Party not found");
        }

        existingParty = party.MapToUpdateModel();

        _context.Parties.Update(existingParty);
        await _context.SaveChangesAsync();
        return existingParty;
    }

    public async Task<Party?> GetByIdAsync(Guid id)
    {
        return await _context.Parties.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<ICollection<Party>?> GetAllAsync()
    {
        return await _context.Parties.ToListAsync();
    }
    

    public async Task<Party?> DeleteAsync(Guid id)
    {
        var existingParty = await _context.Parties.FirstOrDefaultAsync(x => x.Id == id);
        if (existingParty == null)
        {
            throw new Exception("Party not found");
        }

        _context.Parties.Remove(existingParty);
        await _context.SaveChangesAsync();
        return existingParty;
    }
}