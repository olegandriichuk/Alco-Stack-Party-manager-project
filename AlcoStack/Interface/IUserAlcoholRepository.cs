using AlcoStack.Models;


namespace AlcoStack.Interface;

public interface IUserAlcoholRepository
{
    Task<UserAlcohol> AddAsync(string userName, Guid alcoholId);
    Task<UserAlcohol?> DeleteAsync(string userName, Guid alcoholId);
    Task<ICollection<Alcohol>> GetAlcoholsByUserNameAsync(string userName);
    Task<ICollection<UserAlcohol>> UpdateVolumeAsync(string userName, Guid alcoholId, int volume);
    Task<ICollection<UserAlcohol>> UpdateRatingAsync(string userName, Guid alcoholId, int rating);
    Task<ICollection<UserAlcohol>> GetAllAsync();
}