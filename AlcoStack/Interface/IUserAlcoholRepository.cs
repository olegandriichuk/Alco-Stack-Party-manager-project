using AlcoStack.Models;


namespace AlcoStack.Interface;

public interface IUserAlcoholRepository
{
    Task<UserAlcohol> AddAsync(string userName, Guid alcoholId);
    
    Task<ICollection<UserAlcohol>> AddAllAlcoholsAsync(string userName);
    Task<UserAlcohol?> DeleteAsync(string userName, Guid alcoholId);
    Task<ICollection<Alcohol>> GetAlcoholsByUserNameAsync(string userName);
    Task<UserAlcohol> UpdateVolumeAsync(string userName, Guid alcoholId, int volume);
    Task<UserAlcohol> UpdateRatingAsync(string userName, Guid alcoholId, int rating);
    Task<ICollection<UserAlcohol>> GetAllAsync();
}