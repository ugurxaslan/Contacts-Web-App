using Contacts_Web_App.Server.Data;
using Contacts_Web_App.Server.Services.implementation;
using Contacts_Web_App.Server.Services.Implementation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

namespace Contacts_Web_App.Server
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAngularApp",
                    builder =>
                    {
                        builder.WithOrigins("https://localhost:4200")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Contacts_Web_App.Server", Version = "v1" });
            });
            services.AddDbContext<Contacts_Web_AppDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Contacts_Web_AppConnectionString")));
            services.AddScoped<ContactService, ContactService>();
            services.AddScoped<UserService, UserService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors("AllowAngularApp");

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Contacts_Web_App.Server v1"));
            }


            app.UseHttpsRedirection();
           

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
