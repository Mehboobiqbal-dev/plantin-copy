import React, { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

const articles = [
  {
    id: 1,
    title: "How to Grow Magic Mushrooms?",
    date: "Mar 28",
    readTime: "9 min read",
    description: "This is the only guide you’ll ever need to start growing psilocybin mushrooms...",
    imageUrl: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_Stock_Snap_LUYHIZXNWX_a4c4bfd41f.webp&w=1920&q=100",
  },
  {
    id: 2,
    title: "How to Use Coffee Grounds for Plants?",
    date: "May 4",
    readTime: "5 min read",
    description: "Coffee contains a lot of micronutrients and is used as an organic fertilizer...",
    imageUrl: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_adding_spent_coffee_grounds_onto_plants_as_natural_2021_09_01_20_56_58_utc_min_a6e9e2c49d.webp&w=1920&q=100",
  },
  {
    id: 3, // Changed from 2 to 3
    title: "How to Use Coffee Grounds for Plants?",
    date: "May 4",
    readTime: "5 min read",
    description: "Coffee contains a lot of micronutrients and is used as an organic fertilizer...",
    imageUrl: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_adding_spent_coffee_grounds_onto_plants_as_natural_2021_09_01_20_56_58_utc_min_a6e9e2c49d.webp&w=1920&q=100",
  },
  {
    id: 4, // Changed from 2 to 4
    title: "How to Use Coffee Grounds for Plants?",
    date: "May 4",
    readTime: "5 min read",
    description: "Coffee contains a lot of micronutrients and is used as an organic fertilizer...",
    imageUrl: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fsmall_adding_spent_coffee_grounds_onto_plants_as_natural_2021_09_01_20_56_58_utc_min_a6e9e2c49d.webp&w=1920&q=100",
  },
];

const PopularArticles = () => {
  const scrollRef = useRef(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-blue-100 p-6 relative overflow-hidden">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth gap-6 snap-x snap-mandatory pb-6 no-scrollbar"
      >
        <div className="flex-shrink-0 snap-start w-72 bg-blue-100 flex items-center justify-center p-4">
          <h2 className="text-3xl font-bold text-black text-center">
            Popular Articles
          </h2>
        </div>

        {articles.map((article) => (
          <div
            key={article.id}
            className="flex-shrink-0 snap-start w-72 bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-1">{article.date} • {article.readTime}</p>
              <h3 className="text-xl font-bold text-teal-500 mb-2">{article.title}</h3>
              <p className="text-gray-600 text-left text-sm">{article.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleScrollRight}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-teal-400 rounded-full p-3 shadow-lg"
      >
        <FaArrowRight className="w-6 h-6 text-white" />
      </button>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PopularArticles;