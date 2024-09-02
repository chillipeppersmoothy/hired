import { Link } from "react-router-dom";
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   UserButton,
// } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <nav className="py-4 flex justify-between items-center">
      <span className="flex justify-center items-center">
        <Link>
          <img src="logo.png" className="h-20" alt="hired logo" />
        </Link>
        <h1 className="text-5xl font-bold pl-5 sm:pl-1 lg:pl-8">HIRED</h1>
      </span>

      <Button variant="outline">Login</Button>
      {/* <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn> */}
    </nav>
  );
};

export default Header;
