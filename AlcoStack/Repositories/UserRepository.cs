using AlcoStack.Data;
using AlcoStack.Dtos;
using AlcoStack.Interface;
using AlcoStack.Models;
using AlcoStack.Mappers;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDataContext _context;
    
    public UserRepository(AppDataContext context)
    {
        _context = context;
    }
    
    public async Task<User> UpdateAsync(string UserName, UpdateUserDto user)
    {
        var existingUser = await _context.Users.FirstOrDefaultAsync(user => user.UserName == UserName);
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
        existingUser.Photo = user.Photo;
        existingUser.PhoneNumber = user.Phone;
        existingUser.FormBackgroundUrl = user.FormBackgroundUrl;
        if (user.Address != null)
        {
            existingUser.Address.StreetAddress = user.Address.StreetAddress;
            existingUser.Address.City = user.Address.City;
            existingUser.Address.PostalCode = user.Address.PostalCode;
            
        }
        _context.Users.Update(existingUser);
        await _context.SaveChangesAsync();
        return existingUser;
    }
    
    public async Task<User?> GetAsync(string UserName)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == UserName);
        if (user == null)
        {
            throw new Exception("User not found");
        }
        return user;
    }
    
    public async Task<List<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }
    
    public async Task<User> DeleteAsync(string UserName)
    {
        var user = await _context.Users.FirstOrDefaultAsync(user => user.UserName == UserName);
        if (user == null)
        {
            throw new Exception("User not found");
        }
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return user;
    }
}