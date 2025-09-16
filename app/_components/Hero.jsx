"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Footer from "./Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ChatBot from "./ChatBot";

const features = [
  {
    name: "Track Expenses",
    description:
      "Log daily transactions effortlessly and categorize your expenses for better visibility.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Secure Data",
    description:
      "All your financial records are encrypted and stored securely with SSL protection.",
    icon: LockClosedIcon,
  },
  {
    name: "Smart Insights",
    description:
      "Visualize your spending habits with detailed charts, reports, and AI-based suggestions.",
    icon: ArrowPathIcon,
  },
  {
    name: "Budget Control",
    description:
      "Set monthly budgets and receive alerts when nearing spending limits to stay on track.",
    icon: FingerPrintIcon,
  },
];

export default function Hero() {
  const { user } = useUser();
  const router = useRouter();
  const blogs = [
    {
      title: "Top 5 Tips to Save Money Every Month",
      desc: "Learn simple yet effective strategies to save money and build better financial habits.",
      link: "/blog/save-money-tips",
    },
    {
      title: "How to Track Daily Expenses Effectively",
      desc: "Master the art of tracking expenses to stay in control of your finances.",
      link: "/blog/track-expenses",
    },
    {
      title: "Best Budgeting Strategies for Students",
      desc: "Discover budgeting methods that help students manage their limited income smartly.",
      link: "/blog/student-budgeting",
    },
  ];

  return (
    <div className="bg-white text-gray-900">
      {/* HERO SECTION */}
      <section className="relative isolate px-6 pt-20 lg:px-8">
        <div className="mx-auto max-w-3xl py-20 text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
            Manage Your Money Smarter
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Smart Expense Tracker helps you take control of your finances with
            ease. Track, analyze, and optimize your spending in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button onClick={() => router.push("/dashboard")}>
              Get Started
            </Button>
            <a
              href="#features"
              className="text-base font-semibold text-gray-700 hover:text-gray-900"
            >
              Learn more →
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-gray-200 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-sm font-semibold text-indigo-600">
              Smarter Expense Management
            </h2>
            <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              Everything you need to stay financially healthy
            </p>
            <p className="mt-6 text-lg text-gray-600">
              From tracking expenses to generating insights, our Smart Expense
              Tracker provides the tools you need to manage your money better
              and save more.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-4xl grid gap-10 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="flex items-start space-x-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg">
                  <feature.icon
                    aria-hidden="true"
                    className="h-6 w-6 text-indigo-600"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{feature.name}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Latest from our Blog
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tips, guides, and strategies to manage your finances better.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {blogs.map((blog, index) => (
              <Card
                key={index}
                className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{blog.desc}</p>
                  <Link href={blog.link}>
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="bg-gray-200 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">About Us</h2>
          <p className="mt-4 text-gray-600">
            Smart Expense Tracker is built to help people take control of their
            finances with simplicity and security.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="mt-4 text-gray-600">
            Have questions? Reach out to us and we’ll be happy to help.
          </p>
          <a
            href="mailto:support@expensetracker.com"
            className="mt-6 inline-block rounded-md bg-indigo-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Contact Us
          </a>
        </div>
      </section>

      <ChatBot />

      <Footer />
    </div>
  );
}
