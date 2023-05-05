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
        const fetchGithubUser = async (username: string) => {
            let github = '';
            let avatar = '';
            try {
                const { data } = await axios.get(`https://api.github.com/users/${username}`);
                github = data.login;
                avatar = data.avatar_url;
            } catch(e) {
                console.error(e);
            }
            return { github, avatar }
        }

        const fetchGithubRepo = async (username: string) => {
            let repo = '';
            try {
                const { data } = await axios.get(`https://api.github.com/repos/Web3-Builders-Alliance/${username}-Solana-Q2-2023`)
                repo = data.name
            } catch(e) {
                console.error(e)
            }
            return { repo }
        }

        const loadEnrolment = async (publicKey: string) => {
            let github = '';
            let owner = '';
            let address = '';
            try {
                const pubkey = new PublicKey(publicKey!)
                const programId = new PublicKey('HC2oqz2p6DEWfrahenqdq2moUcga9c9biqRBcdK3XKU1')
                const prereq = new TextEncoder().encode('prereq')
                const [ pda, _bump ] = PublicKey.findProgramAddressSync([prereq, pubkey.toBytes()], programId)
                address = pda.toBase58();
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
                const bytes = data.result?.value?.data[0] ? Buffer.from(data.result?.value?.data[0], 'base64') : null;
                if (!bytes) { 
                    address = '';                   
                    throw new Error("Data not found")
                }
                github = bytes.subarray(12,51).toString("utf-8").replace("\0", "")
                owner = new PublicKey(bytes.subarray(51, 83)).toBase58()
            } catch (e) {
                console.error(e)
            }
            return {
                address,
                github,
                owner                
            }
        }

        const fetchAccountData = async (publicKey: string) => {
            let acc: AccountData = { ...accountData, ...(await loadEnrolment(publicKey)) };
            acc = { ...acc, ...(await fetchGithubUser(acc.github)) };
            acc = { ...acc, ...(await fetchGithubRepo(acc.github)) };            
            setAccountData(acc)
            setLoading(false);
        }
        setLoading(true)
        fetchAccountData(publicKey!).catch((e) => {
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
                {
                    accountData.address ? <Tick>Account created</Tick> : <Cross>Account not found</Cross>
                }
                {
                    accountData.avatar ? 
                    <Tick>Github:<code className="text-sm ml-2 font-bold bg-slate-700 px-2 py-1">{ accountData.github }</code></Tick> : 
                    <Cross>Github user {accountData.github ? <code className="text-sm ml-2 font-bold bg-slate-700 px-2 py-1">{ accountData.github }</code> : null } not found</Cross>
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
