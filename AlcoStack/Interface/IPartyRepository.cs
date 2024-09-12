using AlcoStack.Models;
using AlcoStack.Dtos;

namespace AlcoStack.Interface;

public interface IPartyRepository
{
    Task<Party?> CreateAsync(Party party);
    Task<Party?> UpdateAsync(Guid id, UpdatePartyDto party);
    Task<Party?> GetByIdAsync(Guid id);
    Task<ICollection<Party>?> GetAllAsync();
    Task<Party?> DeleteAsync(Guid id);
}