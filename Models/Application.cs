
using System;
using System.Collections.Generic;

namespace Server.Models
{
    public class Application
    {
        public int ID {get; set;}
        public string FirstName {get; set;}
        public string LastName {get; set;}
        public string DateOfBirth {get; set;}
        public string City {get; set;}
        public Gadgets Gadgets {get; set;}
    }
}