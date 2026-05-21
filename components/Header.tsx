"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/transactions", label: "Transactions" },
  { href: "/advisory", label: "Advisory Group" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`relative z-50 bg-white border-b transition-all duration-300 ${
        scrolled ? "border-slate-200 shadow-sm" : "border-slate-100"
      }`}
    >
      <div className="container-main flex items-center justify-between h-16 sm:h-20">
        <Link href="/" className="flex items-center group">
          <Image
            src="/logo.svg"
            alt="Aus Trade Fin"
            width={160}
            height={36}
            priority
            className="h-8 sm:h-9 w-auto transition-opacity group-hover:opacity-80"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-navy-400 ${
                pathname === link.href
                  ? "text-navy-900"
                  : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {!isLoading && session ? (
            <Link
              href="/client"
              className="btn-outline text-xs px-4 py-2"
            >
              My Account
            </Link>
          ) : (
            <Link
              href="/client/login"
              className="btn-primary text-xs px-4 py-2"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-navy-900"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-0.5 bg-navy-900"
          />
          <motion.span
            animate={
              mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="block w-5 h-0.5 bg-navy-900"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <nav className="container-main py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium py-2 transition-colors ${
                    pathname === link.href
                      ? "text-navy-900"
                      : "text-slate-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!isLoading && session ? (
                <Link
                  href="/client"
                  className="btn-outline text-xs px-4 py-2 w-fit mt-1"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  href="/client/login"
                  className="btn-primary text-xs px-4 py-2 w-fit mt-1"
                >
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
