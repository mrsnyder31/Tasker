using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tasker.Models;
using Tasker.Repositories;

namespace Tasker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskRepository _taskRepository;
       
        public TaskController(ITaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
         
        }

        [HttpGet]
        public IActionResult Get() 
        {
            return Ok(_taskRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(Task task)
        {
            task.IsComplete = false;

            _taskRepository.AddTask(task);
            return CreatedAtAction("Get", new { id = task.Id }, task);
        }
    }
}
