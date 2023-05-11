using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
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

        [HttpPut("{id}")]
        public IActionResult Put(int id, Task task)
        {
            if (id != task.Id)
            {
                Console.WriteLine("id: ", id, "task id: ", task.Id);
                return BadRequest();
            }

            _taskRepository.EditTask(task);
            return NoContent();

        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _taskRepository.DeleteTask(id);
            return Ok();
        }
    }
}
