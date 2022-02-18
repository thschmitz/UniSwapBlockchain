import {useEffect, useState} from "react"
import {client} from "../lib/sanityClient"
import {useContext} from "react"
import {TransactionContext} from "../context/TransactionContext"
import Image from "next/image"
import ethLogo from "../assets/ethCurrency.png"
import {FiArrowUpRight} from "react-icons/fi"

const style = {
    wrapper: `h-full text-white select-none h-full w-screen flex-1 pt-14 flex items-end justify-end pb-12 overflow-scroll px-8`,
    txHistoryItem: `bg-[#191d1e] rounded-lg px-4 py-2 my-2 flex items-center justify-end`,
    txDetails: `flex items-center`,
    toAddress: `text-[#f48706] mx-2`,
    txTimestamp: `mx-2`,
    etherscanLink: `flex items-center text-[#2172e5]`,
}


const TransactionHistory = () => {
    const {isLoading, setIsLoading, currentAccount} = useContext(TransactionContext)
    const [transactionHistory, setTransactionHistory] = useState([])

    useEffect(() => {
        ;(async () => {
            if(!isLoading && currentAccount){
                const query = `
                    *[_type=="users" && _id == "${currentAccount}"] {
                        "transactionList": transactions[] -> {amount, toAddress, timestamp, txHash}|order(timestamp desc)[0...4]
                    }
                `

                const clientRes = await client.fetch(query)

                setTransactionHistory(clientRes[0].transactionList)
            }
        })()
    }, [isLoading, currentAccount])

    return(
        <div className={style.wrapper}>
            <div>
                {transactionHistory &&
                 transactionHistory?.map((transaction, index) => (
                    <div className={style.txHistoryItem} key={index}>
                        <div className={style.txDetails}>
                            <Image src={ethLogo} height={20} width={15} alt="eth"/>
                            {transaction.amount} - sent to{' '}
                            <span className={style.toAddress}>
                                {transaction.toAddress.substring(0, 6)}
                            </span>
                        </div> {' '}
                        on {' '}
                        <div className={style.txTimestamp}>
                            {new Date(transaction.timestamp).toLocaleString('pt-BR', {
                                timeZone: "America/Sao_Paulo",
                                hour12: true,
                                timeStyle: "short",
                                dateStyle: "long"
                            })}
                        </div>
                        <div className={style.etherscanLink}>
                            <a href={`https://rinkeby.etherscan.io/tx/${transaction.txHash}`} target="_blank" rel="noneferrer" className={style.etherscanLink}>View on etherscan <FiArrowUpRight /></a>
                        </div>
                    </div>
                 ))}
            </div>

        </div>
    )
}

export default TransactionHistory