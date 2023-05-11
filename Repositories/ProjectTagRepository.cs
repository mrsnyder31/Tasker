using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tasker.Models;
using Tasker.Utils;

namespace Tasker.Repositories
{
    public class ProjectTagRepository : BaseRepository, IProjectTagRepository
    {
        public ProjectTagRepository(IConfiguration configuration) : base(configuration) { }

        public List<ProjectTag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd =  conn.CreateCommand())
                {
                    cmd.CommandText = @"Select Id, ProjectId, TagId, TaskId
                                        FROM ProjectTag";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tags = new List<ProjectTag>();
                        while (reader.Read())
                        {
                            tags.Add(new ProjectTag()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                                TagId = DbUtils.GetInt(reader, "TagId"),
                                TaskId = DbUtils.GetInt(reader, "TaskId")
                            });
                        }
                        return tags;
                    };
                }
            }
        }

        public void AddProjectTag(ProjectTag projectTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd  = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ProjectTag (ProjectId, TagId, TaskId) 
                                        OUTPUT INSERTED.ID 
                                        VALUES (@projectId, @tagId, @taskId)";

                    DbUtils.AddParameter(cmd, "@projectId", projectTag.ProjectId);
                    DbUtils.AddParameter(cmd, "@tagId", projectTag.TagId);
                    DbUtils.AddParameter(cmd, "@taskId", projectTag.TaskId);

                   projectTag.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteProjectTag(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using(var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM ProjectTag WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
