using System;

namespace Tasker.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Deadline { get; set; }
        public int CategoryId { get; set; }
        public int UserId { get; set; }
        public User Me { get; set; }

    }
}
