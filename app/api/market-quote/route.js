import { NextResponse } from "next/server";

const cache = new Map();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Crypto symbol is required' }, { status: 400 });
    }
    
    const CACHE_DURATION_MS = 15 * 60 * 1000; 
    const cached = cache.get(symbol);

    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION_MS)) {
        console.log(`✅ Returning CACHED crypto data for ${symbol}`);
        return NextResponse.json(cached.data);
    }
    
    console.log(`🔥 Fetching NEW crypto data from Alpha Vantage for symbol: ${symbol}`);
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const exchangeRate = data["Realtime Currency Exchange Rate"];
        if (!exchangeRate) {
            console.error("Crypto API Error:", data);
            throw new Error("Could not retrieve exchange rate. API limit may be reached.");
        }
        
        const result = {
            price: parseFloat(exchangeRate["5. Exchange Rate"]),
            name: exchangeRate["2. From_Currency Name"],
        };
        cache.set(symbol, { data: result, timestamp: Date.now() });
        
        return NextResponse.json(result);
    } catch (error) {
        console.error("[CRYPTO API ERROR]", error.message);
        return NextResponse.json({ error: 'Failed to fetch crypto data' }, { status: 500 });
    }
}