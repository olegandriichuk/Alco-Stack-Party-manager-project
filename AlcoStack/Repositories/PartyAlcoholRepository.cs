using AlcoStack.Models;
using AlcoStack.Interface;
using AlcoStack.Dtos;
using AlcoStack.Data;
using Microsoft.EntityFrameworkCore;


namespace AlcoStack.Repositories;

public class PartyAlcoholRepository(AppDataContext context) : IPartyAlcoholRepository
{
    public async Task<PartyAlcohol> AddAsync(Guid partyId, Guid alcoholId)
    {
        var party = await context.Parties.FirstOrDefaultAsync(x => x.Id == partyId);
        
        if (party == null)
        {
            throw new Exception("Party not found");
        }
        
        var alcohol = await context.Alcohols.FirstOrDefaultAsync(x => x.Id == alcoholId);
        
        if (alcohol == null)
        {
            throw new Exception("Alcohol not found");
        }
        
        var partyAlcohol = new PartyAlcohol
        {
            PartyId = partyId,
            AlcoholId = alcoholId,
            Party = party,
            Alcohol = alcohol
        };
        
        await context.PartyAlcohols.AddAsync(partyAlcohol);
        await context.SaveChangesAsync();
        return partyAlcohol;
    }

    public async Task<PartyAlcohol?> DeleteAsync(Guid partyId, Guid alcoholId)
    {
        var partyAlcohol = await context.PartyAlcohols
            .FirstOrDefaultAsync(x => x.PartyId == partyId && x.AlcoholId == alcoholId);
        
        if (partyAlcohol == null)
        {
            return null;
        }
        
        context.PartyAlcohols.Remove(partyAlcohol);
        await context.SaveChangesAsync();
        return partyAlcohol;
    }

    public async Task<ICollection<Alcohol>> GetAlcoholsByPartyIdAsync(Guid partyId)
    {
        var partyAlcohols = await context.PartyAlcohols
            .Where(x => x.PartyId == partyId)
            .Include(x => x.Alcohol)
            .Select(x => x.Alcohol)
            .ToListAsync();
        
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> UpdateVolumeAsync(Guid partyId, Guid alcoholId, int volume)
    {
        var partyAlcohol = await context.PartyAlcohols
            .FirstOrDefaultAsync(x => x.PartyId == partyId && x.AlcoholId == alcoholId);
        
        if (partyAlcohol == null)
        {
            throw new Exception("PartyAlcohol not found");
        }
        
        partyAlcohol.Volume = volume;
        await context.SaveChangesAsync();
        
        var partyAlcohols = await context.PartyAlcohols
            .Where(x => x.PartyId == partyId)
            .Include(x => x.Alcohol)
            .ToListAsync();
        
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> UpdateRatingAsync(Guid partyId, Guid alcoholId, int rating)
    {
        var partyAlcohol = await context.PartyAlcohols
            .FirstOrDefaultAsync(x => x.PartyId == partyId && x.AlcoholId == alcoholId);
        
        if (partyAlcohol == null)
        {
            throw new Exception("PartyAlcohol not found");
        }
        
        partyAlcohol.Rating = rating;
        await context.SaveChangesAsync();
        
        var partyAlcohols = await context.PartyAlcohols
            .Where(x => x.PartyId == partyId)
            .Include(x => x.Alcohol)
            .ToListAsync();
        
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> GetAllAsync()
    {
        var partyAlcohols = await context.PartyAlcohols
            .Include(x => x.Party)
            .Include(x => x.Alcohol)
            .ToListAsync();
        
        return partyAlcohols;
    }
}