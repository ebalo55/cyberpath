import { Badge } from "@components/icon/badge.tsx";
import type { FC } from "react";
import type { CertificationMetadata } from "src/pages/database/data.json.ts";

export const ColCertification: FC<CertificationMetadata> = (certification) => {
    return (
        <div className="flex gap-x-6">
            <Badge class="hidden h-6 w-5 flex-none text-gray-400 sm:block" />
            <div className="flex-auto">
                <div className="flex items-start gap-x-3">
                    <div className="text-sm font-medium leading-6 text-gray-900">
                        { certification.title }
                    </div>
                    <div className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset
                ring-indigo-600/20"
                    >
                        { certification.acronym }
                    </div>
                </div>
                <div className="mt-1 text-xs leading-5 text-gray-500">
                    { certification.provider }
                </div>
            </div>
        </div>
    );
};