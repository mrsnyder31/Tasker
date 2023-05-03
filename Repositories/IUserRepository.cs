using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
        User GetByFirebase(string id);
        User GetById(int id);
    }
}