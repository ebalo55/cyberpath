import type { SVGProps } from "react";

export interface ExtendedSvg extends SVGProps<SVGSVGElement> {
    class?: string;
    "class:list"?: any[] | object | string;
}