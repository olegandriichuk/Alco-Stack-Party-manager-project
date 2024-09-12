using AlcoStack.Data;
using AlcoStack.Dtos;
using AlcoStack.Interface;
using AlcoStack.Models;
using AlcoStack.Mappers;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Repositories;

public class UserRepository(AppDataContext context) : IUserRepository
{
    public async Task<User> UpdateAsync(string userName, UpdateUserDto user)
    {
        var existingUser = await context.Users.Include(x => x.Address).FirstOrDefaultAsync(user => user.UserName == userName);
        if (existingUser == null)
        {
            throw new Exception("User not found");
        }
        
        existingUser.UpdatedDate = DateTime.Now;
        existingUser.CreatedDate = existingUser.CreatedDate;
        existingUser.FirstName = user.FirstName;
        existingUser.LastName = user.LastName;
        existingUser.Bio = user.Bio;
        existingUser.DateOfBirth = user.DateOfBirth;
        existingUser.PhoneNumber = user.PhoneNumber;
        if (user.Address != null)
        {
            existingUser.Address.StreetAddress = user.Address.StreetAddress;
            existingUser.Address.City = user.Address.City;
            existingUser.Address.PostalCode = user.Address.PostalCode;
            
        }
        context.Users.Update(existingUser);
        await context.SaveChangesAsync();
        return existingUser;
    }
    
    public async Task<User?> GetAsync(string userName)
    {
        var user = await context.Users.FirstOrDefaultAsync(user => user.UserName == userName);
        if (user == null)
        {
            throw new Exception("User not found");
        }
        return user;
    }
    
    public async Task<List<User>> GetAllAsync()
    {
        return await context.Users.ToListAsync();
    }
    
    public async Task<User?> DeleteAsync(string userName)
    {
        var user = await context.Users.FirstOrDefaultAsync(user => user.UserName == userName);
        if (user == null)
        {
            throw new Exception("User not found");
        }
        context.Users.Remove(user);
        await context.SaveChangesAsync();
        return user;
    }
}