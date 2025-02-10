"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Pagination as PaginationType } from "@/types/catalog";

interface PaginationBlockProps {
  pagination?: PaginationType;
}

const PaginationBlock: React.FC<PaginationBlockProps> = ({ pagination }) => {
  const params = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Устанавливаем currentPage из параметров URL
  useEffect(() => {
    const page = params.get("page");

    if (page) {
      setCurrentPage(Number(page));
    } else {
      setCurrentPage(1);
    }
  }, [params]);

  // Обработчик изменения страницы
  const changePage = (newPage: number) => {
    const newParams = new URLSearchParams(params.toString());
    setCurrentPage(newPage);

    if (newPage === 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(newPage));
    }

    window.history.pushState(null, "", `?${newParams.toString()}`);
    window.scrollTo(0, 0);
  };

  // функция переключения на предидущую страницу
  const handlePreviousPage = () => {
    const searchParams = new URLSearchParams(params.toString());
    const previousPage = currentPage - 1;

    if (previousPage >= 1) {
      setCurrentPage(previousPage);
      searchParams.set("page", previousPage.toString());
    } else {
      setCurrentPage(1);
      searchParams.delete("page");
    }

    window.history.pushState(null, "", `?${searchParams.toString()}`);
    window.scrollTo(0, 0);
  };

  // функция переключения на слдедующую страницу
  const handleNextClick = () => {
    const searchParams = new URLSearchParams(params.toString());
    const nextPage = currentPage + 1;

    if (pagination?.pageCount && nextPage <= pagination.pageCount) {
      setCurrentPage(nextPage);
      searchParams.set("page", nextPage.toString());
    }

    window.history.pushState(null, "", `?${searchParams.toString()}`);
    window.scrollTo(0, 0);
  };

  // генерация основных компонентов пагинации
  const generatePaginationArr = useCallback(() => {
    const arr = new Array(pagination?.pageCount)
      .fill(0)
      .map((_, index) => index + 1);

    let firstPage = false;
    let lastPage = false;
    let paginArr: number[] = [];
    if (arr.length >= 6) {
      if (currentPage >= 3 && currentPage <= arr.length - 2) {
        paginArr = arr.slice(currentPage - 2, currentPage + 1);
        firstPage = false;
        lastPage = false;
      }
      if (currentPage > 0 && currentPage < 3) {
        paginArr = arr.slice(0, 3);
        firstPage = true;
      }
      if (currentPage > arr.length - 2) {
        paginArr = arr.slice(arr.length - 3, arr.length);
        lastPage = true;
      }
    } else {
      firstPage = true;
      lastPage = true;
      paginArr = arr;
    }

    return { paginArr, firstPage, lastPage, arr };
  }, [pagination?.pageCount, currentPage]);

  const { paginArr, firstPage, lastPage, arr } = generatePaginationArr();

  return (
    <Pagination className="mt-4">
      <PaginationContent>
        {/* Кнопка "Предыдущая" */}
        {arr.length > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className="cursor-pointer"
              style={{
                pointerEvents: currentPage === 1 ? "none" : "auto",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            />
          </PaginationItem>
        )}

        {/* Кнопка "1 страница" и ... */}
        {!firstPage && (
          <>
            <PaginationItem>
              <PaginationLink onClick={() => changePage(1)}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* Отображаем видимые страницы */}
        {paginArr.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              className="cursor-pointer"
              isActive={page === currentPage}
              onClick={() => changePage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Кнопка "последней страницы" и ... */}
        {!lastPage && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => changePage(arr.length)}>
                {arr.length}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Кнопка "Следующая" */}
        {arr.length > 1 && (
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={handleNextClick}
              style={{
                pointerEvents:
                  currentPage === pagination?.pageCount ? "none" : "auto",
                opacity: currentPage === pagination?.pageCount ? 0.5 : 1,
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBlock;
