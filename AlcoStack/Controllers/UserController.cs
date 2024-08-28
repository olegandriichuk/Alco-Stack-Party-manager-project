using AlcoStack.Dtos;
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
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<User> _signinManager;
        private readonly ILogger<UserController> _logger;
        public UserController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager, ILogger<UserController> logger)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username!");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Token = _tokenService.CreateToken(user),
                    Gender = user.Gender,
                    DateOfBirth = user.DateOfBirth,
                    Address = AddressMapper.MapToDto(user.Address),
                    Phone = user.PhoneNumber,
                    Photo = user.Photo,
                    Bio = user.Bio,
                    CreatedDate = user.CreatedDate,
                    UpdatedDate = user.UpdatedDate,
                    FormBackgroundUrl = user.FormBackgroundUrl
                }
            );
        } 
    
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

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
                FormBackgroundUrl = registerDto.FormBackgroundUrl
            };

            try
            {
                var createdUserResult = await _userManager.CreateAsync(user, registerDto.Password);

                if (!createdUserResult.Succeeded)
                {
                    return StatusCode(500, createdUserResult.Errors);
                }

                var roleResult = await _userManager.AddToRoleAsync(user, "User");

                if (!roleResult.Succeeded)
                {
                    await _userManager.DeleteAsync(user);
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
                
                await _userManager.UpdateAsync(user);

                var token = _tokenService.CreateToken(user);

                var newUserDto = new NewUserDto
                {
                    UserName = user.UserName,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    Email = user.Email,
                    Token = token,
                    Address = AddressMapper.MapToDto(user.Address),
                    DateOfBirth = user.DateOfBirth,
                    CreatedDate = user.CreatedDate,
                    UpdatedDate = user.UpdatedDate,
                    Phone = user.PhoneNumber,
                    Photo = user.Photo,
                    Bio = user.Bio,
                    Gender = user.Gender,
                    FormBackgroundUrl = user.FormBackgroundUrl
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
            
            var users = await _userManager.Users.ToListAsync();
            
            return Ok(users);
        }
        
        [HttpGet("{username}")]
        public async Task<IActionResult> GetByUsername(string username)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            return Ok(user);
        }
        
        [HttpGet("user")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var username = User.GetUsername();
            var user = await _userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            return Ok(user);
        }
        
        [HttpPut("update")]
        [Authorize]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto userDto)
        {
            
            _logger.LogInformation("Received token: {Token}", Request.Headers["Authorization"]);

            try
            {
                var username = User.GetUsername();
                // Additional logging
                _logger.LogInformation("Username from token: {Username}", username);

                // Your existing code...
            }
            catch (Exception ex)
            {
                _logger.LogError("Error during token validation: {Exception}", ex);
                return StatusCode(500, "Internal server error");
            }
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var username1 = User.GetUsername();
            var currentUser = await _userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.UserName == username1);
    
            if (currentUser == null)
                return Unauthorized();
    
            // Ensure the email in the DTO matches the current user's email
            if (currentUser.Email != userDto.Email)
                return Forbid();
    
            // Update username if it has changed
            if (currentUser.UserName != userDto.Username)
            {
                var setUsernameResult = await _userManager.SetUserNameAsync(currentUser, userDto.Username);
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
    
            var result = await _userManager.UpdateAsync(currentUser);
    
            if (result.Succeeded)
                return Ok(currentUser);
    
            return StatusCode(500, result.Errors);
        }
        
        [HttpPatch("updatePhoto")]
        [Authorize]
        public async Task<IActionResult> UpdatePhoto([FromBody] UpdateUserPhotoDto  photoDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var username = User.GetUsername();
            var user = await _userManager.Users.Include(x => x.Address).FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            user.Photo = photoDto.Photo;
            user.FormBackgroundUrl = photoDto.FormBackgroundUrl;
            user.UpdatedDate = DateTime.Now;
            var result = await _userManager.UpdateAsync(user);
            
            if (result.Succeeded)
                return Ok(user);
            
            return StatusCode(500, result.Errors);
        }
        
        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            var result = await _userManager.DeleteAsync(user);
            
            if (result.Succeeded)
                return Ok();
            
            return StatusCode(500, result.Errors);
        }
    }