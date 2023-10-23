"use client";

import { Button } from "../../atoms/button";
import { Popover, PopoverContent, PopoverTrigger } from "../../atoms/popover";
import { Search } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { WithDictionary } from "@lib/types";
import { useRouter } from "next/navigation";
import { Input } from "../../atoms/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { makeDistrictValueInput } from "./makeDistrictValueInput";
import { useGetLanguage } from "@lib/hooks/useGetLanguage";

type SearchInputProps = WithDictionary<{
  districts: District[];
}>;

const SearchInput = ({ dictionary, districts }: SearchInputProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState({
    value: 0,
    label: dictionary["placeholder"],
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

  const onSubmit = (district: number) => {
    router.push(`/${lang}/search?district=${district}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 max-w justify-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full md:w-96 bg-white"
          >
            {selectedDistrict.label}
            <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 w-full max-h-60 sm:max-h-40 md:w-96 md:max-h-40 overflow-y-scroll"
          side="bottom"
          align="start"
          avoidCollisions={false}
        >
          <div>
            <div className="flex items-center border-b px-3">
              <MagnifyingGlassIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <Input
                variant="clean"
                className="flex h-10 w-full shadow-none border-transparent bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={dictionary["placeholder"]}
                onChange={(search) =>
                  handleFilterInputChanged(search.target.value)
                }
              />
            </div>

            <div className="overflow-hidden p-1 text-muted-foreground text-xs font-medium px-2 py-1.5">
              {dictionary["group_heading"]}
            </div>
            <div className="flex flex-1 flex-col gap-1">
              {filteredDistricts.map((district) => (
                <Button
                  className="border-none shadow-none start-content flex justify-start"
                  variant="outline"
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
        className="w-32 md:self-auto self-center"
        onClick={() => onSubmit(selectedDistrict.value)}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchInput;
