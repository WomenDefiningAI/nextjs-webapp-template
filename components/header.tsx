/*
<ai_context>
This client component provides the header for the app.
</ai_context>
*/

"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
// import {
//   SignedIn,
//   SignedOut,
//   SignInButton,
//   SignUpButton,
//   UserButton
// } from "@clerk/nextjs"
import { Menu, Rocket, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ThemeSwitcher } from "./utilities/theme-switcher"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" }
]

const signedInLinks = [{ href: "/todo", label: "Todo" }]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        isScrolled
          ? "bg-background/80 shadow-sm backdrop-blur-sm"
          : "bg-background"
      }`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between p-4">
        <div className="flex items-center space-x-2 hover:cursor-pointer hover:opacity-80">
          <Rocket className="size-6" />
          <Link href="/" className="text-xl font-bold">
            WebApp Template
          </Link>
        </div>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 space-x-2 font-semibold md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1 hover:opacity-80"
            >
              {link.label}
            </Link>
          ))}

          {/* <SignedIn> */}
          {/*  {signedInLinks.map(link => ( */}
          {/*    <Link */}
          {/*      key={link.href} */}
          {/*      href={link.href} */}
          {/*      className="rounded-full px-3 py-1 hover:opacity-80" */}
          {/*    > */}
          {/*      {link.label} */}
          {/*    </Link> */}
          {/*  ))} */}
          {/* </SignedIn> */}
        </nav>

        <div className="hidden items-center space-x-4 md:flex">
          <ThemeSwitcher />
          {/* <SignedOut> */}
          {/* <SignInButton mode="modal"> */}
          {/* <Button variant="ghost">Login</Button> */}
          {/* </SignInButton> */}
          {/* <SignUpButton mode="modal"> */}
          {/* <Button>Sign Up</Button> */}
          {/* </SignUpButton> */}
          {/* </SignedOut> */}
          {/* <SignedIn> */}
          {/* <UserButton afterSignOutUrl="/" /> */}
          {/* </SignedIn> */}
          {/* Static Links Placeholder */}
          <Link href="#">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link href="#">
            <Button>Sign Up</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/80"
          >
            <div className="flex flex-col space-y-4 p-4 pt-20">
              {[...navLinks /* , ...signedInLinks */].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg hover:text-primary"
                  onClick={toggleMenu}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-auto flex items-center space-x-4 border-t pt-4">
                <ThemeSwitcher />
                {/* <SignedOut> */}
                {/* <SignInButton mode="modal"> */}
                {/* <Button variant="ghost" onClick={toggleMenu}>Login</Button> */}
                {/* </SignInButton> */}
                {/* <SignUpButton mode="modal"> */}
                {/* <Button onClick={toggleMenu}>Sign Up</Button> */}
                {/* </SignUpButton> */}
                {/* </SignedOut> */}
                {/* <SignedIn> */}
                {/* <UserButton afterSignOutUrl="/" /> */}
                {/* </SignedIn> */}
                {/* Static Links Placeholder */}
                <Link href="#">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="#">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
