using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using AlcoStack.Data;
using AlcoStack.Models;
using AlcoStack.Enums; // Ensure this namespace contains AlcoType

namespace AlcoStack
{
    public class Seed
    {
        private readonly AppDataContext context;

        public Seed(AppDataContext context)
        {
            this.context = context;
        }

        public void SeedData()
        {
            // Ensure the database is created
            context.Database.EnsureCreated();

            // Check if there is already data in the Alcohol table
            if (!context.Alcohols.Any())
            {
                var alcohols = new List<Alcohol>
                {
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Light rum",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/light_rum.jpg",
                        Description = "A type of rum with a lighter flavor profile."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Bourbon",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/bourbon.jpg",
                        Description = "A type of American whiskey made primarily from corn."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Vodka",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/vodka.jpg",
                        Description = "A distilled alcoholic drink made from fermented grains or potatoes."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Gin",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/gin.jpg",
                        Description = "A distilled alcoholic drink flavored with juniper berries."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Blended whiskey",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/blended_whiskey.jpg",
                        Description = "A type of whiskey made by blending different whiskey types."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Tequila",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/tequila.jpg",
                        Description = "A Mexican spirit made from the blue agave plant."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Sweet Vermouth",
                        Type = AlcoType.MidlAlcohol,
                        Photo = "https://example.com/photos/sweet_vermouth.jpg",
                        Description = "A fortified wine flavored with various botanicals."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Apricot brandy",
                        Type = AlcoType.Liquor,
                        Photo = "https://example.com/photos/apricot_brandy.jpg",
                        Description = "A type of brandy flavored with apricot."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Triple sec",
                        Type = AlcoType.Liquor,
                        Photo = "https://example.com/photos/triple_sec.jpg",
                        Description = "A type of orange-flavored liqueur."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Southern Comfort",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/southern_comfort.jpg",
                        Description = "A fruit-flavored liqueur with a whiskey base."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Brandy",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/brandy.jpg",
                        Description = "A distilled alcoholic drink made from fermented fruit juice."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Lemon vodka",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/lemon_vodka.jpg",
                        Description = "Vodka flavored with lemon."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Dry Vermouth",
                        Type = AlcoType.MidlAlcohol,
                        Photo = "https://example.com/photos/dry_vermouth.jpg",
                        Description = "A type of fortified wine with a dry flavor."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Dark rum",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/dark_rum.jpg",
                        Description = "A type of rum with a dark color and rich flavor."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Amaretto",
                        Type = AlcoType.Liquor,
                        Photo = "https://example.com/photos/amaretto.jpg",
                        Description = "An almond-flavored liqueur."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Applejack",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/applejack.jpg",
                        Description = "A type of American apple brandy."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Champagne",
                        Type = AlcoType.MidlAlcohol,
                        Photo = "https://example.com/photos/champagne.jpg",
                        Description = "A sparkling wine produced in the Champagne region of France."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Scotch",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/scotch.jpg",
                        Description = "A type of whisky made in Scotland."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Coffee liqueur",
                        Type = AlcoType.Liquor,
                        Photo = "https://example.com/photos/coffee_liqueur.jpg",
                        Description = "A liqueur flavored with coffee."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Añejo rum",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/anejo_rum.jpg",
                        Description = "A type of aged rum."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Kahlua",
                        Type = AlcoType.Liquor,
                        Photo = "https://example.com/photos/kahlua.jpg",
                        Description = "A coffee-flavored liqueur."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Dubonnet Rouge",
                        Type = AlcoType.MidlAlcohol,
                        Photo = "https://example.com/photos/dubonnet_rouge.jpg",
                        Description = "A type of fortified wine with a rich flavor."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Irish whiskey",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/irish_whiskey.jpg",
                        Description = "A smooth whiskey made in Ireland."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Apple brandy",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/apple_brandy.jpg",
                        Description = "A type of brandy made from apples."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Prosecco",
                        Type = AlcoType.MidlAlcohol,
                        Photo = "https://example.com/photos/prosecco.jpg",
                        Description = "An Italian sparkling wine."
                    },
                    new Alcohol
                    {
                        Id = Guid.NewGuid(),
                        Name = "Cognac",
                        Type = AlcoType.HighAlcohol,
                        Photo = "https://example.com/photos/cognac.jpg",
                        Description = "A type of brandy from the Cognac region in France."
                    }
                };

                context.Alcohols.AddRange(alcohols);
                context.SaveChanges();
            }
        }
    }
}
