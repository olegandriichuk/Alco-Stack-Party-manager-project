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
        public UserController(UserManager<User> userManager, ITokenService tokenService, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized("Invalid username!");

            var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Username not found and/or password incorrect");

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user)
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
                LastName = registerDto.LastName
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
                        State = registerDto.Address.State,
                        Country = registerDto.Address.Country,
                        PostalCode = registerDto.Address.PostalCode
                    };
                    user.Address = address;
                }

                var token = _tokenService.CreateToken(user);

                var newUserDto = new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = token,
                    // Address = user.Address.MapToModel(),
                    DateOfBirth = user.DateOfBirth,
                    CreatedDate = user.CreatedDate,
                    UpdatedDate = user.UpdatedDate,
                    Phone = user.PhoneNumber,
                    Photo = user.Photo,
                    Bio = user.Bio,
                    Gender = user.Gender
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
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            return Ok(user);
        }
        
        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateUser(string username, [FromBody] UpdateUserDto userDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);
            
            if (user == null)
                return NotFound();
            
            user.FirstName = userDto.FirstName;
            user.LastName = userDto.LastName;
            user.Bio = userDto.Bio;
            user.DateOfBirth = userDto.DateOfBirth;
            user.Photo = userDto.Photo;
            user.PhoneNumber = userDto.Phone;
            if (userDto.Address != null)
            {
                user.Address.StreetAddress = userDto.Address.StreetAddress;
                user.Address.City = userDto.Address.City;
                user.Address.State = userDto.Address.State;
                user.Address.PostalCode = userDto.Address.PostalCode;
            }
            
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