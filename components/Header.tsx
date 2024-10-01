import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="flex items-center space-x-8">
        {/* <img src="" alt="logo" />
        <nav className="flex space-x-4">
          <Link href="/product">Product</Link>
          <Link href="/solutions">Solutions</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/pricing">Pricing</Link>
        </nav> */}
      </div>
      <div className="flex space-x-4">
      <Button variant={"secondary"} size={'lg'} asChild className="text-md border ">
          <Link href="/login">login</Link>
        </Button>
        <Button size={'lg'} asChild className="text-md">
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
