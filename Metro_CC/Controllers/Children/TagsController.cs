using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Metro_CC.data;
using Microsoft.EntityFrameworkCore;

namespace Metro_CC.Controllers;

[Route("api/[controller]")]
public class TagsController : FactoryController<Tag>
{
    private DataContext Context { get; }
    public TagsController(DataContext context) : base(context.tags)
    {
        Context = context;
    }
    
    [HttpPut]  
    [Route("Edit")]  
    public IActionResult Edit(Tag tag)
    {
        var result = database.SingleOrDefault(b => b.id == tag.id);
        if (result == null) return NotFound(tag);
        result.name = tag.name;
        Context.SaveChanges();
        return Ok(tag);
    } 

    [HttpPost]
    [Route("Add")] 
    public override IActionResult Post(Tag item)
    {
        // Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        var result = base.Post(item);
        Context.SaveChanges();
        return result;
    }

    [HttpDelete("{id}")]
    public override IActionResult Delete(string id)
    {
        var result = base.Delete(id);
        Context.SaveChanges();
        return result;
    }
}