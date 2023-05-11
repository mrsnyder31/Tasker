using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tasker.Models;
using Tasker.Utils;

namespace Tasker.Repositories
{
    public class CategoryRepository : BaseRepository, ICategoryRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration) { }

        public List<Category> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id, Name FROM Category";
                    
                    using (SqlDataReader reader  = cmd.ExecuteReader())
                    {
                        var categories = new List<Category>();
                        while (reader.Read())
                        {
                            categories.Add(new Category
                            {

                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            });
                        }

                        return categories;
                    }
                }
            }
        }
    }
}
