﻿using AlcoStack.Dtos;
using AlcoStack.Extensions;
using AlcoStack.Interface;
using AlcoStack.Models;
using AlcoStack.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AlcoStack.Controllers;

    [Route("api/account")]
    [ApiController]
    public class UserController(
        UserManager<User> userManager,
        ITokenService tokenService,
        SignInManager<User> signInManager,
        ILogger<UserController> logger,
        IUserAlcoholRepository userAlcoholRepository,
        IUserPartyRepository userPartyRepository,
        IFileService fileService)
        : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username!");

            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Token = tokenService.CreateToken(user),
                    Gender = user.Gender,
                    DateOfBirth = user.DateOfBirth,
                    Address = user.Address.MapToDto(),
                    Phone = user.PhoneNumber,
                    Photo = user.Photo,
                    Bio = user.Bio,
                    CreatedDate = user.CreatedDate,
                    UpdatedDate = user.UpdatedDate,
                    BackgroundPhoto = user.BackgroundPhoto
                }
            );
        } 
    
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (registerDto.PhotoFile != null)
            {

                var photoFileResult = fileService.SaveImage(registerDto.PhotoFile);

                if (photoFileResult.Item1 == 1)
                    registerDto.Photo = photoFileResult.Item2;
                else
                    return StatusCode(500, photoFileResult.Item2);
            }

            if (registerDto.BackgroundPhotoFile != null)
            {
                var backgroundPhotoFileResult = fileService.SaveImage(registerDto.BackgroundPhotoFile);

                if (backgroundPhotoFileResult.Item1 == 1)
                    registerDto.BackgroundPhoto = backgroundPhotoFileResult.Item2;
                else
                    return StatusCode(500, backgroundPhotoFileResult.Item2);
            }

            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                DateOfBirth = registerDto.DateOfBirth,
                // Address = registerDto.Address,
                Gender = registerDto.Gender,
                PhoneNumber = registerDto.Phone,
                Photo = registerDto.Photo,
                Bio = registerDto.Bio,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                BackgroundPhoto = registerDto.BackgroundPhoto
            };

            try
            {
                var createdUserResult = await userManager.CreateAsync(user, registerDto.Password);

                if (!createdUserResult.Succeeded)
                {
                    return StatusCode(500, createdUserResult.Errors);
                }

                var roleResult = await userManager.AddToRoleAsync(user, "User");

                if (!roleResult.Succeeded)
                {
                    await userManager.DeleteAsync(user);
                    return StatusCode(500, roleResult.Errors);
                }
                
                if(registerDto.Address != null)
                {
                    var address = new Address
                    {
                        StreetAddress = registerDto.Address.StreetAddress,
                        City = registerDto.Address.City,
                        Country = registerDto.Address.Country,
                        PostalCode = registerDto.Address.PostalCode,
                        UserName = registerDto.Username
                    };
                    user.Address = address;
                }
                
                await userManager.UpdateAsync(user);

                var token = tokenService.CreateToken(user);
                
                await userAlcoholRepository.AddAllAlcoholsAsync(user.UserName);

                var newUserDto = new NewUserDto
                {
                    UserName = user.UserName,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    Email = user.Email,
                    Token = token,
                    Address = user.Address.MapToDto(),
                    DateOfBirth = user.DateOfBirth,
                    CreatedDate = user.CreatedDate,
                    UpdatedDate = user.UpdatedDate,
                    Phone = user.PhoneNumber,
                    Photo = user.Photo,
                    Bio = user.Bio,
                    Gender = user.Gender,
                    BackgroundPhoto = user.BackgroundPhoto
                };

                return Ok(newUserDto);
            }
            catch (Exception e)
            {
                // Optionally, log the exception here
                return StatusCode(500, e.Message);
            }
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var users = await userManager.Users.ToListAsync();
            
            return Ok(users);
        }
        
        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            return Ok(user);
        }
        
        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var username = User.GetUsername();
            var user = await userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            return Ok(user);
        }
        
        [HttpPut("update")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto userDto)
        {
            
            logger.LogInformation("Received token: {Token}", Request.Headers["Authorization"]);

            try
            {
                var username = User.GetUsername();
                // Additional logging
                logger.LogInformation("Username from token: {Username}", username);

                // Your existing code...
            }
            catch (Exception ex)
            {
                logger.LogError("Error during token validation: {Exception}", ex);
                return StatusCode(500, "Internal server error");
            }
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var username1 = User.GetUsername();
            var currentUser = await userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.UserName == username1);
    
            if (currentUser == null)
                return Unauthorized();
    
            // Ensure the email in the DTO matches the current user's email
            if (currentUser.Email != userDto.Email)
                return Forbid();
    
            // Update username if it has changed
            if (currentUser.UserName != userDto.Username)
            {
                var setUsernameResult = await userManager.SetUserNameAsync(currentUser, userDto.Username);
                if (!setUsernameResult.Succeeded)
                    return BadRequest(setUsernameResult.Errors);
            }
    
            currentUser.FirstName = userDto.FirstName;
            currentUser.LastName = userDto.LastName;
            currentUser.Bio = userDto.Bio;
            currentUser.DateOfBirth = userDto.DateOfBirth;
            currentUser.PhoneNumber = userDto.PhoneNumber;
            currentUser.Gender = userDto.Gender;
            if (userDto.Address != null)
            {
                currentUser.Address.StreetAddress = userDto.Address.StreetAddress;
                currentUser.Address.City = userDto.Address.City;
                currentUser.Address.PostalCode = userDto.Address.PostalCode;
                currentUser.Address.Country = userDto.Address.Country;
            }
    
            var result = await userManager.UpdateAsync(currentUser);
    
            if (result.Succeeded)
                return Ok(currentUser);
    
            return StatusCode(500, result.Errors);
        }
        
        [HttpPatch("updatePhoto")]
        [Authorize]
        public async Task<IActionResult> UpdatePhoto([FromForm] UpdateUserPhotoDto photoDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
    
            var username = User.GetUsername();
            var user = await userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.UserName == username);
    
            if (user == null)
                return NotFound();
    
            if (photoDto.PhotoFile != null)
            {
                var photoFileResult = fileService.SaveImage(photoDto.PhotoFile);
        
                if (photoFileResult.Item1 == 1)
                    user.Photo = photoFileResult.Item2;
                else
                    return StatusCode(500, photoFileResult.Item2);
            }
    
            if (photoDto.BackgroundPhotoFile != null)
            {
                var backgroundPhotoFileResult = fileService.SaveImage(photoDto.BackgroundPhotoFile);
        
                if (backgroundPhotoFileResult.Item1 == 1)
                    user.BackgroundPhoto = backgroundPhotoFileResult.Item2;
                else
                    return StatusCode(500, backgroundPhotoFileResult.Item2);
            }
    
            var result = await userManager.UpdateAsync(user);
    
            if (result.Succeeded)
                return Ok(user);
    
            return StatusCode(500, result.Errors);
        }

        [HttpGet("{partyId}/users")]
        public async Task<IActionResult> GetUsersByPartyId(Guid partyId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var users = await userPartyRepository.GetUsersByPartyIdAsync(partyId);
            
            return Ok(users);
        }
        
        [HttpPost("{userName}/addAlcohol/{alcoholId}")]
        public async Task<IActionResult> AddUserAlcohol(string userName, Guid alcoholId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
        
            return Ok(await userAlcoholRepository.AddAsync(userName, alcoholId));
        }
        
        [HttpPatch("{userName}/update-volume/{alcoholId}")]
        public async Task<IActionResult> UpdateVolume(string userName, Guid alcoholId, [FromBody] int volume)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
        
            return Ok(await userAlcoholRepository.UpdateVolumeAsync(userName, alcoholId, volume));
        }
       
    
        [HttpPatch("{userName}/update-rating/{alcoholId}")]
        public async Task<IActionResult> UpdateRating(string userName, Guid alcoholId, [FromBody] int rating)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
        
            return Ok(await userAlcoholRepository.UpdateRatingAsync(userName, alcoholId, rating));
        }
        
        [HttpDelete("{userName}/delete/{alcoholId}")]
        public async Task<IActionResult> DeleteUserAlcohol(string userName, Guid alcoholId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var userAlcohol = await userAlcoholRepository.DeleteAsync(userName, alcoholId);
            
            if (userAlcohol == null)
                return NotFound();
            
            return Ok(userAlcohol);
        }
        
        
        
        [Authorize]
        [HttpDelete("{partyId}LeaveParty")]
        public async Task<IActionResult> LeaveParty(Guid partyId)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var username = User.GetUsername();
            var userParty = await userPartyRepository.DeleteAsync(username, partyId);
            
            if (userParty == null)
                return NotFound();
            
            return Ok(userParty);
        }
        
        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            var result = await userManager.DeleteAsync(user);
            
            if (result.Succeeded)
                return Ok();
            
            return StatusCode(500, result.Errors);
        }
    }