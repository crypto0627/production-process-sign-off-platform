using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SecureLoginWebsite.Server.Models;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SecureLoginWebsite.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SecureLoginWebsiteController(SignInManager<User> signInManager, UserManager<User> userManager) : Controller
    {
        private readonly SignInManager<User> _signInManager = signInManager;
        private readonly UserManager<User> _userManager = userManager;

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(User user)
        {
            string message = "";
            IdentityResult result= new();

            try
            {
                User user_ = new User()
                {
                    Name = user.Name,
                    Email = user.Email,
                    UserName = user.UserName,
                };

                // Hash the user's password
                var passwordHash = _userManager.PasswordHasher.HashPassword(user_, user.PasswordHash);
                user_.PasswordHash = passwordHash;

                // Create the user
                result = await _userManager.CreateAsync(user_);

                if (!result.Succeeded)
                {
                    return BadRequest(result.Errors);
                }

                message = "Registered Successfully.";
            }
            catch (Exception ex)
            {
                return BadRequest("Something went wrong, please try again. " + ex.Message);
            }

            return Ok(new { message = message, result = result });
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(Login login)
        {
            try
            {
                User user_ = await _userManager.FindByEmailAsync(login.Email);
                if (user_ != null)
                {
                    // Only update the username if it's provided in the login object
                    if (!string.IsNullOrEmpty(login.Username))
                    {
                        user_.UserName = login.Username;
                    }

                    if (!user_.EmailConfirmed)
                    {
                        user_.EmailConfirmed = true;
                    }

                    var result = await _signInManager.PasswordSignInAsync(user_, login.Password, login.Rememer, false);

                    if (!result.Succeeded)
                    {
                        return Unauthorized(new { message = "Invalid login attempt." });
                    }

                    user_.LastLogin = DateTime.Now;
                    var updateResult = await _userManager.UpdateAsync(user_);

                    return Ok(new { message = "Login Successful." });
                }
                else
                {
                    return BadRequest(new { message = "Unable to find user with provided email." });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }
        }

        [HttpGet("logout"), Authorize]
        public async Task<ActionResult> LogoutUser()
        {
            try
            {
                await _signInManager.SignOutAsync();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong, please try again. " });
            }

            return Ok(new { message = "Logout Successful" });
        }

        [HttpGet("admin"), Authorize]
        public ActionResult AdminPage()
        {
            string[] partners = { "Elon Musk", "Jeff Bezos", "Taylor Swift", "Bill Gates", "Mark Zuckerberg", "Joe Biden", "Putin" };

            return Ok(new { trustPartners = partners });
        }

        [HttpGet("home/{email}"), Authorize]
        public async Task<ActionResult> HomePage(string email)
        {
            User userInfo = await _userManager.FindByEmailAsync(email);
            if (userInfo == null)
            {
                return BadRequest(new { message = "Something went wrong, please try again." });
            }

            return Ok(new { userInfo = userInfo });
        }

        [HttpGet("xhtlekd")]
        public async Task<ActionResult> CheckUser()
        {
            User currentUser = new User();

            try
            {
                var user_ = HttpContext.User;
                var principal = new ClaimsPrincipal(user_);
                var result = _signInManager.IsSignedIn(principal);
                if (result)
                {
                    currentUser = await _signInManager.UserManager.GetUserAsync(principal);
                }
                else
                {
                    return Forbid();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Something went wrong, please try again. " });
            }

            return Ok(new { message = "Logged in", user = currentUser });
        }
    }
}
