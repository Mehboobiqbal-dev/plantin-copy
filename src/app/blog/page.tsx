"use client";
import React, { useState } from "react";

// Define interface for article data
interface Article {
  id: number;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  image: string;
  tags: string[];
}

const articlesData: Article[] = [
  {
    id: 1,
    title: "What Do Termites Look Like & How to I...",
    description:
      "Think you’ve spotted a termite? Learn what they look like, where they hide, and how to catch them early—before they snack on your garden! Let’s...",
    date: "April 25",
    readingTime: "5 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Termite_swarmer_image_ee4cab9a98.jpg&w=1920&q=100",
    tags: ["guide", "pests", "explainer"],
  },
  {
    id: 2,
    title: "What Does Ragweed Look Like?",
    description:
      "A look into the common weed that crowds your garden and its impact on the ecosystem.",
    date: "April 18",
    readingTime: "5 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Common_ragweed_photo_ed641cf592.jpg&w=1920&q=100",
    tags: ["garden", "weeds", "explainer"],
  },
  {
    id: 3,
    title: "Best Plants That Repel Bugs for Your Garden",
    description:
      "Discover the plants that naturally ward off pests and help you cultivate a bug-free garden environment.",
    date: "April 11",
    readingTime: "8 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Plants_that_repes_bugs_cover_image_0595ea2fe4.jpg&w=1920&q=100",
    tags: ["plants", "pests", "gardening", "top choice"],
  },
  {
    id: 4,
    title: "Best Plants That Repel Bugs for Your Garden",
    description:
      "Discover the plants that naturally ward off pests and help you cultivate a bug-free garden environment.",
    date: "April 11",
    readingTime: "8 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Plants_that_repes_bugs_cover_image_0595ea2fe4.jpg&w=1920&q=100",
    tags: ["plants", "pests", "gardening", "plant of the week"],
  },
  {
    id: 5,
    title: "What Does Ragweed Look Like? (Care Guide)",
    description:
      "A look into the common weed that crowds your garden and its impact on the ecosystem.",
    date: "April 18",
    readingTime: "5 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Common_ragweed_photo_ed641cf592.jpg&w=1920&q=100",
    tags: ["garden", "weeds", "care guide"],
  },
  {
    id: 6,
    title: "What Does Ragweed Look Like? (Entertainment)",
    description:
      "A look into the common weed that crowds your garden and its impact on the ecosystem.",
    date: "April 18",
    readingTime: "5 minutes",
    image:
      "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Common_ragweed_photo_ed641cf592.jpg&w=1920&q=100",
    tags: ["garden", "weeds", "entertainment"],
  },
];

