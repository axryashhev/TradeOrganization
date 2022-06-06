using System.Linq;
using Metro_CC.data;
using Microsoft.AspNetCore.Mvc;

namespace Metro_CC.Controllers.Children;

[Route("api/[controller]")]
public class ProductController : FactoryController<Product>
{
    private DataContext Context { get; }
    public ProductController(DataContext context) : base(context.products)
    {
        Context = context;
    }
    
    [HttpPut]  
    [Route("Edit")]  
    public IActionResult Edit(Product product)
    {
        var result = database.SingleOrDefault(b => b.id == product.id);
        if (result == null) return NotFound(product);
        result = product;
        Context.SaveChanges();
        return Ok(product);
    } 

    [HttpPost]
    [Route("Add")] 
    public override IActionResult Post(Product product)
    {
        // Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        var result = base.Post(product);
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