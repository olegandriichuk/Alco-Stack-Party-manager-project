using AlcoStack.Models;

namespace AlcoStack.Interface;

public interface ITokenService
{
    string CreateToken(User user);
}