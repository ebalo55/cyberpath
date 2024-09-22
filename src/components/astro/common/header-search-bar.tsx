import type { FC } from "react";

interface HeaderSearchBarProps {
    value?: string;
    onInput?: (event: InputEvent) => void;
}

export const HeaderSearchBar: FC<HeaderSearchBarProps> = ({
    value,
    onInput,
}) => {
    return (
        <form className="relative rounded-full shadow-sm"
              method="get"
              action="/database"
        >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500 w-8 h-8">
                <svg xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="1.5"
                     stroke="currentColor"
                     className="size-6"
                >
                    <path stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </div>
            <label htmlFor="query"
                   className="sr-only"
            >
                Search for certification
            </label>
            <input type="text"
                   name="query"
                   id="query"
                   className="block w-full rounded-md border-0 py-1.5 pl-10 text-zinc-900 ring-1 ring-inset ring-zinc-300 bg-white/75
                    placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6
                    min-w-64"
                   placeholder="Search for certification"
                   value={ value }
                   onInput={ onInput }
            />
        </form>
    );
};