using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface IProjectTagRepository
    {
        void AddProjectTag(ProjectTag ProjectTag);
        void DeleteProjectTag(int id);
        List<ProjectTag> GetAll();
    }
}