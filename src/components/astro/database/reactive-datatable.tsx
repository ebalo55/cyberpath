"use client";

import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@components/react/pagination.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/react/table.tsx";
import Fuse from "fuse.js";
import { type FC, useEffect, useMemo, useState } from "react";
import type {
  CertificationMetadata,
  CertificationMetadataCollection,
} from "src/pages/database/data.json.ts";

export const ReactiveDatatable: FC = () => {
  const [is_loading, set_loading] = useState(true);
  const [error, set_error] = useState<string | null>(null);
  const [all_raw_data, set_all_raw_data] =
    useState<CertificationMetadataCollection>([]);
  const [all_data, set_all_data] = useState<Fuse<CertificationMetadata>>(
    new Fuse([]),
  );
  const [query, set_query] = useState<string>("");
  const [pagination, set_pagination] = useState({
    page: 1,
    total_pages: 1,
    per_page: 10,
  });
  const display_data = useMemo(() => {
    if (query) {
      return all_data.search(query).flatMap((result) => result.item);
    }
    return all_raw_data;
  }, [all_data, query, all_raw_data]);

  useEffect(() => {
    set_loading(true);

    // load data from the URL
    const url = new URL(window.location.href);
    // Get the page number from the URL
    const page = url.searchParams.get("page");
    if (page && !Number.isNaN(+page)) {
      set_pagination((prev) => ({
        ...prev,
        page: +page,
      }));
    }

    const query = url.searchParams.get("query");
    if (query) {
      set_query(query);
    }

    // Fetch data from the server
    fetch("/database/data.json")
      .then(async (data) => {
        if (!data.ok) {
          set_error(
            "An unexpected error occurred, try again in a few minutes.",
          );
          return;
        }

        try {
          // Fetch the pre-computed index this will be used to speed up the search
          // and avoid the need to recompute the index on the client side
          // Note: This may be a very large file, so it's better to fetch it separately and in the
          // background, the join is done later
          const index_promise = fetch("/database/data-index.json")
            .then((r) => r.json())
            .catch(console.error);

          const all_data: CertificationMetadataCollection = await data.json();
          const total_pages = Math.ceil(all_data.length / pagination.per_page);

          // store the raw data as an empty filter is not allowed in fuse.js
          set_all_raw_data(all_data);

          // If the page number is greater than the total number of pages
          // then set the page number to 1
          if (page && +page > total_pages) {
            set_pagination((prev) => ({
              ...prev,
              page: 1,
              total_pages,
            }));
          } else {
            // Set the total number of pages keeping the page number the same
            set_pagination((prev) => ({
              ...prev,
              total_pages,
            }));
          }

          // we have the pre-computed index, so we can just load it into fuse and enjoy the speed
          const index = await index_promise;
          const parsed_index = Fuse.parseIndex<CertificationMetadata>(index);

          set_all_data(
            new Fuse(
              all_data,
              {
                keys: [
                  {
                    name: "title",
                    weight: 0.7,
                  },
                  {
                    name: "acronym",
                    weight: 0.6,
                  },
                  {
                    name: "aliases",
                    weight: 0.5,
                  },
                  {
                    name: "provider",
                    weight: 0.4,
                  },
                  {
                    name: "career_paths",
                    weight: 0.3,
                  },
                ],
                isCaseSensitive: false,
                useExtendedSearch: true,
              },
              parsed_index,
            ),
          );
        } catch (e) {
          if (e instanceof Error) {
            console.error(e.message);
            set_error(e.message);
          } else {
            console.error(e);
            set_error(
              "An unexpected error occurred, try again in a few minutes.",
            );
          }
        }
      })
      .catch((e) => {
        console.error(e);
        set_error("An unexpected error occurred, try again in a few minutes.");
      })
      .finally(() => {
        set_loading(false);
      });
  }, []);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Certification</TableHeader>
            <TableHeader>Certification paths</TableHeader>
            <TableHeader className="text-right">More details</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {is_loading && (
            <TableRow>
              <TableCell colSpan={3} className="py-5 px-6 text-center">
                <div className="text-sm text-gray-500 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin mr-2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 3a9 9 0 1 0 9 9" />
                  </svg>
                  Loading data...
                </div>
              </TableCell>
            </TableRow>
          )}
          {display_data
            .slice(
              (pagination.page - 1) * pagination.per_page,
              pagination.page * pagination.per_page,
            )
            .map((certification) => (
              <TableRow
                key={`${certification.provider}-${certification.title}`}
              >
                <TableCell className="font-medium relative py-5 px-6">
                  <div className="flex gap-x-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M13 7h-6l4 5l-4 5h6l4 -5z" />
                    </svg>
                    <div className="flex-auto">
                      <div className="flex items-start gap-x-3">
                        <div className="text-sm font-medium leading-6 text-gray-900">
                          {certification.title}
                        </div>
                        <div
                          className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1
                          ring-inset ring-indigo-600/20"
                        >
                          {certification.acronym}
                        </div>
                      </div>
                      <div className="mt-1 text-xs leading-5 text-gray-500">
                        {certification.provider}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden py-5 px-6 sm:table-cell">
                  <div className="mt-1 text-xs leading-5 text-gray-500">
                    <ul>
                      {certification.career_paths.map((path) => (
                        <li>{path}</li>
                      ))}
                    </ul>
                  </div>
                </TableCell>
                <TableCell className="py-5 px-6 text-right">
                  <div className="flex justify-end">
                    <a
                      href={`/database/${certification.slug}`}
                      className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500 flex items-center"
                    >
                      Expand
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="animate-bounce-horizontal ml-2"
                        aria-hidden="true"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M9 6l6 6l-6 6" />
                      </svg>
                    </a>
                  </div>
                  <div className="mt-1 text-xs leading-5 text-gray-500 tabular-nums text-right">
                    <span>Price</span>
                    <span className="text-gray-900 font-mono">
                      {Number.isNaN(+certification.price)
                        ? certification.price
                            .padStart(8, " ")
                            .replace(/\s/g, "\u00A0")
                        : (+certification.price)
                            .toFixed(2)
                            .padStart(8, " ")
                            .replace(/\s/g, "\u00A0")}
                      {certification.currency}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Pagination className="mt-6">
        {pagination.page > 1 ? (
          <PaginationPrevious href={`/database/?page=${pagination.page - 1}`} />
        ) : (
          <PaginationPrevious href={null} />
        )}
        <PaginationList>
          {Array.from({ length: pagination.page - 1 }).length > 2 ? (
            <>
              <PaginationPage href={`/database/?page=1`}>1</PaginationPage>
              <PaginationPage href={`/database/?page=2`}>2</PaginationPage>
              <PaginationGap />
              {pagination.page > 1 && (
                <PaginationPage href={`/database/?page=${pagination.page - 1}`}>
                  {pagination.page - 1}
                </PaginationPage>
              )}
            </>
          ) : (
            <>
              {pagination.page > 2 && (
                <PaginationPage href={`/database/?page=${pagination.page - 2}`}>
                  {pagination.page - 2}
                </PaginationPage>
              )}
              {pagination.page > 1 && (
                <PaginationPage href={`/database/?page=${pagination.page - 1}`}>
                  {pagination.page - 1}
                </PaginationPage>
              )}
            </>
          )}
          <PaginationPage href={"#"} current>
            {pagination.page}
          </PaginationPage>
          {Array.from({
            length: pagination.total_pages - (pagination.page - 1),
          }).length > 2 ? (
            <>
              {pagination.page < pagination.total_pages - 1 && (
                <PaginationPage href={`/database/?page=${pagination.page + 1}`}>
                  {pagination.page + 1}
                </PaginationPage>
              )}
              <PaginationGap />
              <PaginationPage
                href={`/database/?page=${pagination.total_pages - 1}`}
              >
                {pagination.total_pages - 1}
              </PaginationPage>
              <PaginationPage
                href={`/database/?page=${pagination.total_pages}`}
              >
                {pagination.total_pages}
              </PaginationPage>
            </>
          ) : (
            <>
              {pagination.page < pagination.total_pages && (
                <PaginationPage href={`/database/?page=${pagination.page + 1}`}>
                  {pagination.page + 1}
                </PaginationPage>
              )}
              {pagination.page < pagination.total_pages - 1 && (
                <PaginationPage href={`/database/?page=${pagination.page + 2}`}>
                  {pagination.page + 2}
                </PaginationPage>
              )}
            </>
          )}
        </PaginationList>
        {pagination.page < pagination.total_pages ? (
          <PaginationNext href={`/database/?page=${pagination.page + 1}`} />
        ) : (
          <PaginationNext href={null} />
        )}
      </Pagination>
    </>
  );
};
