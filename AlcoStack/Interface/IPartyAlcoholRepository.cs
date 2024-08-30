using AlcoStack.Models;
using AlcoStack.Dtos;

namespace AlcoStack.Interface;

public interface IPartyAlcoholRepository
{
    
    Task<PartyAlcohol> AddAsync(Guid partyId, Guid alcoholId);
    Task<PartyAlcohol?> DeleteAsync(Guid partyId, Guid alcoholId);
    Task<ICollection<Alcohol>> GetAlcoholsByPartyIdAsync(Guid partyId);
    
    Task<ICollection<PartyAlcohol>> UpdateVolumeAsync(Guid partyId, Guid alcoholId, int volume);
    Task<ICollection<PartyAlcohol>> UpdateRatingAsync(Guid partyId, Guid alcoholId, int rating);
    Task<ICollection<PartyAlcohol>> GetAllAsync();
}