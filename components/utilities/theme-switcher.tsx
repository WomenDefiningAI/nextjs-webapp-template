/*
<ai_context>
This client component provides a theme switcher for the app.
</ai_context>
*/

"use client"

import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import type { HTMLAttributes, ReactNode } from "react"

interface ThemeSwitcherProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

export const ThemeSwitcher = ({ children, ...props }: ThemeSwitcherProps) => {
  const { setTheme, theme } = useTheme()

  const handleChange = (theme: "dark" | "light") => {
    localStorage.setItem("theme", theme)
    setTheme(theme)
  }

  return (
    <button
      type="button"
      className={cn(
        "flex size-7 cursor-pointer items-center justify-center rounded-md border bg-transparent p-0 transition-colors hover:bg-accent hover:text-accent-foreground",
        props.className
      )}
      onClick={() => handleChange(theme === "light" ? "dark" : "light")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleChange(theme === "light" ? "dark" : "light")
        }
      }}
    >
      {theme === "dark" ? (
        <Moon className="size-6" />
      ) : (
        <Sun className="size-6" />
      )}
    </button>
  )
}
