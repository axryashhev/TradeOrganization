
using System.Configuration;
using Metro_CC.data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace Metro_CC
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // // добавление данных
            // using (ApplicationContext db = new ApplicationContext())
            // {
            //     // создаем два объекта User
            //     var category1 = new Category {name = "Одежда"};
            //     var category2 = new Category {name = "Прдукты"};
            //
            //     // добавляем их в бд
            //     db.categories.AddRange(category1, category2);
            //     db.SaveChanges();
            // }
            // // получение данных
            // using (ApplicationContext db = new ApplicationContext())
            // {
            //     // получаем объекты из бд и выводим на консоль
            //     var categories = db.categories.ToList();
            //     Console.WriteLine("Users list:");
            //     foreach (var category in categories)
            //     {
            //         Console.WriteLine($"{category.Id}.{category.name}");
            //     }
            // }
            CreateHostBuilder(args).Build().Run();
        }

        private static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
        .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}