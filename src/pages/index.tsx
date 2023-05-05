import { useWallet } from "@solana/wallet-adapter-react";

import dynamic from "next/dynamic";
import Image from "next/image";

const Nav = dynamic(() => import("../components/Nav"), { ssr: false });
const Wallets = dynamic(() => import("../components/Wallets"), { ssr: false });
const Enrolment = dynamic(() => import("../components/Enrolment"), { ssr: false });
export default function Index() {
    const { publicKey } = useWallet();
    return (
        <div className="flex flex-col items-center gap-4 h-screen bg-slate-900 text-slate-200">
            <Nav />
            <div className="relative bg-slate-800 border border-slate-700 px-4 py-4 my-auto shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
                <div className="mx-auto max-w-md">
                    <div className="space-y-6 py-8 text-base leading-7 text-slate-200">
                        <Image src="/logo.svg" className="w-24 mx-auto" alt="Web3 Builders Alliance" />
                    </div>
                    <div className="space-y-6 py-8 text-base leading-7 text-slate-200">
                        <Wallets />
                        { publicKey && <Enrolment publicKey={publicKey?.toBase58()} /> }
                    </div>
                </div>
            </div>
        </div>
    );
}