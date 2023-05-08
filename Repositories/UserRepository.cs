using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tasker.Models;
using Tasker.Utils;

namespace Tasker.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }

        public List<User> GetAll()
        {
           using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, DisplayName, Email, FirebaseUserId
                    FROM [User] u 
                  
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var users = new List<User>();
                        while (reader.Read())
                        {
                            users.Add(new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                
                            });
                        }

                        return users;
                    }
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, DisplayName, Email, FirebaseUserId
                    FROM [User] u 
                    WHERE Id = @id
                    ";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            User user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId")
                            };
                        
                            return user;
                        }
                    }
                    return null;
                }
            }
        }

        public User GetByFirebase(string id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, DisplayName, Email, FirebaseUserId
                    FROM [User]
                    WHERE FirebaseUserId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {

                            User user = new User()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId")
                            };

                            return user;
                        }
                    }
                    return null;
                }
            }
        }

        public void AddUser(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO User (DisplayName, Email, FirebaseUserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@displayName, @email, @firebaseUserId) ";

                    DbUtils.AddParameter(cmd, "@displayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@email", user.Email);
                    DbUtils.AddParameter(cmd, "@firebaseUserId", user.FirebaseUserId);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
