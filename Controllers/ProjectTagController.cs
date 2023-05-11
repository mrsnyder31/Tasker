using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tasker.Models;
using Tasker.Repositories;

namespace Tasker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectTagController : ControllerBase
    {
        private readonly IProjectTagRepository _projectTagRepository;

        public ProjectTagController(IProjectTagRepository projectTagRepository)
        {
            _projectTagRepository = projectTagRepository;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_projectTagRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(ProjectTag projectTag)
        {
           
            _projectTagRepository.AddProjectTag(projectTag);
            return CreatedAtAction("Get", new { id = projectTag.Id }, projectTag);
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            _projectTagRepository.DeleteProjectTag(id);
            return Ok();
        }
    }
}
