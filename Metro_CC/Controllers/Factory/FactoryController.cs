using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Metro_CC.data;

namespace Metro_CC.Controllers;

[Route("api/[controller]")]
public class FactoryController<T> : Controller where T : class, IData
{
    protected readonly DbSet<T> database;
    protected readonly List<T> data;

    public FactoryController(DbSet<T> database)
    {
        this.database = database;
        data = database.ToList();
    }
    
    [HttpGet]
    public IEnumerable<T> Get()
    {
        return data;
    }
        
    // [HttpGet]
    // public IEnumerable<Product> Get(int index, int count)
    // {
    //     return data.GetRange(index, count);
    // }
    
    [HttpPost]
    [Route("Add")] 
    public virtual IActionResult Post(T item)
    {
        // var uuid = Guid.NewGuid().ToString();
        // item.id = int.Parse(uuid);
        database.Add(item);
        data.Add(item);
        return Ok(item);
    }
    
    [HttpDelete("{id}")]
    public virtual IActionResult Delete(string id)
    {
        var category = data.FirstOrDefault(x => x.id == int.Parse(id));
        if (category  == null)
        {
            return NotFound();
        }

        database.Remove(category);
        data.Remove(category);
        return Ok(category);
    }
}