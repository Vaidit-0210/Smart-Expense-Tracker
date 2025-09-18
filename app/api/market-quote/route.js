import { NextResponse } from "next/server";

const cache = new Map();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Stock symbol is required' }, { status: 400 });
    }

    const CACHE_DURATION_MS = 15 * 60 * 1000; 
    const cached = cache.get(symbol);

    if (cached && (Date.now() - cached.timestamp < CACHE_DURATION_MS)) {
        console.log(`✅ Returning CACHED stock data for ${symbol}`);
        return NextResponse.json(cached.data);
    }
    
    console.log(`🔥 Fetching NEW stock data from Alpha Vantage for symbol: ${symbol}`);
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'API key is not configured' }, { status: 500 });
    }
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch from Alpha Vantage API: ${response.statusText}`);
        }
        const data = await response.json();

        const quote = data["Global Quote"];
        if (!quote || Object.keys(quote).length === 0) {
            console.error("Alpha Vantage API did not return a valid stock quote for:", symbol, "Response:", data);
            throw new Error(`No data for symbol ${symbol}. API limit reached or invalid symbol.`);
        }

        const result = {
            currentPrice: parseFloat(quote["05. price"]),
            highPrice: parseFloat(quote["03. high"]),
            lowPrice: parseFloat(quote["04. low"]),
            previousClose: parseFloat(quote["08. previous close"]),
        };
        
        cache.set(symbol, { data: result, timestamp: Date.now() });

        return NextResponse.json(result);

    } catch (error) {
        console.error("[MARKET API ERROR]", error.message);
        return NextResponse.json({ error: `Failed to fetch market data: ${error.message}` }, { status: 500 });
    }
}