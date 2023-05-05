import { useWallet } from "@solana/wallet-adapter-react";

const Wallets = () => {
  const { select, wallets, publicKey, disconnect } = useWallet();

  return !publicKey ? (
    <div className="flex flex-col gap-4">
      {wallets.filter((wallet) => wallet.readyState === "Installed").length >
      0 ? (
        wallets
          .filter((wallet) => wallet.readyState === "Installed")
          .map((wallet) => (
            <button
              key={wallet.adapter.name}
              onClick={() => select(wallet.adapter.name)}
              className="inline-flex items-center px-4 py-2 text-md font-medium leading-5 text-center text-slate-200 bg-slate-700 rounded-md shadow-md transition duration-150 ease-in-out hover:bg-slate-400 focus:outline-none focus:shadow-outline-slate focus:border-slate-300 active:bg-slate-400"
            >
              <img
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
                className="h-6 w-6"
              />
              <span className="ml-3">{wallet.adapter.name}</span>
            </button>
          ))
      ) : (
        <p>No wallet found. Please download a supported Solana wallet</p>
      )}
    </div>
  ) : null
};

export default Wallets;
