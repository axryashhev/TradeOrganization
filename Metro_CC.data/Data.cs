

namespace Metro_CC.data
{
    public class Product : IData
    {
        public int id { get; set; }
        
        public string name { get; set; }

        public decimal regular_price { get; set; }
        
        public decimal sale_price { get; set; }
        
        public string description { get; set; }
        
        public string categoryId { get; set; }
        
        public string tagId { get; set; }
        
        public string photo { get; set; }
        
        public string rating { get; set; }
    }
    
    public class Category : IData
    {
        public int id { get; set; }
        
        public string name { get; set; }
    }
    

    public class Tag : IData
    {
        public int id { get; set; }
        
        public string name { get; set; }
    }
}