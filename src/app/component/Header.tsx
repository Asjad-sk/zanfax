"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import debounce from "lodash/debounce";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Cancel01Icon,
  UserIcon,
  Search01Icon,
  ShoppingCart02Icon,
  Menu04Icon,
} from "hugeicons-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";

interface HeaderProps {
  id: any;
}

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSuggestionClick, setSuggestionClick] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { data: session } = useSession();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const router = useRouter();

  const fetchSuggestions = async (query: string) => {
    try {
      const response = await axios.get(`/api/productSuggestion?query=${encodeURIComponent(query)}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 100), []);

  useEffect(() => {
    if (searchQuery.trim()) {
      debouncedFetchSuggestions(searchQuery);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery, debouncedFetchSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearchOpen(prev => !prev);
    if (!isSearchOpen) {
      setSearchQuery(""); // Clear search query when opening search bar
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestionClick(true);
    router.push(`/pages/search?query=${encodeURIComponent(suggestion)}`);
  };

  const toggleNav = () => {
    setIsNavOpen(prev => !prev);
  };
  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/pages/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  
  <button
    onClick={toggleSearch}
    className="text-gray-600 hover:text-gray-800"
    aria-label="Close Search"
  >
    <Cancel01Icon />
  </button>
  

  const cartItems = useSelector((state: any) => state.cart.items);
  const itemCount = useSelector((state: any) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <header className="w-full flex justify-between items-center bg-white shadow-md border-2">
      {/* Logo on the Left */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/ecommerce-963a9.appspot.com/o/images%2FScreenshot%202024-08-29%20212915.png?alt=media&token=e3ed21de-715c-44f6-ba53-05e69a1b7f36"
            alt="Company Logo"
            width={80}
            height={80}
          />
        </Link>
      </div>

      {/* Search Input */}
      <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? "w-full" : "w-auto"} ml-auto group hover:bg-gray-100 rounded-full`}>
        {isSearchOpen ? (
          <div className="flex items-center w-full bg-gray-100 p-2 rounded-full relative">
            <Search01Icon className="h-5 w-5 text-gray-600 ml-2 cursor-pointer" onClick={()=>{
              fetchSuggestions
            }} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search"
              className="flex-grow px-3 py-2 bg-gray-100 border-0 outline-none"
              autoFocus
            />
            <button
              onClick={toggleSearch}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Close Search"
            >
              <Cancel01Icon />
            </button>

            {/* Suggestions Dropdown */}
            {searchQuery && (
              <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-2 z-10">
                <ul>
                  {suggestions
                    .filter((suggestion) =>
                      suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                      >
                        {suggestion}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            
            aria-label="Open Search"
            onClick={toggleSearch}
            className=" bg-blackrelative group p-2 rounded-full flex items-center"
          >
            <Search01Icon onClick={handleSearch} className="h-5 w-5 mr-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Icons on the Right */}
      {!isSearchOpen && (
        <div className="flex items-center space-x-6 text-gray-100">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-800 z-10 relative" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-200">
                <DropdownMenuLabel>
                  <Link href="/pages/account">My account</Link>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/pages/getOrder">Order</Link>
                </DropdownMenuItem>
                {session.user.isAdmin && (
                  <DropdownMenuItem>
                    <Link href="/pages/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <button onClick={() => signOut()} className="w-full text-left px-4 py-2 hover:bg-gray-200">
                    Sign out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button
              onClick={() => signIn()}
              aria-label="Sign In"
              className="relative group p-2 hover:bg-gray-200 rounded-full flex items-center"
            >
              <UserIcon className="h-5 w-5 text-gray-600 group-hover:text-gray-800 z-10 relative" />
            </button>
          )}

          <Link href="/pages/addTocart">
            <button
              aria-label="Cart"
              className="relative group p-2 hover:bg-gray-200 rounded-full flex items-center"
            >
              <ShoppingCart02Icon className="h-6 w-6 text-gray-600 group-hover:text-gray-800 z-10 relative" />
              {itemCount > 0 && (
                <div className="absolute top-0 right-0 flex items-center justify-center w-6 h-6 p-1 bg-red-700 text-white rounded-full text-xs font-bold">
                  <p className="mb-[1px] text-lg">{itemCount}</p>
                </div>
              )}
            </button>
          </Link>

          <button
            aria-label="Menu"
            onClick={toggleNav}
            className="relative group p-2 hover:bg-gray-200 rounded-full flex items-center"
          >
            <Menu04Icon className="h-5 w-5 text-gray-600 group-hover:text-gray-800 z-10 relative" />
          </button>
        </div>
      )}

      {/* Slide Navigation */}
      <div
        className={`fixed top-0 right-0 h-full bg-white text-black transition-transform duration-300 ease-in-out ${isNavOpen ? "translate-x-0" : "translate-x-full"} w-[30%] z-40`}
      >
        <button
          className="p-2 m-4 text-black bg-white rounded-md"
          onClick={toggleNav}
        >
          <Cancel01Icon className="w-6 h-6" />
        </button>

        <nav className="mt-8">
          <ul className="flex flex-col ">
            <Link href='/' className="p-4 hover:bg-gray-700">Home</Link>
            <Link href='/pages/getOrder' className="p-4 hover:bg-gray-700">Order</Link>
            <Link href='/' className="p-4 hover:bg-gray-700">About</Link>
            <Link href='/' className="p-4 hover:bg-gray-700">Services</Link>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleNav}
        ></div>
      )}
    </header>
  );
};

export default Header;
