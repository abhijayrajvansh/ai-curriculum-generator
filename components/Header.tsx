import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-[#FAFAF3] shadow-md">
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
        <LoginLink className="bg-white border border-black text-black rounded-md py-2 px-4">
          Login
        </LoginLink>
        <RegisterLink className="bg-primary rounded-md text-white py-2 px-4">
          Get Started
        </RegisterLink>
      </div>
    </header>
  );
};

export default Header;
