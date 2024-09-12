using AlcoStack.Data;
using AlcoStack.Interface;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Service;

public class AlcoholRankingService(AppDataContext context) : IAlcoholRankingService
{
    public async Task SetAlcoholRanksForParty(Guid partyId, int rankLimit)
    {
        // Get all the alcohols associated with the party
        var partyAlcohols = await context.PartyAlcohols
            .Where(pa => pa.PartyId == partyId)
            .ToListAsync();

        // Get the average rating for each alcohol
        var alcoholRatings = await context.UserAlcohols
            .Where(ua => partyAlcohols.Select(pa => pa.AlcoholId).Contains(ua.AlcoholId))
            .GroupBy(ua => ua.AlcoholId)
            .Select(g => new
            {
                AlcoholId = g.Key,
                AverageRating = g.Average(ua => ua.Rating)
            })
            .OrderByDescending(ar => ar.AverageRating)
            .Take(rankLimit)  // Limit to the number of top alcohols to rank
            .ToListAsync();

        // Assign rank based on the order of the ratings
        int rank = 1;
        foreach (var alcoholRating in alcoholRatings)
        {
            var partyAlcohol = partyAlcohols.FirstOrDefault(pa => pa.AlcoholId == alcoholRating.AlcoholId);
            if (partyAlcohol != null)
            {
                partyAlcohol.Rank = rank++;
            }
        }

        // Set rank = 0 for alcohols that are not in the top rankLimit
        foreach (var partyAlcohol in partyAlcohols)
        {
            if (alcoholRatings.All(ar => ar.AlcoholId != partyAlcohol.AlcoholId))
            {
                partyAlcohol.Rank = 0;
            }
        }

        // Save the changes to the database
        await context.SaveChangesAsync();
    }
}
