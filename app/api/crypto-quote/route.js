import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol'); 

    if (!symbol) {
        return NextResponse.json({ error: 'Crypto symbol is required' }, { status: 400 });
    }
    
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
        
        return NextResponse.json({
            price: parseFloat(exchangeRate["5. Exchange Rate"]),
            name: exchangeRate["2. From_Currency Name"],
        });
    } catch (error) {
        console.error("[CRYPTO API ERROR]", error.message);
        return NextResponse.json({ error: 'Failed to fetch crypto data' }, { status: 500 });
    }
}