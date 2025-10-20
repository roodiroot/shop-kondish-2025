"use client";

import { Input } from "./input";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import AutocompleteSearch from "./autocomplete-serach";
import { CatalogForNavbar } from "../general/navbar/navbar";

interface InputSearchProps extends React.HTMLAttributes<HTMLInputElement> {
  navigation: CatalogForNavbar;
}

const InputSearch: React.FC<InputSearchProps> = ({ navigation, ...props }) => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState<string[]>([]);

  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

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
        const updated = [...filtered, value].slice(-5);
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
      const updated = [...filtered, value].slice(-5);
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
        onFocus={() => {
          console.log("focus");
          setIsOpen(true);
        }}
        {...props}
        type="search"
        className="pl-10"
      />
      {isOpen && (
        <AutocompleteSearch
          navigation={navigation}
          historySearch={historySearch}
          handleSubmit={handleSubmitAutocomplete}
        />
      )}
    </div>
  );
};

export default InputSearch;
