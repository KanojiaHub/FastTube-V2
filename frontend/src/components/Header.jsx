import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from 'firebase/auth'; // Import signOut
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import ytLogo from "../images/yt-logo.png";
import ytLogoMobile from "../images/yt-logo-mobile.png";
import logoutImg from "../images/interface.png"; // Updated path to your logout image

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";

import { Context } from "../context/contextApi";
import Loader from "../shared/loader";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [username, setUsername] = useState("Login"); // Default to "Login"

    const { loading, mobileMenu, setMobileMenu } = useContext(Context);
    const navigate = useNavigate();
    
    const db = getFirestore();
    const auth = getAuth();
    
    useEffect(() => {
        const fetchUsername = async () => {            
            const user = auth.currentUser;
            if (user) {
                setUsername(user.displayName || 'User');
                // Optionally, fetch more user data from Firestore
                const userDoc = doc(db, 'users', user.uid);
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    setUsername(userSnapshot.data().username || 'User');
                }
            } else {
                setUsername("Login"); // Reset to "Login" if no user is logged in
            }
        };

        fetchUsername();
    }, [auth.currentUser, db]);


    const searchQueryHandler = (event) => {
        if (
            (event?.key === "Enter" || event === "searchButton") &&
            searchQuery?.length > 0
        ) {
            navigate(`/searchResult/${searchQuery}`);
        }
    };

    const mobileMenuToggle = () => {
        setMobileMenu(!mobileMenu);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth); // Sign out the user
            setUsername("Login"); // Update username text to "Login"
            // Do not redirect to login page, stay on the current page
        } catch (error) {
            console.error("Logout error:", error.message);
        }
    };

    const { pathname } = useLocation();
    const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

    return (
        <div className="sticky top-0 z-10 flex flex-row items-center justify-between h-14 px-4 md:px-5 bg-white dark:bg-black">
            {loading && <Loader />}

            <div className="flex h-5 items-center">
                {pageName !== "video" && (
                    <div
                        className="flex md:hidden md:mr-6 cursor-pointer items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]"
                        onClick={mobileMenuToggle}
                    >
                        {mobileMenu ? (
                            <CgClose className="text-white text-xl" />
                        ) : (
                            <SlMenu className="text-white text-xl" />
                        )}
                    </div>
                )}
                <Link to="/" className="flex h-5 items-center">
                    <img
                        className="h-full hidden dark:md:block"
                        src={ytLogo}
                        alt="Youtube"
                    />
                    <img
                        className="h-full md:hidden"
                        src={ytLogoMobile}
                        alt="Youtube"
                    />
                </Link>
            </div>
            <div className="group flex items-center">
                <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#303030] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0">
                    <div className="w-10 items-center justify-center hidden group-focus-within:md:flex">
                        <IoIosSearch className="text-white text-xl" />
                    </div>
                    <input
                        type="text"
                        className="bg-transparent outline-none text-white pr-5 pl-5 md:pl-0 w-44 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyUp={searchQueryHandler}
                        placeholder="Search"
                        value={searchQuery}
                    />
                </div>
                <button
                    className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#303030] rounded-r-3xl bg-white/[0.1]"
                    onClick={() => searchQueryHandler("searchButton")}
                >
                    <IoIosSearch className="text-white text-xl" />
                </button>
            </div>
            <div className="flex items-center">
                <div className="hidden md:flex">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <RiVideoAddLine className="text-white text-xl cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-center ml-2 h-10 w-10 rounded-full hover:bg-[#303030]/[0.6]">
                        <FiBell className="text-white text-xl cursor-pointer" />
                    </div>
                </div>
                
                <button
                    className="flex items-center space-x-2 bg-transparent border-none cursor-pointer"
                    onClick={() => navigate('/login')} // Navigate to login when clicked
                >
                    {/* Profile Image */}
                    <div className="flex h-8 w-8 overflow-hidden rounded-full">
                        <img
                            src="https://avatar.iran.liara.run/public/16"
                            alt="profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Username Box */}
                    <div className="bg-black text-white py-1 px-2 rounded-lg">
                        <span>{username}</span>
                    </div>
                </button>

                {/* Logout Button */}
                {
                    username !=='Login' && (
                        <button
                        className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-white"
                        onClick={handleLogout}
                    >
                        <img
                            src={logoutImg}
                            alt="logout"
                            className="w-8 h-8"
                        />
                    </button>
                    )
                }
                
    
            </div>
        </div>
    );
};

export default Header;
