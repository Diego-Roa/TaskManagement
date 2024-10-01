﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.Services.DTOs
{
    public class UserDTO
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
    }
}