const categories = [
  "All Articles",
  "Explainer",
  "Top Choice",
  "Plant Of The Week",
  "Care Guide",
  "Entertainment",
  "Plants For Spaces",
  "Sprouting 101",
];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter helper by tag name
  const filterByTag = (tagName: string): Article[] =>
    tagName === "All Articles"
      ? articlesData
      : articlesData.filter((article) =>
          article.tags.some((t) => t.toLowerCase() === tagName.toLowerCase())
        );

  // Apply category + search term
  const articlesFor = (cat: string): Article[] =>
    filterByTag(cat).filter((article) =>
      [article.title, article.description]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  // First three for "New in our blog"
  const featured = articlesFor(selectedCategory).slice(0, 3);

  return (
    <div>
      <header
        className="shadow relative flex w-full items-center"
        style={{
          background: "linear-gradient(to right, #DDF9D5, #BEFFE4)",
        }}
      >
        <div className="w-1/2 flex flex-col justify-center space-y-4 p-4">
          {/* Breadcrumb & Title */}
          <ul
            itemScope
            itemType="https://schema.org/BreadcrumbList"
            className="flex items-center gap-x-2 text-sm text-gray-600"
          >
            <li
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
              className="flex items-center"
            >
              <a itemProp="item" className="hover:text-gray-800" href="/">
                <span itemProp="name">PlantIn</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="mx-2">{">"}</li>
            <li
              itemScope
              itemProp="itemListElement"
              itemType="https://schema.org/ListItem"
              className="font-semibold text-gray-800"
            >
              <a itemProp="item" className="pointer-events-none" href="/blog">
                <span itemProp="name">Blog</span>
              </a>
              <meta itemProp="position" content="2" />
            </li>
          </ul>

          <p className="text-3xl text-left md:text-4xl font-bold text-gray-900">
            Plant Blog – Grow Plants <br />& Knowledge
          </p>
          <p className="text-gray-700 text-left">
            Grow your Botany knowledge like you grow your greenies with our
            plant blog articles.
          </p>

          {/* Search */}
          <div className="relative flex items-center bg-white rounded-full px-4 py-2 w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-transparent focus:outline-none focus:ring-2 focus:bg-teal"
              placeholder="Find a plant by name"
            />
          </div>
        </div>
        <div className="w-1/2 h-full">
          <img
            src="https://myplantin.com/decorations/decoration-7.svg"
            alt="Illustration showing garden decoration"
            className="w-full h-full object-cover"
          />
        </div>
      </header>

      <section className="mt-12 px-4 md:px-8">
        {/* Category Menu */}
        <div className="mb-6 overflow-x-auto text-lg font-bold text-gray-900">
          <ul className="flex space-x-4">
            {categories.map((cat, idx) => (
              <li
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer pb-2 ${
                  selectedCategory === cat
                    ? "text-teal-500 border-b-2 border-teal-500"
                    : "text-gray-600 hover:text-teal-500"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* New in our blog (Featured) */}
        <h2 className="text-2xl text-left md:text-3xl font-bold text-gray-900 mb-6">
          New in our blog
        </h2>
        <div className="hidden md:grid grid-cols-3 gap-4 mt-3">
          {featured[0] && (
            <article className="col-span-2 row-span-2 flex border border-gray-300 rounded-3xl hover:border-[#c6d4e8] overflow-hidden transition duration-300 relative">
              <div className="relative w-1/2 h-full">
                <img
                  src={featured[0].image}
                  alt={featured[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                  {featured[0].tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#eef3fb] text-[#506690] text-xs px-3 py-1 rounded-full capitalize shadow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 flex flex-col justify-between w-1/2">
                <div className="text-xs text-gray-500 text-left mb-1">
                  {featured[0].date} <span className="mx-1">•</span>{" "}
                  {featured[0].readingTime}
                </div>
                <h3 className="text-xl font-bold text-teal-500 underline underline-offset-2 truncate">
                  {featured[0].title}
                </h3>
                <p className="text-sm text-left text-gray-700 mt-2 line-clamp-3">
                  {featured[0].description}
                </p>
              </div>
            </article>
          )}
          <div className="flex flex-col gap-4">
            {featured.slice(1, 3).map((art) => (
              <article
                key={art.id}
                className="flex border border-gray-300 rounded-3xl hover:border-[#c6d4e8] overflow-hidden transition duration-300 relative"
              >
                <div className="relative w-1/3">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 w-2/3 flex flex-col justify-between">
                  <div className="text-xs text-gray-500 mb-1">
                    {art.date} <span className="mx-1">•</span> {art.readingTime}
                  </div>
                  <h3 className="text-base font-semibold text-teal-500 leading-tight underline underline-offset-2">
                    {art.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="justify-center flex">
          <div className="w-20 h-10">
            <div
              className="w-full h-full bg-no-repeat bg-contain"
              style={{
                backgroundImage:
                  "url('https://myplantin.com/decorations/decoration-6.svg')",
              }}
            />
          </div>
        </div>
        <section className="flex items-center justify-center min-h-screen bg-white-200 relative">
          {/* Blue dot: upper‐center on left, outside the banner */}
          <div className="absolute left-0 top-1/4 w-10 h-10 bg-blue-200 rounded-full" />

          {/* Green dot: lower‐center on right, outside the banner */}
          <div className="absolute right-0 top-3/4 w-10 h-10 bg-green-200 rounded-full" />

          {/* Left plant: dropped into lower half, outside left */}
          <div className="absolute left-0 top-3/4 w-24 h-30">
            <div
              className="w-full h-full bg-no-repeat bg-cover"
              style={{
                backgroundImage:
                  "url('https://myplantin.com/decorations/decoration-5.svg')",
              }}
            />
          </div>

          {/* Right plant: perfectly centered vertically, outside right */}
          <div className="absolute right-0 top-0 self-center w-24 h-30">
            <div
              className="w-full h-full bg-no-repeat bg-cover"
              style={{
                backgroundImage:
                  "url('https://myplantin.com/decorations/decoration-4.svg')",
              }}
            />
          </div>

          {/* Main banner */}
          <div className="relative w-[600px] h-[300px] bg-white rounded-2xl shadow-lg flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold text-black mb-6">
              Get access for 3 days
            </h1>
            <button
              className="block text-headline text-center rounded-[30px] font-semibold p-3.5 text-white bg-gradient-to-r from-[#04BF94] to-[#52C8AD] hover:from-[#06D3A4] hover:to-[#60E7C8]"
              style={{ width: "calc(196px * 1.4)" }}
            >
              Get Trial
            </button>
          </div>
        </section>

        {/* Sections for each category */}
        {categories.map((cat, idx) => (
          <React.Fragment key={idx}>
            <h2 className="text-2xl md:text-3xl text-left font-bold text-gray-900 mb-6 mt-12">
              {cat}
            </h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 mt-3">
              {articlesFor(cat).map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-wrap gap-2 z-10">
                      {article.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-white/80 text-gray-800 rounded-full px-2 py-1 text-xs backdrop-blur"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-xs mb-4">
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readingTime}</span>
                    </div>
                  </div>
                </article>
              ))}
              {articlesFor(cat).length === 0 && (
                <p className="col-span-full text-center text-gray-500 py-6">
                  No articles found in “{cat}”.
                </p>
              )}
            </div>
          </React.Fragment>
        ))}
      </section>
    </div>
  );
};

export default Blog;