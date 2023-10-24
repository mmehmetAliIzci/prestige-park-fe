import Link from 'next/link';
import Logo from '../atoms/logo';

const footer = () => {
  return (
    <footer className='bg-white py-12 sm:py-16'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <Link
          href='/'
          className='isomorphic-link flex items-center justify-center gap-1'
        >
          <Logo />
          <div className='text-2xl font-bold text-[#000000]'>
            Prestige Parking
          </div>
          <p className='sr-only'>Prestige Parking</p>
        </Link>
        <nav
          className=' -mb-6 mt-8 flex flex-wrap justify-center gap-3 sm:columns-2 sm:flex-nowrap sm:gap-0 sm:space-x-8'
          aria-label='Footer'
        >
          <div className='pb-6'>
            <span className='hover:text-[#20B2AA cursor-pointer text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:underline'>
              Pricing
            </span>
          </div>
          <div className='pb-6'>
            <span className='hover:text-[#20B2AA cursor-pointer text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:underline'>
              API Docs
            </span>
          </div>
          <div className='pb-6'>
            <span className='hover:text-[#20B2AA cursor-pointer text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:underline'>
              Contact us
            </span>
          </div>
          <div className='pb-6'>
            <span className='hover:text-[#20B2AA cursor-pointer text-sm font-medium leading-6 text-gray-600 transition-all duration-150 hover:underline'>
              Terms &amp; Conditions
            </span>
          </div>
        </nav>
        <div className='mt-8 flex justify-center'>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://twitter.com/infynno'
            className='isomorphic-link isomorphic-link--external inline-flex items-center justify-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 transition-all duration-150 hover:border-[#20B2AA] hover:bg-blue-50 hover:text-[#20B2AA]'
          >
            <svg
              className='h-4 w-4'
              fill='currentColor'
              viewBox='0 0 24 24'
              aria-hidden='true'
            >
              <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
            </svg>
            <span className='text-sm font-medium'>Follow us on Twitter</span>
          </a>
        </div>
        <p className='mt-8 text-center text-sm leading-5 text-gray-500'>
          tailwindtap@gmail.com
        </p>
      </div>
    </footer>
  );
};

export default footer;
