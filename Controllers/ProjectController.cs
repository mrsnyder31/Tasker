using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;
using Tasker.Models;
using Tasker.Repositories;

namespace Tasker.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IUserRepository _userRepository;

        public ProjectController(IProjectRepository projectRepository, IUserRepository userRepository)
        {
            _projectRepository = projectRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
          
            return Ok(_projectRepository.GetAll());
        }

        

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
         
            var project = _projectRepository.GetProjectById(id);
       
            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        [HttpPost]
        public IActionResult Post(Project project)
        {
            //var currentUser = GetCurrentUser();
            var currentUser = 17;
            project.UserId = currentUser;

            _projectRepository.AddProject(project);
            return CreatedAtAction("Get", new { id = project.Id }, project);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            _projectRepository.DeleteProject(id);
            return Ok();
        }


        //private User GetCurrentUser()
        //{
        //    var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
        //    return _userRepository.GetByFirebase(firebaseUserId);
        //}

        [HttpPut("{id}")]
        public IActionResult Put(int id, Project project)
        {
            if (id != project.Id)
            {
                Console.WriteLine("id: ", id, "project id: ", project.Id);
                return BadRequest();
            }

            _projectRepository.EditProject(project);
            return NoContent();

        }

    }
}
