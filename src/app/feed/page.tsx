import React from 'react';
import { RiImageAddFill } from "react-icons/ri";

const tags = [
  '#planttherapy',
  '#zzppant',
  '#myplant',
  '#zzplant',
  '#plantin-team',
  '#ipomoeaforever',
  '#monstera',
  '#floorplant',
];

const FeedPage = () => {
  const posts = [
    {
      id: 1,
      user: 'User1',
      avatar: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36843_5858b46b2c.webp&w=96&q=75',
      time: '2 hours ago',
      image: 'https://myplantin.com/_next/image?url=https%3A%2F%2Fuser-images.myplantin.com%2Fprod%2Ffeed%2F32d0c649-ca76-407a-8ae6-4fc3d6281bed.jpg&w=1200&q=75',
      title: 'lechoza o papaya',
      description: 'Tengo mis plantitas en una maceta y algunas han sobrevivió pero cada día amanecen algunas muertas, se debilitan y su palito de pibe flaco y se caen.',
      likes: 0,
      comments: 0,
    },
    {
      id: 2,
      user: 'iStand63fool',
      avatar: 'https://via.placeholder.com/40?text=Avatar',
      time: '1 hour ago',
      image: 'https://via.placeholder.com/600x400?text=Plant+Inside+Grow+Tent',
      title: '',
      description: '',
      likes: 0,
      comments: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Sidebar */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map(tag => (
              <span key={tag} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <button className="w-full flex items-center justify-center bg-blue-100 text-blue-600 py-2 rounded-lg">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.85z" />
            </svg>
            Search
          </button>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Header */}
          <div className="bg-blue-50 p-6 rounded-lg shadow mb-6">
            <h1 className="text-3xl font-bold text-center">Feed Community</h1>
            <p className="text-center text-gray-600 mt-2 flex items-center justify-center gap-2">
              <img
                src="https://strapi.myplantin.com/Group_36927_b84deeb9cf.webp"
                alt="botanist icon"
                className="w-6 h-6 inline"
              />
              Ask plant questions, share your growth progress &amp; find plant mates
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
            <button className="flex-1 flex items-center justify-center border-2 border-teal-500 text-teal-500 py-3 rounded-lg mb-2 sm:mb-0">
              <img
                src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36927_b84deeb9cf.webp&w=48&q=75"
                alt="Ask icon"
                className="w-5 h-5 mr-2"
              />
              Ask a Question
            </button>
            <button className="flex-1 flex items-center justify-center border-2 border-teal-500 text-teal-500 py-3 rounded-lg">
              <img
                src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36926_3f9977f8c6.webp&w=48&q=75"
                alt="Create icon"
                className="w-5 h-5 mr-2"
              />
              Create a Post
            </button>
          </div>

          {/* Botanist Advice Button */}
          <button className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white py-3 rounded-lg mb-6">
            Get Personal Botanist Advice
          </button>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-bold text-sm">{post.user}</p>
                    <p className="text-xs text-gray-500">{post.time}</p>
                  </div>
                </div>
                <img src={post.image} alt="post" className="w-full h-64 object-cover rounded-lg mb-3" />
                {post.title && <h3 className="font-bold text-lg">{post.title}</h3>}
                {post.description && <p className="text-gray-600 mt-1">{post.description}</p>}
                <div className="flex space-x-6 mt-3">
                  <div className="flex items-center text-gray-500">
                    <img
                      src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fwishlist_deselected_cc83c91d5d.webp&w=48&q=75"
                      alt="like"
                      className="w-5 h-5 mr-1"
                    />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <img
                      src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fchat_1_7090c775e8.webp&w=48&q=75"
                      alt="comment"
                      className="w-5 h-5 mr-1"
                    />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <img
                      src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fshare_1_3_964619960c.webp&w=256&q=75"
                      alt="share"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex items-center w-full bg-white border border-gray-300 rounded-xl px-4 py-3 mt-5">
  <input
    type="text"
    placeholder="Enter your comment here"
    className="flex-grow text-14 leading-normal text-textSubtitle placeholder:text-[#A2B5D1B3] outline-none"
  />
  <RiImageAddFill className="ml-3 text-14 leading-normal text-textSubtitle cursor-pointer" />
  <button
    type="button"
    className="ml-3 font-semibold text-14 leading-normal text-textSubtitle"
  >
    Post
  </button>
</div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Icons */}
        <div className="hidden md:flex flex-col items-center space-y-6">
          <button className="bg-gray-200 p-3 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </button>
          <button className="bg-gray-200 p-3 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a4 4 0 014-4h4" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 17l-3.3-3.3" />
            </svg>
          </button>
          <button className="bg-gray-200 p-3 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
