import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Criptocurrency, CryptoPrice, Pair } from "./types";
import { fecthCurrentCryptoPrice, getCryptos } from "./services/CryptoService";

type CryptoStore = {
    cryptocurrencies: Criptocurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptocurrencies: [],
    result: {
        IMAGEURL: "",
        PRICE: "",
        HIGHDAY: "",
        LOWDAY: "",
        CHANGEPCT24HOUR: "",
        LASTUPDATE: ""
    },
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await fecthCurrentCryptoPrice(pair)
        set(() => ({
            result,
            loading: false
        }))
    }
})))