using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tasker.Models;
using Tasker.Utils;

namespace Tasker.Repositories
{
    public class TagRepository : BaseRepository, ITagRepository
    {
        public TagRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tag> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.Id as tagId, Name as tagName
                                                   
                                        FROM Tag t
                                        ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var tag = new List<Tag>();
                        while (reader.Read())
                        {
                            tag.Add(new Tag()
                            {
                                Id = DbUtils.GetInt(reader, "tagId"),
                                Name = DbUtils.GetString(reader, "tagName"),
                                
                            });
                        }

                        return tag;
                    }
                }
            }
        }
    }
}
