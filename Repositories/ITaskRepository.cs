using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface ITaskRepository
    {
        void AddTask(Task task);
        List<Task> GetAll();
    }
}