namespace AlcoStack.Models
{
    public class Address 
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string? StreetAddress { get; set; }
        public string? City { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        
        public User User { get; set; }
    }
}