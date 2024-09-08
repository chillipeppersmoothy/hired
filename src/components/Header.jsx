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

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <span className="flex justify-center items-center">
          <Link to="/">
            <img src="logo.png" className="h-20" alt="hired logo" />
          </Link>
          <Link to="/">
            <h1 className="text-5xl font-bold pl-5 sm:pl-1 lg:pl-8">HIRED</h1>
          </Link>
        </span>

        <div className="flex gap-4">
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
      </nav>

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
    </>
  );
};

export default Header;
