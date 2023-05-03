using System;

namespace Tasker.Models
{
    public class Task
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTime Deadline { get; set; }
        public bool IsCompleted { get; set; }
        public int ProjectId { get; set; }
    }
}
