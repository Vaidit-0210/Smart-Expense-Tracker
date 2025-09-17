"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { TrendingUp, TrendingDown, Loader2, Bitcoin, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const popularStocks = [
    { symbol: 'RELIANCE.BSE', name: 'Reliance Industries' },
    { symbol: 'TCS.BSE', name: 'Tata Consultancy' },
    { symbol: 'HDFCBANK.BSE', name: 'HDFC Bank' },
    { symbol: 'INFY.BSE', name: 'Infosys' },
    { symbol: 'ITC.BSE', name: 'ITC Limited' },      
    { symbol: 'ICICIBANK.BSE', name: 'ICICI Bank' },     
];

const popularCryptos = [
    { symbol: 'BTC', name: 'Bitcoin' },
    { symbol: 'ETH', name: 'Ethereum' },
];

function MarketPage() {
    const [stockData, setStockData] = useState([]);
    const [cryptoData, setCryptoData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState(null);
    
    const [searchSymbol, setSearchSymbol] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);

    const fetchStockData = useCallback(async () => {
        try {
            const dataPromises = popularStocks.map(stock =>
                fetch(`/api/market-quote?symbol=${stock.symbol}`).then(res => {
                    if (!res.ok) throw new Error(`Failed for ${stock.name}`);
                    return res.json();
                })
            );
            const results = await Promise.all(dataPromises);
            const formattedData = results.map((result, index) => ({
                ...popularStocks[index], ...result,
            }));
            setStockData(formattedData);
            localStorage.setItem('cachedStockData', JSON.stringify(formattedData));
            return true;
        } catch (error) {
            console.error("Stock fetch error:", error);
            return false;
        }
    }, []);

    const fetchCryptoData = useCallback(async () => {
        try {
            const dataPromises = popularCryptos.map(crypto =>
                fetch(`/api/crypto-quote?symbol=${crypto.symbol}`).then(res => {
                    if (!res.ok) throw new Error(`Failed for ${crypto.name}`);
                    return res.json();
                })
            );
            const results = await Promise.all(dataPromises);
            const formattedData = results.map((result, index) => ({
                ...popularCryptos[index], ...result,
            }));
            setCryptoData(formattedData);
            localStorage.setItem('cachedCryptoData', JSON.stringify(formattedData));
            return true;
        } catch (error) {
            console.error("Crypto fetch error:", error);
            return false;
        }
    }, []);
    
    const checkForUpdates = useCallback(async (force = false) => {
        setLoading(true);

        const lastFetchTimestamp = localStorage.getItem('lastFetchTimestamp');
        const now = new Date().getTime();
        const ONE_DAY_MS = 24 * 60 * 60 * 1000;

        const cachedStocks = localStorage.getItem('cachedStockData');
        const cachedCryptos = localStorage.getItem('cachedCryptoData');
        if (cachedStocks) setStockData(JSON.parse(cachedStocks));
        if (cachedCryptos) setCryptoData(JSON.parse(cachedCryptos));
        if (lastFetchTimestamp) setLastUpdated(new Date(parseInt(lastFetchTimestamp)));

        if (force || !lastFetchTimestamp || (now - lastFetchTimestamp > ONE_DAY_MS)) {
            if (force) toast.info("Forcing a manual data refresh...");
            else toast.info("Data is more than 24 hours old, fetching fresh market data...");

            const stockSuccess = await fetchStockData();
            const cryptoSuccess = await fetchCryptoData();

            if (stockSuccess && cryptoSuccess) {
                const newTimestamp = new Date().getTime();
                localStorage.setItem('lastFetchTimestamp', newTimestamp);
                setLastUpdated(new Date(newTimestamp));
                toast.success("Market data updated successfully!");
            } else {
                toast.error("Could not update all data. Displaying last saved info.");
            }
        } else {
            console.log("Data is fresh. Using data from localStorage.");
        }
        setLoading(false);
    }, [fetchStockData, fetchCryptoData]);

    useEffect(() => {
        checkForUpdates();
    }, [checkForUpdates]);


    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchSymbol) return;
        
        setIsSearching(true);
        setSearchResult(null);
        try {
            const symbolToSearch = `${searchSymbol.toUpperCase()}.BSE`;
            const res = await fetch(`/api/market-quote?symbol=${symbolToSearch}`);
            if (!res.ok) throw new Error('Stock not found or API error.');
            const data = await res.json();
            setSearchResult({ name: searchSymbol.toUpperCase(), symbol: symbolToSearch, ...data });
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSearching(false);
        }
    };

    if (loading && stockData.length === 0 && cryptoData.length === 0) {
        return (
            <div className="p-10 h-screen w-full flex justify-center items-center">
                <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
                <p className="ml-4 text-lg text-gray-600">Fetching Live Market Data...</p>
            </div>
        );
    }

    return (
        <div className="p-5 sm:p-10">
            <div className="flex justify-between items-center mb-8">
                <div>
                </div>
                <Button variant="outline" onClick={() => checkForUpdates(true)} disabled={loading}>
                    <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh Data
                </Button>
            </div>

            <div className="mb-10 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Search for a Stock</h3>
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <input 
                        type="text" 
                        value={searchSymbol}
                        onChange={(e) => setSearchSymbol(e.target.value)}
                        placeholder="Enter stock symbol (e.g., ITC)"
                        className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <button type="submit" disabled={isSearching} className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 transition">
                        {isSearching ? <Loader2 className="animate-spin mx-auto" /> : 'Search'}
                    </button>
                </form>
                {searchResult && <div className="mt-6 animate-fade-in"><StockCard stock={searchResult} /></div>}
            </div>

            <div className="mb-8">
                <h2 className="font-bold text-3xl text-gray-800">Market Watch</h2>
                <p className="text-gray-500">
                    {lastUpdated ? `Last updated: ${lastUpdated.toLocaleString()}` : 'Real-time quotes for popular stocks.'}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {stockData.length > 0 ? stockData.map(stock => (
                    <StockCard key={stock.symbol} stock={stock} />
                )) : <p className="text-gray-500 col-span-full">No stock data to display. Try refreshing.</p>}
            </div>

            <div className="mb-8">
                <h2 className="font-bold text-3xl text-gray-800">Crypto Watch</h2>
                <p className="text-gray-500">Real-time quotes for popular cryptocurrencies.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {cryptoData.length > 0 ? cryptoData.map(crypto => (
                    <CryptoCard key={crypto.symbol} crypto={crypto} />
                )) : <p className="text-gray-500 col-span-full">No crypto data to display. Try refreshing.</p>}
            </div>
        </div>
    );
}

