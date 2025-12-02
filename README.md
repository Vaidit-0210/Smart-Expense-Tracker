# Smart Expense Tracker

<p align="center">
  <img src="public/logo6.png" alt="Smart Expense Tracker Logo" width="250"/>
</p>

## Overview

Smart Expense Tracker is a full-stack financial dashboard built with Next.js, Neon (PostgreSQL), Clerk authentication, and Tailwind CSS.  
It helps users manage their finances by tracking income, expenses, budgets, and monitoring stock/crypto markets in real-time.  
The app features a modern UI, secure authentication, and interactive charts for a seamless personal finance experience.

## Features

- **Dashboard:** Quick overview of your financial health, recent transactions, and budget status.
- **Income & Expense Tracking:** Log all income sources and daily expenses.
- **Budget Management:** Create/manage budgets for different categories.
- **Market Watch:** View real-time prices for Indian stocks and major cryptocurrencies.
- **Stock & Crypto Search:** Instantly look up price info for any stock or crypto.
- **Authentication:** Secure sign-in/sign-up powered by Clerk.
- **Notifications:** Elegant toast notifications via Sonner.
- **Dark/Light Mode:** Automatic theme switching with logo adaptation.

---

## Environment Variables

Create a `.env.local` file in your project root and add the following variables:

```env
# Neon Database Connection URL
NEXT_PUBLIC_DATABASE_URL="YOUR_NEON_DATABASE_URL"

# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"
CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"

# Google Gemini API Key (for AI features)
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

# Alpha Vantage API Key (for market data)
ALPHA_VANTAGE_API_KEY="YOUR_ALPHA_VANTAGE_API_KEY"
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials as shown above.

### 4. Run Database Migrations (Drizzle ORM)

```bash
npm run db:push
```

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Routing & Page Structure

- `/` : Landing page (Hero, Features, Blog, About)
- `/sign-in` : Clerk authentication page (redirects to `/dashboard` after login)
- `/dashboard` : Main dashboard overview
- `/dashboard/income` : Income tracking and analytics
- `/dashboard/expenses` : Expenses list and analytics
- `/dashboard/expenses/[id]` : Expense details for a specific budget
- `/dashboard/budgets` : Budget management
- `/dashboard/market` : Stock and crypto market watch
- `/dashboard/tools` : Financial tools/calculators
- `/dashboard/plans` : Financial planning
- `/dashboard/profile` : User profile and settings

**Sidebar navigation** automatically highlights the current page and adapts logo for dark/light mode.

---

## Tech Stack

- **Framework:** Next.js (React)
- **Database:** Neon (PostgreSQL)
- **ORM:** Drizzle ORM
- **Authentication:** Clerk
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn UI
- **Icons:** Lucide React
- **Notifications:** Sonner
- **Financial Data API:** Alpha Vantage
- **AI Features:** Google Gemini API

---

## Contributing

Feel free to fork this repo, open issues, or submit pull requests to improve the project!

---

## License

This project is licensed under the MIT License.

---

**Enjoy tracking your finances with Smart Expense Tracker!**
