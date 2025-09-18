Smart Expense Tracker - A Next.js Financial Dashboard

<p align="center">
  <img src="logo6.png" alt="Logo" width="250"/>
</p>

Live URL
https://smart-expense-tracker-cyan.vercel.app/

Overview
Smart Expense Tracker is a full-stack financial management application built with Next.js. It provides a clean, intuitive interface for users to track income, log expenses, create budgets, and monitor the stock and cryptocurrency markets in real-time. The project is designed to be a one-stop solution for personal financial oversight.

✨ Core Features
📊 Interactive Dashboard: A central hub for a quick overview of your financial health, including recent transactions and budget status.

💸 Income & Expense Tracking: Seamlessly log all income sources and daily expenses with a user-friendly interface.

🎯 Budget Management: Create and manage custom budgets for different spending categories to prevent overspending and achieve financial goals.

📈 Live Market Watch: A dedicated page to view real-time price data for popular Indian stocks (BSE) and major cryptocurrencies.

🔍 Stock & Crypto Search: Instantly look up the latest price information for any stock or cryptocurrency.

🔐 User Authentication: Secure sign-in and sign-up functionality powered by Clerk to protect your financial data.

🚀 Efficient Data Caching: Implements a smart multi-layer caching strategy (client-side localStorage and server-side API route caching) to ensure a fast, responsive experience while respecting API rate limits.

🛠️ Tech Stack
Framework: Next.js (React)

Database: Neon (PostgreSQL)

Authentication: Clerk

Styling: Tailwind CSS

UI Components: Shadcn UI

Icons: Lucide React

AI / Generative: Google Gemini API

Financial Data API: Alpha Vantage

Notifications: Sonner for elegant toast notifications.

🚀 How to Run Locally
1. Clone the Repository
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
cd your-repo-name

2. Install Dependencies
Install the necessary project dependencies using your preferred package manager:

npm install
# or
yarn install

3. Set Up Environment Variables
This project requires several API keys and credentials to function fully.

Create a file named .env.local in the root of your project by copying the example file:

(.env.example) .env.local

(If you don't have an .env.example, just create .env.local manually.)

Add the following variables to your .env.local file and replace the placeholder values with your actual credentials:

# Neon Database Connection URL
# Get this from your Neon console under 'Connection Details'
NEXT_PUBLIC_DATABASE_URL="YOUR_NEON_DATABASE_URL"

# Clerk Authentication Keys
# Get these from your Clerk dashboard -> API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"
CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"

# Google Gemini API Key for AI features
# Get this from Google AI Studio -> Get API Key
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Alpha Vantage API Key for market data
# Get this from [https://www.alphavantage.co/support/#api-key](https://www.alphavantage.co/support/#api-key)
ALPHA_VANTAGE_API_KEY="YOUR_ALPHA_VANTAGE_API_KEY"

4. Run the Development Server
Start the Next.js development server:

npm run dev

Open http://localhost:3000 with your browser to see the result.