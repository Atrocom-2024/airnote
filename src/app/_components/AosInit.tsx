'use client';

import { useEffect } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';

export default function AosInit() {
  useEffect(() => {
    Aos.init();
  }, []);

  return null;
}