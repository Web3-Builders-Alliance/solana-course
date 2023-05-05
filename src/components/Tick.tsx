import { ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
}

interface AccountData {
    owner: string,
    address: string,
    github: string
}

const Tick: React.FC<Props> = ({ children }) => {
    return (
        <li className="flex items-center">
            <svg className="h-6 w-6 flex-none fill-slate-700 stroke-green-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
            </svg>
            <p className="ml-4">
                { children }
            </p>
        </li>
    )
}

export default Tick;