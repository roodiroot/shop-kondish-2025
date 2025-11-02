"use client";

import { Input } from "./input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import AutocompleteSearch from "./autocomplete-serach";
import { CatalogForNavbar } from "../general/navbar/navbar";
import { ProductsData } from "@/types/catalog";
import { useMediaQuery } from "@/hooks/use-media-query";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface InputSearchProps extends React.HTMLAttributes<HTMLInputElement> {
  navigation: CatalogForNavbar;
  products: ProductsData | null;
}

const InputSearch: React.FC<InputSearchProps> = ({
  navigation,
  products,
  ...props
}) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState<string[]>([]);

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("historySearch");
    if (saved) {
      setHistorySearch(JSON.parse(saved));
    }
  }, []);

  const handleSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("query", value);
      router.push(`/search?${params.toString()}`);
      setHistorySearch((state) => {
        const filtered = state.filter((item) => item !== value);
        const updated = [...filtered, value].slice(-3);
        localStorage.setItem("historySearch", JSON.stringify(updated));
        return updated;
      });
      setIsOpen(false);
    } else {
      params.delete("query");
      router.push(`${path}${params.toString()}`);
      return;
    }
  };

  const handleSubmitAutocomplete = (value: string) => {
    setValue(value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", value);
    router.push(`/search?${params.toString()}`);
    setHistorySearch((state) => {
      const filtered = state.filter((item) => item !== value);
      const updated = [...filtered, value].slice(-3);
      localStorage.setItem("historySearch", JSON.stringify(updated));
      return updated;
    });
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Закрытие при клике вне
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isDesktop) {
    return (
      <div>
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
          <SearchIcon className="w-5 h-5 text-gray-500" />
        </div>
        {isOpen ? (
          <div className="fixed top-0 left-0 w-full h-full bg-white">
            <div className="flex p-2 border-b items-center gap-2">
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsOpen(true)}
                {...props}
                type="search"
              />
              <div className="p-4">
                <XMarkIcon
                  className="w-5 h-5"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
            <AutocompleteSearch
              className="mt-4"
              navigation={navigation}
              historySearch={historySearch}
              setHistorySearch={setHistorySearch}
              handleSubmit={handleSubmitAutocomplete}
              products={products}
              setIsOpen={setIsOpen}
            />
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={cn("relative", props.className)}>
      <div
        onClick={handleSubmit}
        className="absolute text-gray-400 left-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
      >
        <SearchIcon className="w-5 h-5" />
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsOpen(true)}
        {...props}
        type="search"
        className="pl-10"
      />
      {isOpen && (
        <AutocompleteSearch
          className="absolute left-0 right-0 mt-1 bg-white min-w-[380px] border py-4 px-1 border-gray-200 rounded-md shadow-lg overflow-auto z-10"
          navigation={navigation}
          historySearch={historySearch}
          setHistorySearch={setHistorySearch}
          handleSubmit={handleSubmitAutocomplete}
          products={products}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default InputSearch;
