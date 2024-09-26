import { ColMoreDetails } from "@components/astro/database/records-table/col-more-details.tsx";
import { Badge } from "@components/icon/badge.tsx";
import type { FC } from "react";
import type { CertificationMetadata } from "src/pages/database/data.json.ts";

export const ColCertification: FC<CertificationMetadata> = (certification) => {
    return (
        <div className="flex gap-x-6">
            <Badge class="hidden h-6 w-5 flex-none text-gray-400 sm:block" />
            <div className="flex-auto">
                <div className="flex items-start gap-x-3">
                    <h3 className="text-sm font-medium leading-6 text-gray-900 text-wrap">
                        { certification.title }
                    </h3>
                    <div className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset
                ring-indigo-600/20 hidden sm:block ml-auto"
                    >
                        { certification.acronym }
                    </div>
                </div>
                <div className="mt-1 text-xs leading-5 text-gray-500">
                    { certification.provider }
                </div>
                <div className="block sm:hidden text-left">
                    <ColMoreDetails price={ certification.price }
                                    currency={ certification.currency }
                                    slug={ certification.slug }
                    />
                </div>
            </div>
        </div>
    );
};