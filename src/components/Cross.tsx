import { ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
}

const Cross: React.FC<Props> = ({ children }) => {
    return (
        <li className="flex items-center">
            <svg className="h-6 w-6 flex-none fill-slate-800 stroke-slate-500 stroke-2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="8" y1="8" x2="16" y2="16"></line>
                <line x1="8" y1="16" x2="16" y2="8"></line>
            </svg>
            <p className="ml-4">
                { children }
            </p>
        </li>
    )
}

export default Cross;