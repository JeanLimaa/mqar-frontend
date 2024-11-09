import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationBaseProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationBase({ currentPage, totalPages, onPageChange }: PaginationBaseProps) {
  return (
      <Pagination>
          <PaginationContent>
              <PaginationItem >
                  <PaginationPrevious
                    href="#"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                    aria-disabled={currentPage <= 1}
                    tabIndex={currentPage <= 1 ? -1 : undefined}
                    className={
                      currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                    }
                  />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                      <PaginationLink
                          href="#"
                          onClick={() => onPageChange(index + 1)}
                          className={currentPage === index + 1 ? "bg-slate-400 text-white" : "text-slate-700"}
                      >
                          {index + 1}
                      </PaginationLink>
                  </PaginationItem>
              ))}
              <PaginationItem>
                  <PaginationNext
                      href="#"
                      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                      aria-disabled={currentPage >= totalPages}
                      tabIndex={currentPage >= totalPages ? -1 : undefined}
                      className={
                        currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
                      }
                  />
              </PaginationItem>
          </PaginationContent>
      </Pagination>
  );
}
