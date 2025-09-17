"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

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
      <section
        id="home"
        className="relative isolate px-6 pt-14 lg:px-8 animated-gradient"
      >
        <div className="mx-auto max-w-3xl py-60 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Manage Your Money Smarter
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-700">
              Smart Expense Tracker helps you take control of your finances with
              ease. Track, analyze, and optimize your spending in one place.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" onClick={() => router.push("/dashboard")}>
                Get Started
              </Button>
              <a
                href="#features"
                className="text-base font-semibold text-gray-800 hover:text-gray-900"
              >
                Learn more →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section
        id="features"
        className="bg-slate-50 py-24 sm:py-32"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Smarter Expense Management
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to stay financially healthy
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From tracking expenses to generating insights, our tools help you manage money better and save more.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl grid gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <motion.div
                key={feature.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative p-8 bg-white border border-slate-200 rounded-2xl shadow-sm"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="blog"
        className="bg-white py-24 sm:py-32"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Latest from our Blog
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Tips, guides, and strategies to manage your finances better.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* UPDATED: Simple card with no image */}
                <Card className="rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{blog.desc}</p>
                    <Link href={blog.link} passHref>
                      <Button variant="outline">Read More</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* NEW: Merged About & Contact Section */}
      <motion.section
        id="about-contact"
        className="bg-slate-50 py-24 sm:py-32"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            From a Simple Idea to Your Financial Partner
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Smart Expense Tracker was born from a simple need: to bring clarity and control to personal finances without the usual complexity. We believe that managing your money should empower you, not overwhelm you. Your journey is our priority, and we're here to listen. Whether you have a question, a suggestion, or just want to share your success story, we'd love to hear from you.
          </p>
          <div className="mt-10">
            <a
              href="mailto:support@expensetracker.com"
              className="inline-block rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </motion.section>

      <ChatBot />
      <Footer />
    </div>
  );
}