import type { HTMLAttributes } from "react";

export interface ExtendedSvg extends HTMLAttributes<"svg"> {
    class?: string;
    "class:list"?: any[] | object | string;
}