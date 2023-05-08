using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
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

        public Project GetProjectById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Title, Deadline, CategoryId, UserId 
                                        FROM Project
                                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        while (reader.Read())
                        {
                            var project = new Project()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Deadline = DbUtils.GetDateTime(reader, "Deadline"),
                                CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),

                            };
                        return project;

                        }

                        return null;
                    }

                }
            }
        }

        public void AddProject(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Project (Title, Deadline, CategoryId, UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@title, @deadline, @categoryId, @userId)";

                    DbUtils.AddParameter(cmd, "@id", project.Id);
                    DbUtils.AddParameter(cmd, "@title", project.Title);
                    DbUtils.AddParameter(cmd, "@deadline", project.Deadline);
                    DbUtils.AddParameter(cmd, "@categoryId", project.CategoryId);
                    DbUtils.AddParameter(cmd, "@userId", project.UserId);

                    project.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteProject(int id) {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Project WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void EditProject(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Project
                                        SET Title  = @title,
                                            Deadline = @deadline,
                                            CategoryId = @categoryId, 
                                            UserId = @userId                                            
                                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", project.Id);
                    DbUtils.AddParameter(cmd, "@title", project.Title);
                    DbUtils.AddParameter(cmd, "@deadline", project.Deadline);
                    DbUtils.AddParameter(cmd, "@categoryId", project.CategoryId);
                    DbUtils.AddParameter(cmd, "@userId", project.UserId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
