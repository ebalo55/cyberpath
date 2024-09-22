"use client";

import type { ExtendedSvg } from "@components/icon/base.ts";
import clsx from "clsx";
import type { FC } from "react";

export const ExternalLink: FC<ExtendedSvg> = ({
    class:        classes,
    "class:list": class_list,
    className,
    ...props
}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             stroke-width="2"
             stroke-linecap="round"
             stroke-linejoin="round"
             className={ clsx([
                 "icon icon-tabler icons-tabler-outline icon-tabler-external-link",
                 className,
                 classes,
                 class_list,
             ]) }
             { ...props }
        >
            <path stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
            />
            <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
            <path d="M11 13l9 -9" />
            <path d="M15 4h5v5" />
        </svg>
    );
};