"use client";
import { useState, useEffect } from "react";
import { countdown } from "@/util/countdown";

export const useCountdown = () => {
  const [count, setCount] = useState(countdown());

  useEffect(() => {
    setInterval(() => setCount(countdown()), 1000);
  }, []);

  return count;
};
