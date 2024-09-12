using AlcoStack.Models;
using AlcoStack.Interface;
using AlcoStack.Dtos;
using AlcoStack.Data;
using AlcoStack.Enums;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Repositories;

public class AlcoholRepository(AppDataContext context) : IAlcoholRepository
{
    public async Task<Alcohol?> GetAlcoholByIdAsync(Guid id)
    {
        return await context.Alcohols.FirstOrDefaultAsync(x => x.Id == id); 
    }

    public async Task<Alcohol?> GetAlcoholByNameAsync(string name)
    {
        return await context.Alcohols.FirstOrDefaultAsync(x => x.Name == name);
    }

    public async Task<Alcohol?> CreateAlcoholAsync(Alcohol alcohol)
    {
        await context.Alcohols.AddAsync(alcohol);
        await context.SaveChangesAsync();
        return alcohol;
    }

    public async Task<Alcohol?> UpdateAlcoholAsync(Guid id, Alcohol alcohol)
    {
        var existingAlcohol = await context.Alcohols.FirstOrDefaultAsync(x => x.Id == id);
        
        if (existingAlcohol == null)
        {
            throw new Exception("Alcohol not found");
        }
        
        existingAlcohol.Name = alcohol.Name;
        existingAlcohol.Type = alcohol.Type;
        existingAlcohol.Description = alcohol.Description;
        existingAlcohol.Type = alcohol.Type;
        
        context.Alcohols.Update(existingAlcohol);
        await context.SaveChangesAsync();
        return existingAlcohol;
    }

    public async Task<ICollection<Alcohol>?> GetAllAsync()
    {
        return await context.Alcohols.ToListAsync();
    }

    public async Task<ICollection<Alcohol>?> GetAlcoholsByTypeAsync(AlcoType type)
    {
        return await context.Alcohols.Where(x => x.Type == type).ToListAsync();
    }

    public async Task<Alcohol?> DeleteAlcoholAsync(Guid id)
    {
        var existingAlcohol = await context.Alcohols.FirstOrDefaultAsync(x => x.Id == id);
        
        if (existingAlcohol == null)
        {
            throw new Exception("Alcohol not found");
        }
        
        context.Alcohols.Remove(existingAlcohol);
        await context.SaveChangesAsync();
        return existingAlcohol;
    }
}