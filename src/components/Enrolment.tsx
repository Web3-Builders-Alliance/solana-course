import { useEffect, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import axios from "axios";
import Tick from "./Tick";
import Cross from "./Cross";
import Spinner from "./Spinner";
import Image from "next/image";

interface Props {
  publicKey?: string;
}

interface AccountData {
    owner: string,
    address: string,
    github: string,
    avatar: string,
    repo: string
}

const ExampleComponent: React.FC<Props> = ({ publicKey }) => {
    const [accountData, setAccountData] = useState<AccountData>({ owner: "", address: "", github: "", avatar: "", repo: ""});
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        const fetchAccountData = async () => {
            const pubkey = new PublicKey(publicKey!)
            const programId = new PublicKey('HC2oqz2p6DEWfrahenqdq2moUcga9c9biqRBcdK3XKU1')
            const prereq = new TextEncoder().encode('prereq')
            const [ pda, _bump ] = PublicKey.findProgramAddressSync([prereq, pubkey.toBytes()], programId)
            const address = pda.toBase58();
            const { data } = await axios.post('https://api.devnet.solana.com', {
                "jsonrpc": "2.0",
                "id": 1,
                "method": "getAccountInfo",
                "params": [
                address,
                    {
                        "encoding": "jsonParsed"
                    }
                ]
            });
            console.log(data);
            const bytes = Buffer.from(data.result?.value?.data[0], 'base64');
            const github_string = bytes.subarray(12,51).toString("utf-8").replace("\0", "");
            const owner = new PublicKey(bytes.subarray(51, 83)).toBase58();
            setAccountData({
                ...accountData,
                owner,
                address,
                github: github_string
            })
            const { data: github_user } = await axios.get(`https://api.github.com/users/${github_string}`);
            const github = github_user.login || null;
            const avatar = github_user.avatar_url || null;
            setAccountData({
                ...accountData,
                github,
                avatar
            })
            const { data: github_repo } = await axios.get(`https://api.github.com/repos/Web3-Builders-Alliance/${github}-Solana-Q2-2023`)
            const repo = github_repo.name || null
            setAccountData({
                ...accountData,
                repo
            })
            setLoading(false);
        }
        fetchAccountData().catch((e) => {
            setLoading(false)
            console.error(e)
        });
    }, [publicKey]);

    if(!publicKey) return null;

    return <ul className="space-y-3">
        {loading ? 
        <Spinner /> : 
        accountData ?    
            <>   
                {
                    accountData.avatar && accountData.github ? <img alt={accountData.github} className="w-20 rounded-md mx-auto mb-10 border border-slate-600" src={accountData.avatar} /> : null
                }
                <Tick>Account created</Tick>
                <Tick>Owner match</Tick>
                {
                    accountData.avatar ? <Tick>Github:<code className="text-sm ml-2 font-bold bg-slate-700 px-2 py-1">{ accountData.github }</code></Tick> : <Cross>Github user <code className="text-sm ml-2 font-bold bg-slate-700 px-2 py-1">{ accountData.github }</code> not found</Cross>
                }
                {
                    accountData.repo ? <Tick>Repo: {accountData.repo}</Tick> : <Cross>Git repo not configured yet</Cross>
                }
            </>
        :
            <Cross>Account not found</Cross>
        }
        </ul>
};

export default ExampleComponent;
