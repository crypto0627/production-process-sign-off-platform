using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;

public class PasswordHashService<TUser> : IPasswordHasher<TUser> where TUser : class
{
    public string HashPassword(TUser user, string password)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashedBytes);
    }

    public PasswordVerificationResult VerifyHashedPassword(TUser user, string hashedPassword, string providedPassword)
    {
        var providedPasswordHash = HashPassword(user, providedPassword);
        return hashedPassword.Equals(providedPasswordHash)
            ? PasswordVerificationResult.Success
            : PasswordVerificationResult.Failed;
    }
}
