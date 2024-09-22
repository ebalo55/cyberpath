import { ChevronRight } from "@components/icon/chevron-right.tsx";
import type { FC } from "react";
import { padWithSpaces } from "src/lib/pad-with-spaces.ts";
import type { CertificationMetadata } from "src/pages/database/data.json.ts";

export const ColMoreDetails: FC<Pick<CertificationMetadata, "slug" | "price" | "currency">> = (certification) => {
    return (
        <>
            <div className="flex justify-end">
                <a
                    href={ `/database/${ certification.slug }` }
                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500 flex items-center"
                >
                    Expand
                    <ChevronRight className="animate-bounce-horizontal ml-2" />
                </a>
            </div>
            <div className="mt-1 text-xs leading-5 text-gray-500 tabular-nums text-right">
                <span>Price</span>
                <span className="text-gray-900 font-mono">
                    {
                        Number.isNaN(+certification.price)
                        ? padWithSpaces(certification.price, 8)
                        : padWithSpaces((+certification.price).toFixed(2), 8)
                    }
                    { certification.currency }
                </span>
            </div>
        </>
    );
};