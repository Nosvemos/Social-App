"use client";

import * as React from "react";
import { Bird } from 'lucide-react'
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button variant='iconButton' size='menuIcon' onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <Bird className='size-9'/>
    </Button>
  );
}