using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface IProjectRepository
    {
        void AddProject(Project project);
        void DeleteProject(int id);
        void EditProject(Project project);
        List<Project> GetAll();
        Project GetProjectById(int id);
    }
}