function StockCard({ stock }) {
    if (!stock.currentPrice) return null;
    const priceChange = stock.currentPrice - stock.previousClose;
    const percentageChange = (priceChange / stock.previousClose) * 100;
    const isPositive = priceChange >= 0;

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 truncate">{stock.name}</h3>
                    <p className="text-sm text-gray-500">{stock.symbol}</p>
                </div>
                <div className={`p-2 rounded-full ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
            </div>
            <div className="mt-6">
                <p className="text-3xl font-bold text-gray-900">₹{stock.currentPrice?.toLocaleString('en-IN')}</p>
                <p className={`mt-1 font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({percentageChange.toFixed(2)}%)
                </p>
            </div>
            <div className="mt-6 border-t pt-4 text-xs text-gray-500 space-y-2">
                <div className="flex justify-between"><span>High:</span> <span className="font-medium text-gray-700">₹{stock.highPrice?.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between"><span>Low:</span> <span className="font-medium text-gray-700">₹{stock.lowPrice?.toLocaleString('en-IN')}</span></div>
            </div>
        </div>
    );
}

function CryptoCard({ crypto }) {
    if (!crypto.price) return null;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 truncate">{crypto.name}</h3>
                    <p className="text-sm text-gray-500">{crypto.symbol}</p>
                </div>
                <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                    <Bitcoin size={20} />
                </div>
            </div>
            <div className="mt-6">
                <p className="text-3xl font-bold text-gray-900">${crypto.price?.toLocaleString('en-US')}</p>
                <p className="mt-1 text-gray-500">Live Price (USD)</p>
            </div>
        </div>
    );
}

export default MarketPage;