import React from "react";
import { Icons } from "./icons";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between">
        <Icons.StickyNote />
        <div className="mt-2">
          <UserButton
            appearance={{
              elements: {
                avatarImage: "bg-[url('../../public/Preview.svg')]",
              },
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
