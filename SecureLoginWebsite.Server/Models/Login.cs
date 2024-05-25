using System.ComponentModel.DataAnnotations;

namespace SecureLoginWebsite.Server.Models
{
    public class Login
    {
        public string? Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required(ErrorMessage = "The Password field is required.")]
        public string Password { get; set; }

        public bool Rememer { get; set; }
    }
}
