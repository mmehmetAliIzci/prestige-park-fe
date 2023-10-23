'use client'

import Link from 'next/link'
import Logo from "../atoms/logo";
import { Button } from "../atoms/button";
import { WithDictionary } from "@lib/types";

const Navbar = ({dictionary}: WithDictionary<{}>) => {
  return (
    <div className="fixed z-30 w-full bg-white/80 shadow backdrop-blur-lg inset-x-0 top-0 mx-auto border border-gray-100 py-3 md:px-24">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link href='/' className=" flex items-center gap-1">
              <Logo />
              <div className="text-xl sm:text-2xl text-[#000000] font-bold">
                Prestige Parking
              </div>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5"></div>
          <div className="flex items-center justify-end sm:gap-3">
            <span className="cursor-pointer hidden sm:inline-block text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg px-2 py-1 hover:bg-gray-100 hover:text-gray-900">
            {dictionary['how_it_works']}
            </span>
            <span className="cursor-pointer sm:inline-block text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg px-2 py-1 hidden hover:bg-gray-100 hover:text-gray-900">
            {dictionary['pricing']}
            </span>
            <Button>
            {dictionary['sign_in']}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
