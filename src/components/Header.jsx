import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import "../App.css";

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const showSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  };

  const closeSiderbar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  };

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <span className="flex justify-center items-center">
          <Link to="/" onClick={closeSiderbar}>
            <img src="logo.png" className="h-20" alt="hired logo" />
          </Link>
          <Link to="/">
            <h1 className="text-5xl font-bold pl-5 sm:pl-1 lg:pl-8">HIRED</h1>
          </Link>
        </span>

        {/* vertical */}
        <div className="sidebar">
          <span className="flex justify-between items-center w-full">
            <Button
              variant="ghost"
              type="button"
              className="py-1 my-5"
              onClick={closeSiderbar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#e8eaed"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </Button>
            <div className="flex items-center px-2">
              {showSignIn && (
                <div
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10"
                  onClick={handleOverlayClick}
                >
                  <SignIn
                    signUpForceRedirectUrl="/onboarding"
                    fallbackRedirectUrl="/onboarding"
                  />
                </div>
              )}

              <SignedOut>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                ></UserButton>
              </SignedIn>
            </div>
          </span>
          {user?.unsafeMetadata.role === "recruiter" && (
            <Link to="/post-job">
              <Button
                variant="ghost"
                type="button"
                className="w-full"
                onClick={closeSiderbar}
              >
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
          )}
          <Link to="/my-jobs">
            <Button
              variant="ghost"
              type="button"
              className="w-full"
              onClick={closeSiderbar}
            >
              <BriefcaseBusiness size={20} className="mr-2" />
              My Jobs
            </Button>
          </Link>
          <Link to="/saved-jobs">
            <Button
              variant="ghost"
              type="button"
              className="w-full"
              onClick={closeSiderbar}
            >
              <Heart size={20} className="mr-2" />
              Saved Jobs
            </Button>
          </Link>
        </div>
        {/* horizontal */}
        <div className="flex gap-4">
          <div className="hideOnMobile">
            {user?.unsafeMetadata.role === "recruiter" && (
              <Link to="/post-job">
                <Button variant="link" type="button">
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <Link to="/my-jobs">
              <Button variant="link" type="button">
                <BriefcaseBusiness size={20} className="mr-2" />
                My Jobs
              </Button>
            </Link>
            <Link to="/saved-jobs">
              <Button variant="link" type="button">
                <Heart size={20} className="mr-2" />
                Saved Jobs
              </Button>
            </Link>
          </div>
          <div className="menu-button">
            <Button variant="ghost" type="button" onClick={showSidebar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
                fill="#e8eaed"
              >
                <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
              </svg>
            </Button>
          </div>
          <div className="profile">
            <div className="flex items-center px-2">
              {showSignIn && (
                <div
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10"
                  onClick={handleOverlayClick}
                >
                  <SignIn
                    signUpForceRedirectUrl="/onboarding"
                    fallbackRedirectUrl="/onboarding"
                  />
                </div>
              )}

              <SignedOut>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowSignIn(true)}
                >
                  Sign In
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10",
                    },
                  }}
                ></UserButton>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
