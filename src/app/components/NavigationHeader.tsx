"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { MdFacebook } from "react-icons/md";
import { FaInstagramSquare } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

// Define type for problemDisplay to allow string indexing
interface ProblemDisplay {
  [key: string]: string;
}

const plantCategories = [
  { name: "Flowers", slug: "flowers" },
  { name: "Succulents", slug: "succulents" },
  { name: "Cactuses", slug: "cactuses" },
  { name: "Ferns", slug: "ferns" },
  { name: "Shrubs", slug: "shrubs" },
  { name: "Trees", slug: "trees" },
  { name: "Grasses", slug: "grasses" },
  { name: "Herbs", slug: "herbs" },
  { name: "Houseplants", slug: "houseplants" },
  { name: "Veggies & Fruit", slug: "veggies-fruit" },
];

const problemCategories = [
  { name: "All Problems", slug: "all-problem" },
  { name: "Diseases", slug: "diseases" },
  { name: "Pests", slug: "pests" },
  { name: "Weeds", slug: "weeds" },
];

const problemDisplay: ProblemDisplay = {
  "all-problem": "All Problems",
  diseases: "Disease ID",
  pests: "Pest ID",
  weeds: "Weeds ID",
};

const companyCategories = [
  { name: "PlantIn App", slug: "/problems/pest-id" },
  { name: "Mushroom ID App", slug: "/problems/disease-id" },
  { name: "About Us", slug: "/about-us" },
  { name: "PlantIn App Review", slug: "/reviews" },
  { name: "Rating & Reviews", slug: "/rating-reviews" },
  { name: "Hero of Ukraine", slug: "/hero-of-ukraine" },
  { name: "FAQ", slug: "/faq" },
  { name: "Contact Us", slug: "/contact-us" },
  { name: "Promo", slug: "/promo" },
  { name: "Education", slug: "/education" },
];

const blogCategories = [
  { name: "Plants", slug: "/blog/plants" },
  { name: "Weeds", slug: "/blog/weeds" },
];

