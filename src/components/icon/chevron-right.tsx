"use client";

import type { ExtendedSvg } from "@components/icon/base.ts";
import clsx from "clsx";
import type { FC } from "react";

export const ChevronRight: FC<ExtendedSvg> = ({
    class:        classes,
    "class:list": class_list,
    className,
    ...props
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={ clsx([
                "icon icon-tabler icons-tabler-outline icon-tabler-chevron-right",
                className,
                classes,
                class_list,
            ]) }
            aria-hidden="true"
            { ...props }
        >
            <path stroke="none"
                  d="M0 0h24v24H0z"
                  fill="none"
            />
            <path d="M9 6l6 6l-6 6" />
        </svg>
    )
        ;
};