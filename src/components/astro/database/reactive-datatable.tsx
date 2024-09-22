"use client";

import { HeaderSearchBar } from "@components/astro/common/header-search-bar.tsx";
import { ColCertificationPath } from "@components/astro/database/records-table/col-certification-path.tsx";
import { ColCertification } from "@components/astro/database/records-table/col-certification.tsx";
import { ColMoreDetails } from "@components/astro/database/records-table/col-more-details.tsx";
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
import { all } from "radash";
import {
    type FC,
    type ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";
import { FuseConfig } from "src/pages/database/data-index.json.ts";
import type {
    CertificationMetadata,
    CertificationMetadataCollection,
} from "src/pages/database/data.json.ts";

interface ReactiveDatatableProps {
    loading: ReactNode;
}

export const ReactiveDatatable: FC<ReactiveDatatableProps> = ({
    loading,
}) => {
    const [ is_loading, set_loading ] = useState(true);
    const [ error, set_error ] = useState<string | null>(null);
    const [ all_raw_data, set_all_raw_data ] =
              useState<CertificationMetadataCollection>([]);
    const [ all_data, set_all_data ] = useState<Fuse<CertificationMetadata>>(
        new Fuse([]),
    );
    const [ query, set_query ] = useState<string>("");
    const [ pagination, set_pagination ] = useState({
        page:        1,
        total_pages: 1,
        per_page:    10,
    });
    const display_data = useMemo(
        () => {
            if (query) {
                const filtered_data = all_data.search(query).flatMap((result) => result.item);
                set_pagination((prev) => ({
                    ...prev,
                    total_pages: Math.ceil(filtered_data.length / pagination.per_page),
                }));
                return filtered_data;
            }
            return all_raw_data;
        },
        [
            all_data,
            query,
            all_raw_data,
        ],
    );

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
        all({
            data:  fetch("/database/data.json"),
            index: fetch("/database/data-index.json"),
        }).then(async ({
                data,
                index,
            }) => {
                if (!data.ok || !index.ok) {
                    set_error(
                        "An unexpected error occurred, try again in a few minutes.",
                    );
                    return;
                }

                try {
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
                    }
                    else {
                        // Set the total number of pages keeping the page number the same
                        set_pagination((prev) => ({
                            ...prev,
                            total_pages,
                        }));
                    }

                    // we have the pre-computed index, so we can just load it into fuse and enjoy the speed
                    const parsed_index = Fuse.parseIndex<CertificationMetadata>(await index.json());

                    set_all_data(
                        new Fuse(
                            all_data,
                            FuseConfig,
                            parsed_index,
                        ),
                    );
                }
                catch (e) {
                    if (e instanceof Error) {
                        console.error(e.message);
                        set_error(e.message);
                    }
                    else {
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
            <div className="grid grid-cols-2 mb-2 mt-4">
                <HeaderSearchBar value={ query }
                                 onInput={ (ev) => set_query(ev.data) }
                />
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Certification</TableHeader>
                        <TableHeader>Certification paths</TableHeader>
                        <TableHeader className="text-right">More details</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { is_loading && (
                        <TableRow>
                            <TableCell colSpan={ 3 }
                                       className="py-5 px-6 text-center"
                            >
                                { loading }
                            </TableCell>
                        </TableRow>
                    ) }
                    { error && (
                        <TableRow>
                            <TableCell colSpan={ 3 }
                                       className="py-5 px-6 text-center"
                            >
                                <p className="text-red-500 font-medium">
                                    { error }
                                </p>
                            </TableCell>
                        </TableRow>
                    ) }
                    { !is_loading && !error && display_data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={ 3 }
                                       className="py-5 px-6 text-center"
                            >
                                <p className="text-zinc-500 font-medium">
                                    No results found
                                </p>
                            </TableCell>
                        </TableRow>
                    ) }
                    { display_data
                        .slice(
                            (pagination.page - 1) * pagination.per_page,
                            pagination.page * pagination.per_page,
                        )
                        .map((certification) => (
                            <TableRow
                                key={ `${ certification.provider }-${ certification.title }` }
                            >
                                <TableCell className="font-medium relative py-5 px-6">
                                    <ColCertification { ...certification } />
                                </TableCell>
                                <TableCell className="hidden py-5 px-6 sm:table-cell">
                                    <ColCertificationPath { ...certification } />
                                </TableCell>
                                <TableCell className="py-5 px-6 text-right">
                                    <ColMoreDetails { ...certification } />
                                </TableCell>
                            </TableRow>
                        )) }
                </TableBody>
                <tfoot>
                    <TableRow>
                        <TableCell colSpan={ 3 }>
                            <p className="ml-auto text-xs text-zinc-700 text-right">
                                Showing { (pagination.page - 1) * pagination.per_page } - { " " }
                                { Math.min(pagination.page * pagination.per_page, display_data.length) } of { " " }
                                { display_data.length } results
                            </p>
                        </TableCell>
                    </TableRow>
                </tfoot>
            </Table>
            <Pagination className="mt-6 justify-end">
                { pagination.page > 1 ? (
                    <PaginationPrevious href={ `/database/?page=${ pagination.page - 1 }` } />
                ) : (
                      <PaginationPrevious href={ null } />
                  ) }
                <PaginationList>
                    { Array.from({ length: pagination.page - 1 }).length > 2 ? (
                        <>
                            <PaginationPage href={ `/database/?page=1` }>1</PaginationPage>
                            <PaginationPage href={ `/database/?page=2` }>2</PaginationPage>
                            <PaginationGap />
                            { pagination.page > 1 && (
                                <PaginationPage href={ `/database/?page=${ pagination.page - 1 }` }>
                                    { pagination.page - 1 }
                                </PaginationPage>
                            ) }
                        </>
                    ) : (
                          <>
                              { pagination.page > 2 && (
                                  <PaginationPage href={ `/database/?page=${ pagination.page - 2 }` }>
                                      { pagination.page - 2 }
                                  </PaginationPage>
                              ) }
                              { pagination.page > 1 && (
                                  <PaginationPage href={ `/database/?page=${ pagination.page - 1 }` }>
                                      { pagination.page - 1 }
                                  </PaginationPage>
                              ) }
                          </>
                      ) }
                    <PaginationPage href={ "#" }
                                    current
                    >
                        { pagination.page }
                    </PaginationPage>
                    { Array.from({
                        length: pagination.total_pages - (pagination.page - 1),
                    }).length > 2 ? (
                          <>
                              { pagination.page < pagination.total_pages - 1 && (
                                  <PaginationPage href={ `/database/?page=${ pagination.page + 1 }` }>
                                      { pagination.page + 1 }
                                  </PaginationPage>
                              ) }
                              <PaginationGap />
                              <PaginationPage
                                  href={ `/database/?page=${ pagination.total_pages - 1 }` }
                              >
                                  { pagination.total_pages - 1 }
                              </PaginationPage>
                              <PaginationPage
                                  href={ `/database/?page=${ pagination.total_pages }` }
                              >
                                  { pagination.total_pages }
                              </PaginationPage>
                          </>
                      ) : (
                          <>
                              { pagination.page < pagination.total_pages && (
                                  <PaginationPage href={ `/database/?page=${ pagination.page + 1 }` }>
                                      { pagination.page + 1 }
                                  </PaginationPage>
                              ) }
                              { pagination.page < pagination.total_pages - 1 && (
                                  <PaginationPage href={ `/database/?page=${ pagination.page + 2 }` }>
                                      { pagination.page + 2 }
                                  </PaginationPage>
                              ) }
                          </>
                      ) }
                </PaginationList>
                { pagination.page < pagination.total_pages ? (
                    <PaginationNext href={ `/database/?page=${ pagination.page + 1 }` } />
                ) : (
                      <PaginationNext href={ null } />
                  ) }
            </Pagination>
        </>
    );
};
