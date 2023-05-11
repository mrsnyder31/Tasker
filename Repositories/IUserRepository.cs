using System.Collections.Generic;
using Tasker.Models;

namespace Tasker.Repositories
{
    public interface IUserRepository
    {
        void AddUser(User user);
        List<User> GetAll();
        User GetByFirebase(string id);
        User GetById(int id);
    }
}