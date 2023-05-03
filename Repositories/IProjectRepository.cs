using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface IProjectRepository
    {
        List<Project> GetAll();
    }
}