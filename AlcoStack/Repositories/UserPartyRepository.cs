using AlcoStack.Models;
using AlcoStack.Interface;
using AlcoStack.Dtos;
using AlcoStack.Data;
using Microsoft.EntityFrameworkCore;


namespace AlcoStack.Repositories;

public class UserPartyRepository(AppDataContext context, IAlcoholRankingService alcoholRankingService) : IUserPartyRepository
{

    public async Task<UserParty> AddAsync(string userName, Guid partyId)
    {
        var user = await context.Users.FirstOrDefaultAsync(x => x.UserName == userName);
        
        if (user == null)
        {
            throw new Exception("User not found");
        }
        
        var party = await context.Parties.FirstOrDefaultAsync(x => x.Id == partyId);
        
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

        var alcohols = await context.Alcohols.ToListAsync();
        foreach (var alcohol in alcohols)
        {
            var partyUserAlcohol = new PartyUserAlcohol
            {
                PartyId = partyId,
                Party = party,
                UserName = userName,
                User = user,
                AlcoholId = alcohol.Id,
                Alcohol = alcohol
            };
            await context.PartyUserAlcohols.AddAsync(partyUserAlcohol);

        }
        
        
        await context.UserParties.AddAsync(userParty);
        await context.SaveChangesAsync();
        
        await alcoholRankingService.SetAlcoholRanksForParty(partyId, party.RankLimit);

        return userParty;
    }

    public async Task<UserParty?> DeleteAsync(string userName, Guid partyId)
    {
        var userParty = await context.UserParties
            .FirstOrDefaultAsync(x => x.UserName == userName && x.PartyId == partyId);
        
        if (userParty == null)
        {
            return null;
        }
        
        context.UserParties.Remove(userParty);
        await context.SaveChangesAsync();
        return userParty;
    }

    public async Task<ICollection<Party>?> GetByUserNameAsync(string userName)
    {
        var userParties = await context.UserParties
            .Where(x => x.UserName == userName && x.Party.date >= DateTime.Now)
            .Include(x => x.Party)
            .OrderBy(x => x.Party.date)
            .ToListAsync();
    
        return userParties.Select(x => x.Party).ToList();
    }

    public async Task<ICollection<Party>?> GetHistoryByUserNameAsync(string userName)
    {
        var userParties = await context.UserParties
            .Where(x => x.UserName == userName && x.Party.date <= DateTime.Now)
            .Include(x => x.Party)
            .OrderBy(x => x.Party.date)
            .ToListAsync();
    
        return userParties.Select(x => x.Party).ToList();
    }

    public async Task<ICollection<User>?> GetUsersByPartyIdAsync(Guid partyId)
    {
        var userParties = await context.UserParties
            .Where(x => x.PartyId == partyId)
            .Include(x => x.User)
            .ToListAsync();

        return userParties.Select(x => x.User).ToList();
    }

  
    public async Task<ICollection<UserParty>> GetAllAsync()
    {
        return await context.UserParties.ToListAsync();
    }
}