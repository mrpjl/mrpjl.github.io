const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItKatex = require("markdown-it-katex");
const readingTime = require("reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss").default;

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addPassthroughCopy({
    "src/assets": "assets"
  });
  eleventyConfig.addFilter("readingTime", content => {
    const stats = readingTime(content || "");
    return stats.text;
  });
  
  eleventyConfig.addFilter("postDate", function(dateObj) {
  return new Date(dateObj).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
});

  eleventyConfig.addCollection("posts", function(collectionApi) {
  return collectionApi
    .getFilteredByTag("post")
    .filter(item => !item.inputPath.includes("/archive/"))
    .filter(item => !item.inputPath.includes("/private/"))
    .reverse();
});

  eleventyConfig.addCollection("tagList", function(collectionApi) {

  const tags = new Set();

  collectionApi.getAll().forEach(item => {

    (item.data.tags || []).forEach(tag => {

      if (
        tag !== "all" &&
        tag !== "post"
      ) {
        tags.add(tag);
      }

    });

  });

  return [...tags].sort();

});

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  }).use(markdownItAnchor)
    .use(markdownItKatex);

  eleventyConfig.setLibrary("md", md);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
