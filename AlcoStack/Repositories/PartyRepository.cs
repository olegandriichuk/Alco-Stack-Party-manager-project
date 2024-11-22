using AlcoStack.Models;
using AlcoStack.Interface;
using AlcoStack.Dtos;
using AlcoStack.Data;
using AlcoStack.Mappers;
using Microsoft.EntityFrameworkCore;


namespace AlcoStack.Repositories;

public class PartyRepository(AppDataContext context,  IPartyAlcoholRepository partyAlcoholRepository, IAlcoholRankingService alcoholRankingService) : IPartyRepository
{

    public async Task<Party?> CreateAsync(Party party)
    {
        
        await context.Parties.AddAsync(party);
        await context.SaveChangesAsync();
        return party;
    }

    public async Task<Party?> UpdateAsync(Guid id, UpdatePartyDto party)
    {
        var existingParty = await context.Parties
            .Include(c => c.Creator) // Assuming 'Creator' is a navigation property
            .FirstOrDefaultAsync(x => x.Id == id);
        if (existingParty == null)
        {
            throw new Exception("Party not found");
        }

        existingParty.Photo = party.Photo;
        existingParty.Name = party.Name;
        existingParty.Description = party.Description;
        existingParty.date = party.date;
        existingParty.preparationDate = party.preparationDate;
        existingParty.Location = party.Location;
        if ((existingParty.Liquors != party.Liquors) && party.Liquors)
        {
            await partyAlcoholRepository.AddLiqoursAsync(existingParty.Id);
        }
        else if ((existingParty.Liquors != party.Liquors) && !party.Liquors)
        {
            await partyAlcoholRepository.DeleteLiqoursAsync(existingParty.Id);
        }
        existingParty.Liquors = party.Liquors;
        if ((existingParty.LowAlcohol != party.LowAlcohol) && party.LowAlcohol)
        {
            await partyAlcoholRepository.AddLowAlcoholsAsync(existingParty.Id);
        }
        else if ((existingParty.LowAlcohol != party.LowAlcohol) && !party.LowAlcohol)
        {
            await partyAlcoholRepository.DeleteLowAlcoholsAsync(existingParty.Id);
        }
        existingParty.LowAlcohol = party.LowAlcohol;
        if ((existingParty.MidAlcohol != party.MidAlcohol) && party.MidAlcohol)
        {
            await partyAlcoholRepository.AddMidAlcoholsAsync(existingParty.Id);
        }
        else if ((existingParty.MidAlcohol != party.MidAlcohol) && !party.MidAlcohol)
        {
            await partyAlcoholRepository.DeleteMidAlcoholsAsync(existingParty.Id);
        }
        existingParty.MidAlcohol = party.MidAlcohol;
        if ((existingParty.HighAlcohol != party.HighAlcohol) && party.HighAlcohol)
        {
            await partyAlcoholRepository.AddHighAlcoholsAsync(existingParty.Id);
        }
        else if ((existingParty.HighAlcohol != party.HighAlcohol) && !party.HighAlcohol)
        {
            await partyAlcoholRepository.DeleteHighAlcoholsAsync(existingParty.Id);
        }
        existingParty.HighAlcohol = party.HighAlcohol;
        existingParty.RankLimit = party.RankLimit;
        existingParty.UpdatedDate = DateTime.Now;
        
        

        
        context.Parties.Update(existingParty);
        await context.SaveChangesAsync();
        await alcoholRankingService.SetAlcoholRanksForParty(existingParty.Id, existingParty.RankLimit);
        return existingParty;
    }

    public async Task<Party?> GetByIdAsync(Guid id)
    {
        return await context.Parties.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<ICollection<Party>?> GetAllAsync()
    {
        return await context.Parties.ToListAsync();
    }
    

    public async Task<Party?> DeleteAsync(Guid id)
    {
        var existingParty = await context.Parties.FirstOrDefaultAsync(x => x.Id == id);
        if (existingParty == null)
        {
            throw new Exception("Party not found");
        }

        context.Parties.Remove(existingParty);
        await context.SaveChangesAsync();
        return existingParty;
    }
}