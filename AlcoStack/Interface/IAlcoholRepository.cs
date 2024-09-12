using AlcoStack.Models;
using AlcoStack.Enums;

namespace AlcoStack.Interface;

public interface IAlcoholRepository
{
    Task<Alcohol?> GetAlcoholByIdAsync(Guid id);
    Task<Alcohol?> GetAlcoholByNameAsync(string name);
    Task<Alcohol?> CreateAlcoholAsync(Alcohol alcohol);
    Task<Alcohol?> UpdateAlcoholAsync(Guid id, Alcohol alcohol);
    Task<ICollection<Alcohol>?> GetAllAsync();  
    Task<ICollection<Alcohol>?> GetAlcoholsByTypeAsync(AlcoType type);
    Task<Alcohol?> DeleteAlcoholAsync(Guid id);
}