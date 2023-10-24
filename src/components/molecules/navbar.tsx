'use client';

import Link from 'next/link';
import Logo from '../atoms/logo';
import { Button } from '../atoms/button';
import { WithDictionary } from '@lib/types';

const Navbar = ({ dictionary }: WithDictionary<{}>) => {
  return (
    <div className='fixed inset-x-0 top-0 z-30 mx-auto w-full border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:px-24'>
      <div className='px-4'>
        <div className='flex items-center justify-between'>
          <div className='flex shrink-0'>
            <Link href='/' className=' flex items-center gap-1'>
              <Logo />
              <div className='text-xl font-bold text-[#000000] sm:text-2xl'>
                Prestige Parking
              </div>
            </Link>
          </div>
          <div className='hidden md:flex md:items-center md:justify-center md:gap-5'></div>
          <div className='flex items-center justify-end sm:gap-3'>
            <span className='hidden cursor-pointer rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 sm:inline-block'>
              {dictionary['how_it_works']}
            </span>
            <span className='hidden cursor-pointer rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900 sm:inline-block'>
              {dictionary['pricing']}
            </span>
            <Button>{dictionary['sign_in']}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
