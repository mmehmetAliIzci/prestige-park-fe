'use client';
import Image from 'next/image';
import Link from 'next/link';

const ParkingCard = ({
  parking,
  onMouseEnter,
  onMouseLeave,
}: {
  parking: Parking;
  onMouseEnter?: (id: any) => void;
  onMouseLeave?: () => void;
}) => {
  return (
    <Link
      onMouseEnter={() => onMouseEnter && onMouseEnter(parking.id)}
      onMouseLeave={onMouseLeave}
      href={`/parking/${parking.id}`}
      className='xs:w-full flex max-h-80 flex-row rounded-lg p-4 shadow-md shadow-indigo-100 lg:flex-col'
    >
      <Image
        alt='Home'
        width={100}
        height={100}
        src={'/images/parking-placeholder.webp'}
        className='h-36 w-48 rounded-md object-cover lg:h-40 lg:w-full'
      />

      <div className='mt-2 sm:ml-2'>
        <dl>
          <div>
            <dt className='sr-only'>Name</dt>

            <dd className='text-sm'>{parking.name}</dd>
          </div>
        </dl>

        <div className='mt-1 flex items-center gap-8 text-xs sm:flex-col sm:items-start sm:gap-2'>
          <div className='sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2'>
            <svg
              className='h-4 w-4 text-indigo-700'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z'
              />
            </svg>

            <div className='mt-1.5 sm:mt-0'>
              <p className='text-gray-500'>Hourly</p>

              <p className='font-medium'>
                {parking.hourly_rate !== ''
                  ? `${parking.hourly_rate} / h`
                  : 'N/A'}
              </p>
            </div>
          </div>

          <div className='sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2'>
            <svg
              className='h-4 w-4 text-indigo-700'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
              />
            </svg>

            <div className='mt-1.5 sm:mt-0'>
              <p className='text-gray-500'>Monthly</p>

              <p className='font-medium'>
                {parking.monthly_rate !== ''
                  ? `${parking.monthly_rate} / mon`
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ParkingCard;
