using AlcoStack.Dtos;
using AlcoStack.Models;

namespace AlcoStack.Interface;

public interface IUserRepository
{
    Task<User> UpdateAsync(string UserName, UpdateUserDto user);
    Task<User?> GetAsync(string UserName);
    
    Task<List<User>> GetAllAsync();
    
    Task<User?> DeleteAsync(string UserName);
    
}