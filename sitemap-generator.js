// sitemap-generator.js
const fetch = require("node-fetch"); // node-fetch v2
const { SitemapStream, streamToPromise } = require("sitemap");
const { writeFileSync } = require("fs");

async function generateSitemap() {
  try {
    const hostname = "https://apqdiaz.site";
    const sitemap = new SitemapStream({ hostname });

    // Static routes
    const links = [
      { url: "/", changefreq: "daily", priority: 1.0 },
      { url: "/projects", changefreq: "weekly", priority: 0.9 },
      { url: "/contact", changefreq: "monthly", priority: 0.6 },
    ];
    console.log("✅ Static links:", links);

    // Fetch GitHub JSON
    const res = await fetch(
      "https://raw.githubusercontent.com/arvinpaoloqdiaz/files/json/ProjectList.json"
    );
    const projectsData = await res.json();
    // console.log("Fetched projectsData:", projectsData);

    // Extract ProjectList array
    const projects = projectsData.ProjectList || [];
    console.log("Number of projects fetched:", projects.length);

    if (projects.length === 0) {
      console.warn("⚠️ No projects found. Dynamic links will not be generated.");
    }

    // Add category pages (unique group_slug)
    const categories = [...new Set(projects.map(p => p.group_slug))];
    console.log("Unique categories:", categories);
    categories.forEach(category => {
      links.push({
        url: `/projects/${category}`,
        changefreq: "weekly",
        priority: 0.7,
      });
    });

    // Add individual project pages
    projects.forEach(project => {
      links.push({
        url: `/project/${project.slug}`,
        changefreq: "monthly",
        priority: 0.6,
      });
    });

    console.log("Total links including dynamic pages:", links.length);

    // Write all links into the sitemap stream
    links.forEach(link => sitemap.write(link));
    sitemap.end();

    // Convert stream to XML and save
    const data = await streamToPromise(sitemap);
    writeFileSync("./public/sitemap.xml", data.toString());
    console.log("✅ Sitemap.xml generated successfully at ./public/sitemap.xml");
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
  }
}

// Run the generator
generateSitemap();