export function NavigationHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Redirect to main page after sign-in (if authenticated)
  React.useEffect(() => {
    if (status === "authenticated") {
      console.log('user is authenticated')
      // router.push("/");
    }else{
      console.log('user is not authenticated')
    }
  }, [status, router]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="sticky inset-x-0 top-0 z-40 m-0 p-0">
      <a
        href="/signup?redirect=/subscription"
        className="block w-full h-10 font-semibold text-center bg-green-100 text-black leading-10"
      >
        Identify, Get Care & Grow Healthy Plants with Us!
      </a>
      <div className="px-5 py-4 bg-white shadow-[rgba(0,0,0,0.07)_0px_2px_8px_0px]">
        <div className="mx-auto max-w-[1320px]">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <Link href="/" className="flex items-center leading-none h-[46px]">
                <img
                  src="https://myplantin.com/_next/static/media/logo.3707044a.svg"
                  alt="Plant Care Logo"
                  className="object-cover overflow-hidden h-6 w-[108px]"
                />
              </Link>
            </div>
            <div className="flex gap-4 max-md:hidden">
              {/* Plant Identifier Dropdown */}
              <div className="relative group text-left">
                <Link
                  href="/identify"
                  className="px-4 py-2 font-medium text-neutral-800 flex items-center"
                >
                  Plant Identifier
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md z-10">
                  <ul className="py-1">
                    {plantCategories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/identify/${cat.slug}`}
                          className="block px-3 py-1 text-sm hover:bg-gray-100"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Plant Problems Dropdown */}
              <div className="relative group text-left">
                <Link
                  href="/problems"
                  className="px-4 py-2 font-medium text-neutral-800 flex items-center"
                >
                  Plant Problems
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md z-10">
                  <ul className="py-1">
                    {problemCategories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/problems/${cat.slug}`}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {problemDisplay[cat.slug]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* Blog Dropdown */}
              <div className="relative group text-left">
                <Link
                  href="/blog"
                  className="px-4 py-2 font-medium text-neutral-800 flex items-center"
                >
                  Blog
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </Link>
                <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md z-10">
                  <ul className="py-2">
                    {blogCategories.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={item.slug}
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* Feed Link */}
            <Link href="/feed" className="px-4 py-2 font-medium text-neutral-800">
              Feed
            </Link>
            {/* Company Dropdown */}
            <div className="relative group text-left">
              <Link
                href="/about-us"
                className="px-4 py-2 font-medium text-neutral-800 flex items-center"
              >
                Company
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                    />
                </svg>
              </Link>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg rounded-md z-10">
                <ul className="py-1">
                  {companyCategories.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={item.slug}
                        className="block px-4 py-2 text-[0.95rem] hover:bg-gray-100"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-3 items-center ml-auto">
              {status === "authenticated" ? (
                <>
                  {/* Premium Button */}
                  <Link
                    href="/premium"
                    className="px-4 py-2 font-semibold rounded-2xl bg-purple-600 text-white flex items-center gap-2"
                  >
                    <img
                      src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fenvelop_free_82a5a66816.webp&w=96&q=75"
                      alt="Message Icon"
                      className="h-5 w-5 object-contain"
                    />
                    Premium
                  </Link>
                  {/* Leaves Symbol */}
                  <Link href="/rewards">
                    <img
                      src="https://myplantin.com/icons/my-plants.svg"
                      alt="Leaves Icon"
                      className="h-6 w-6"
                    />
                  </Link>
                  {/* Notification Bell */}
                  <Link href="/notifications" className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V5a2 2 0 10-4 0v.083A6.002 6.002 0 004 11v3.159c0 .538-.214 1.053-.595 1.436L2 17h5m4 4a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                      />
                    </svg>
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      0
                    </span>
                  </Link>
                  {/* Profile and Dropdown */}
                  <div className="relative">
                    <Image
                      src="https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FGroup_36843_5858b46b2c.webp&w=96&q=75"
                      alt="User Profile"
                      className="h-8 w-8 rounded-full cursor-pointer"
                      width={32}
                      height={32}
                      onClick={toggleDropdown}
                    />
                    <div
                      className={`absolute right-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg border border-gray-200 z-10 ${
                        isDropdownOpen ? "block" : "hidden"
                      }`}
                    >
                      <ul className="py-2 text-gray-700">
                        {[
                          { href: "/settings", label: "Settings" },
                          { href: "/community-profile", label: "Community Profile" },
                          { href: "/my-plants", label: "My Plants" },
                          { href: "/saved-articles", label: "Saved Articles" },
                          { href: "/get-premium", label: "Get Premium" },
                        ].map(({ href, label }) => (
                          <li key={href} className="px-4 py-2 hover:bg-gray-100">
                            <Link href={href} onClick={() => setIsDropdownOpen(false)}>
                              {label}
                            </Link>
                          </li>
                        ))}
                        <li className="px-4 py-2 hover:bg-gray-100">
                          <button
                            onClick={() => {
                              signOut({ callbackUrl: "/" });
                              setIsDropdownOpen(false);
                            }}
                            className="w-full text-left"
                          >
                            Log Out
                          </button>
                        </li>
                      </ul>
                      {/* Follow Us Section */}
                      <div className="px-4 py-2 border-t">
                        <span className="text-sm font-medium">Follow Us:</span>
                        <div className="flex space-x-3 mt-2">
  {[
    { href: "https://instagram.com", icon: <FaInstagramSquare />, alt: "Instagram" },
    { href: "https://facebook.com", icon: <MdFacebook />, alt: "Facebook" },
    { href: "https://pinterest.com", icon: <FaPinterest />, alt: "Pinterest" },
    { href: "https://tiktok.com", icon: <AiFillTikTok />, alt: "TikTok" },
  ].map(({ href, icon, alt }) => (
    <Link
      key={href}
      href={href}
      target="_blank"
      onClick={() => setIsDropdownOpen(false)}
      aria-label={alt}
      className="text-2xl text-gray-600 hover:text-black" // Optional styling
    >
      {icon}
    </Link>
  ))}
</div>

                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/authmodel"
                    className="px-4 py-3 font-semibold rounded-2xl bg-teal-700 text-white min-w-[146px] text-center"
                  >
                    Sign Up Free
                  </Link>
                  <Link
                    href="/authmodel"
                    className="px-4 py-2 font-medium text-neutral-800"
                  >
                    Log In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}