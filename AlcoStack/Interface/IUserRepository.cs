using AlcoStack.Dtos;
using AlcoStack.Models;

namespace AlcoStack.Interface;

public interface IUserRepository
{
    Task<User> UpdateAsync(string userName, UpdateUserDto user);
    Task<User?> GetAsync(string userName);
    
    Task<List<User>> GetAllAsync();
    
    Task<User?> DeleteAsync(string userName);
    
}