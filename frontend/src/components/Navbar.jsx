import React from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="w-full flex items-center justify-center border-b px-[5vw]">
      <nav className="w-full h-16 flex items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <img src="/Cyber-favicon.png" alt="" className="w-12" />
          <div className="relative">
              <span className="text-xl font-extrabold absolute -bottom-2">
                Clerk
              </span>
              <span className="absolute top-.5">
                Authorization
              </span>
          </div>
        </div>
        {!user ? (
          <button
            className="px-6 py-1.5 border rounded-lg font-extrabold bg-accent hover:bg-accent/90 text-bg text-lg cursor-pointer"
            onClick={openSignIn}
          >
            Login
          </button>
        ) : (
          <div className="scale-140 origin-top-right">
            <UserButton />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
