using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tasker.Models;
using Tasker.Utils;

namespace Tasker.Repositories
{
    public class TaskRepository : BaseRepository, ITaskRepository
    {
        public TaskRepository(IConfiguration configuration) : base(configuration) { }

        public List<Task> GetAll()
        {
           using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Content, Deadline, IsComplete, ProjectId FROM Task";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tasks = new List<Task>();
                        while (reader.Read())
                        {
                            tasks.Add(new Task()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Content = DbUtils.GetString(reader, "Content"),
                                Deadline = DbUtils.GetDateTime(reader, "Deadline"),
                                IsComplete = DbUtils.GetBoolean(reader, "IsComplete"),
                                ProjectId = DbUtils.GetInt(reader, "ProjectId")
                            });
                        }

                        return tasks;
                    }
                }
            }     
        }

        public void AddTask(Task task)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Task (Content, Deadline, IsComplete, ProjectId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@content, @deadline, @isComplete, @projectId)";

                    DbUtils.AddParameter(cmd, "@content", task.Content);
                    DbUtils.AddParameter(cmd, "@deadline", task.Deadline);
                    DbUtils.AddParameter(cmd, "@isComplete", task.IsComplete);
                    DbUtils.AddParameter(cmd, "@ProjectId", task.ProjectId);

                    task.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
