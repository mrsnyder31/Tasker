using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
    }
}