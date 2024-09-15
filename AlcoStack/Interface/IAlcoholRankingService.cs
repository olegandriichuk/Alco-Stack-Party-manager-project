namespace AlcoStack.Interface;

public interface IAlcoholRankingService
{
    Task SetAlcoholRanksForParty(Guid partyId, int rankLimit);
}
