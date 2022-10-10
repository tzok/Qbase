using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RNAqbase.Repository;
using RNAqbase.Services;
using System;

namespace RNAqbase
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}
		public IConfiguration Configuration { get; }

		public void ConfigureServices(IServiceCollection services)
		{
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
			services.AddMemoryCache();
			services.AddTransient<IQuadruplexService, QuadruplexService>();
			services.AddTransient<ITetradRepository, TetradRepository>();
			services.AddTransient<INewsletterRepository, NewsletterRepository>();
			services.AddTransient<IQuadruplexRepository, QuadruplexRepository>();
			services.AddTransient<IHelixService, HelixService>();
			services.AddTransient<IHelixRepository, HelixRepository>();
			services.AddTransient<IStatisticsService, StatisticsService>();
			services.AddTransient<IStatisticsRepository, StatisticsRepository>();
			services.AddTransient<ISearchRepository, SearchRepository>();
			services.AddTransient<ISearchService, SearchService>();
			services.AddSpaStaticFiles(configuration =>
			{
				configuration.RootPath = "ClientApp/dist";
			});

			services.AddSingleton(Configuration);
		}

		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseExceptionHandler("/Error");
				app.UseHsts();
			}

			app.UseHttpsRedirection();
			app.UseStaticFiles();
			app.UseSpaStaticFiles();

			app.UseMvc(routes =>
			{
				routes.MapRoute(
					name: "default",
					template: "{controller}/{action=Index}/{id?}");
			});

			app.UseSpa(spa =>
			{
				spa.Options.SourcePath = "ClientApp";
				if (env.IsDevelopment())
				{
					spa.UseAngularCliServer(npmScript: "start");
				}
			});
		}
	}
}
