using System;
using System.Collections.Generic;
using System.Linq;
using Metro_CC.Models;
using Microsoft.AspNetCore.Mvc;

namespace Metro_CC.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        static readonly List<Product> data;
        
        static ProductController()
        {
            data = new List<Product>
            {
                new Product { id = Guid.NewGuid().ToString(), name = "iPhone 7", count = 12, price = 52000m},
                new Product { id = Guid.NewGuid().ToString(), name = "Samsung Galaxy S7", count = 21, price = 42000m}
            };
        }
        
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return data;
        }
 
        [HttpPost]
        public IActionResult Post(Product product)
        {
            product.id = Guid.NewGuid().ToString();
            data.Add(product);
            return Ok(product);
        }
 
        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            Product product = data.FirstOrDefault(x => x.id == id);
            if (product == null)
            {
                return NotFound();
            }
            data.Remove(product);
            return Ok(product);
        }
    }
}