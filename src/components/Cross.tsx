import { ReactNode, useEffect, useState } from "react";

interface Props {
  children?: ReactNode;
}

const Cross: React.FC<Props> = ({ children }) => {
    return (
        <li className="flex items-center">
            <svg className="h-6 w-6 flex-none fill-slate-800 stroke-slate-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="7" y1="7" x2="17" y2="17"></line>
                <line x1="7" y1="17" x2="17" y2="7"></line>
            </svg>
            <p className="ml-2">
                { children }
            </p>
        </li>
    )
}

export default Cross;