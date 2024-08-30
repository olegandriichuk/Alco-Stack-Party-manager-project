using AlcoStack.Models;
using AlcoStack.Interface;
using AlcoStack.Dtos;
using AlcoStack.Data;
using Microsoft.EntityFrameworkCore;


namespace AlcoStack.Repositories;

public class UserPartyRepository(AppDataContext context) : IUserPartyRepository
{
    private readonly AppDataContext _context = context;

    public async Task<UserParty> AddAsync(string userName, Guid partyId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
        
        if (user == null)
        {
            throw new Exception("User not found");
        }
        
        var party = await _context.Parties.FirstOrDefaultAsync(x => x.Id == partyId);
        
        if (party == null)
        {
            throw new Exception("Party not found");
        }
        
        var userParty = new UserParty
        {
            UserName = userName,
            PartyId = partyId,
            User = user,
            Party = party
        };
        
        await _context.UserParties.AddAsync(userParty);
        await _context.SaveChangesAsync();
        return userParty;
    }

    public async Task<UserParty?> DeleteAsync(string userName, Guid partyId)
    {
        var userParty = await _context.UserParties
            .FirstOrDefaultAsync(x => x.UserName == userName && x.PartyId == partyId);
        
        if (userParty == null)
        {
            return null;
        }
        
        _context.UserParties.Remove(userParty);
        await _context.SaveChangesAsync();
        return userParty;
    }

    public async Task<ICollection<Party>?> GetByUserNameAsync(string userName)
    {
        var userParties = await _context.UserParties
            .Where(x => x.UserName == userName)
            .Include(x => x.Party)
            .ToListAsync();
        
        return userParties.Select(x => x.Party).ToList();
    }

    public async Task<ICollection<User>?> GetByPartyIdAsync(Guid partyId)
    {
        var userParties = await _context.UserParties
            .Where(x => x.PartyId == partyId)
            .Include(x => x.User)
            .ToListAsync();

        return userParties.Select(x => x.User).ToList();
    }

    public async Task<ICollection<UserParty>> GetAllAsync()
    {
        return await _context.UserParties.ToListAsync();
    }
}