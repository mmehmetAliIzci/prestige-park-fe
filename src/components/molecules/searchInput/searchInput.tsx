'use client';

import { Button } from '../../atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../atoms/popover';
import { Search } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { WithDictionary } from '@lib/types';
import { Input } from '../../atoms/input';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { makeDistrictValueInput } from './makeDistrictValueInput';
import { useGetLanguage } from '@lib/hooks/useGetLanguage';
import { useRouter } from 'next/navigation';

type SearchInputProps = WithDictionary<{
  districts: District[];
  onSubmit?: (district: number) => void;
}>;

const SearchInput = ({ dictionary, districts, onSubmit }: SearchInputProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState({
    value: 0,
    label: dictionary['placeholder'],
  });
  const { lang } = useGetLanguage();
  const districtsValueLabels = useMemo(
    () => makeDistrictValueInput(districts)[lang],
    [lang]
  );
  const [filteredDistricts, setFilteredDistricts] =
    useState(districtsValueLabels);

  const handleFilterInputChanged = useCallback(
    (label: string) => {
      const filteredDistricts = districtsValueLabels.filter((district) =>
        district.label.toLocaleLowerCase().includes(label.toLocaleLowerCase())
      );
      setFilteredDistricts(filteredDistricts);
    },
    [districts]
  );

  const onSubmitHandler = (district: number) => {
    if (onSubmit) {
      onSubmit(district);
    } else {
      router.push(`/${lang}/search?district=${district}`);
    }
  };

  return (
    <div className='max-w flex flex-col justify-center gap-2 sm:flex-row'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between bg-white md:w-96'
          >
            {selectedDistrict.label}
            <Search className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='max-h-60 w-full overflow-y-scroll p-0 sm:max-h-40 md:max-h-40 md:w-96'
          side='bottom'
          align='start'
          avoidCollisions={false}
        >
          <div>
            <div className='flex items-center border-b px-3'>
              <MagnifyingGlassIcon className='mr-2 h-4 w-4 shrink-0 opacity-50' />
              <Input
                variant='clean'
                className='flex h-10 w-full border-transparent bg-transparent py-3 text-sm shadow-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50'
                placeholder={dictionary['placeholder']}
                onChange={(search) =>
                  handleFilterInputChanged(search.target.value)
                }
              />
            </div>

            <div className='overflow-hidden p-1 px-2 py-1.5 text-xs font-medium text-muted-foreground'>
              {dictionary['group_heading']}
            </div>
            <div className='flex flex-1 flex-col gap-1'>
              {filteredDistricts.map((district) => (
                <Button
                  className='start-content flex justify-start border-none shadow-none'
                  variant='outline'
                  key={district.value}
                  onClick={() => {
                    setSelectedDistrict(district);
                    setOpen(false);
                  }}
                >
                  {district.label}
                </Button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        className='w-32 self-center md:self-auto'
        onClick={() => onSubmitHandler(selectedDistrict.value)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
