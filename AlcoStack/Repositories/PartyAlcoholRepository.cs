using AlcoStack.Models;
using AlcoStack.Interface;
using AlcoStack.Dtos;
using AlcoStack.Data;
using AlcoStack.Enums;
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

    public async Task<ICollection<PartyAlcohol>> UpdateRankAsync(Guid partyId, Guid alcoholId, int rank)
    {
        var partyAlcohol = await context.PartyAlcohols
            .FirstOrDefaultAsync(x => x.PartyId == partyId && x.AlcoholId == alcoholId);
        
        if (partyAlcohol == null)
        {
            throw new Exception("PartyAlcohol not found");
        }

        partyAlcohol.Rank = rank;
        await context.SaveChangesAsync();
        
        var partyAlcohols = await context.PartyAlcohols
            .Where(x => x.PartyId == partyId)
            .Include(x => x.Alcohol)
            .ToListAsync();
        
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> AddLiqoursAsync(Guid partyId)
    {
        var party = await context.Parties.FirstOrDefaultAsync(x => x.Id == partyId);
        
        
        
        if (party == null)
        {
            throw new Exception("Party not found");
        }
        
        var liquors = await context.Alcohols
            .Where(x => x.Type == AlcoType.Liquor)
            .ToListAsync();
        
        var partyAlcohols = new List<PartyAlcohol>();
        
        foreach (var liquor in liquors)
        {
            var partyAlcohol = new PartyAlcohol
            {
                PartyId = partyId,
                AlcoholId = liquor.Id,
                Party = party,
                Alcohol = liquor
            };
            
            partyAlcohols.Add(partyAlcohol);
        }
        
        await context.PartyAlcohols.AddRangeAsync(partyAlcohols);
        await context.SaveChangesAsync();
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> AddLowAlcoholsAsync(Guid partyId)
    {
        var party = await context.Parties.FirstOrDefaultAsync(x => x.Id == partyId);
        
        if (party == null)
        {
            throw new Exception("Party not found");
        }
        
        var lowAlcohols = await context.Alcohols
            .Where(x => x.Type == AlcoType.LowAlcohol)
            .ToListAsync();
        
        var partyAlcohols = new List<PartyAlcohol>();
        
        foreach (var lowAlcohol in lowAlcohols)
        {
            var partyAlcohol = new PartyAlcohol
            {
                PartyId = partyId,
                AlcoholId = lowAlcohol.Id,
                Party = party,
                Alcohol = lowAlcohol
            };
            
            partyAlcohols.Add(partyAlcohol);
        }
        
        await context.PartyAlcohols.AddRangeAsync(partyAlcohols);
        await context.SaveChangesAsync();
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> AddMidAlcoholsAsync(Guid partyId)
    {
        var party = await context.Parties.FirstOrDefaultAsync(x => x.Id == partyId);
        
        if (party == null)
        {
            throw new Exception("Party not found");
        }
        
        var midAlcohols = await context.Alcohols
            .Where(x => x.Type == AlcoType.MidlAlcohol)
            .ToListAsync();
        
        var partyAlcohols = new List<PartyAlcohol>();
        
        foreach (var midAlcohol in midAlcohols)
        {
            var partyAlcohol = new PartyAlcohol
            {
                PartyId = partyId,
                AlcoholId = midAlcohol.Id,
                Party = party,
                Alcohol = midAlcohol
            };
            
            partyAlcohols.Add(partyAlcohol);
        }
        
        await context.PartyAlcohols.AddRangeAsync(partyAlcohols);
        await context.SaveChangesAsync();
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> AddHighAlcoholsAsync(Guid partyId)
    {
        var party = await context.Parties.FirstOrDefaultAsync(x => x.Id == partyId);
        
        if (party == null)
        {
            throw new Exception("Party not found");
        }
        
        var hAlcohols = await context.Alcohols
            .Where(x => x.Type == AlcoType.HighAlcohol)
            .ToListAsync();
        
        var partyAlcohols = new List<PartyAlcohol>();
        
        foreach (var hAlcohol in hAlcohols)
        {
            var partyAlcohol = new PartyAlcohol
            {
                PartyId = partyId,
                AlcoholId = hAlcohol.Id,
                Party = party,
                Alcohol = hAlcohol
            };
            
            partyAlcohols.Add(partyAlcohol);
        }
        
        await context.PartyAlcohols.AddRangeAsync(partyAlcohols);
        await context.SaveChangesAsync();
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> DeleteLiqoursAsync(Guid partyId)
    {
        var partyAlcohols = await context.PartyAlcohols
            .Where(x => x.PartyId == partyId)
            .Include(x => x.Alcohol)
            .Where(x => x.Alcohol.Type == AlcoType.Liquor)
            .ToListAsync();
        
        context.PartyAlcohols.RemoveRange(partyAlcohols);
        await context.SaveChangesAsync();
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> DeleteLowAlcoholsAsync(Guid partyId)
    {
        var partyAlcohols = await context.PartyAlcohols
            .Where(x => x.PartyId == partyId)
            .Include(x => x.Alcohol)
            .Where(x => x.Alcohol.Type == AlcoType.LowAlcohol)
            .ToListAsync();
        
        context.PartyAlcohols.RemoveRange(partyAlcohols);
        await context.SaveChangesAsync();
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> DeleteMidAlcoholsAsync(Guid partyId)
    {
        var partyAlcohols = await context.PartyAlcohols
            .Where(x => x.PartyId == partyId)
            .Include(x => x.Alcohol)
            .Where(x => x.Alcohol.Type == AlcoType.MidlAlcohol)
            .ToListAsync();
        
        context.PartyAlcohols.RemoveRange(partyAlcohols);
        await context.SaveChangesAsync();
        return partyAlcohols;
    }

    public async Task<ICollection<PartyAlcohol>> DeleteHighAlcoholsAsync(Guid partyId)
    {
        var partyAlcohols = await context.PartyAlcohols
            .Where(x => x.PartyId == partyId)
            .Include(x => x.Alcohol)
            .Where(x => x.Alcohol.Type == AlcoType.HighAlcohol)
            .ToListAsync();
        
        context.PartyAlcohols.RemoveRange(partyAlcohols);
        await context.SaveChangesAsync();
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