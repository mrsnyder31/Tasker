using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface ITaskRepository
    {
        void AddTask(Task task);
        void DeleteTask(int id);
        void EditTask(Task task);
        List<Task> GetAll();
    }
}