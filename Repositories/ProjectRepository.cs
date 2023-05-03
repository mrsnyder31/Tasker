using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tasker.Models;
using Tasker.Utils;

namespace Tasker.Repositories
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }

        public List<Project> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Title, Deadline, CategoryId, UserId
                                        FROM Project";


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var projects = new List<Project>();
                        while (reader.Read())
                        {
                            projects.Add(new Project()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Deadline = DbUtils.GetDateTime(reader, "Deadline"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),

                            });
                        }

                        return projects;
                    }
                }
            }
        }
    }
}
