import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

const Nav = () => {
  const { publicKey, disconnect } = useWallet();
  return (
    <header className="w-full flex sticky top-0 items-center py-2 px-2">
      <Image width={30} height={40} src="/logo-glyph.svg" className="h-10 mr-auto" alt="Web3 Builders Alliance" />
      { publicKey ?
        <button onClick={disconnect} className="relative flex items-center justify-center ml-auto p-0.5 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-slate-900 rounded-md group-hover:bg-opacity-0">
            Disconnect
          </span>
        </button> : null
      }
    </header>
  )
};

export default Nav;
