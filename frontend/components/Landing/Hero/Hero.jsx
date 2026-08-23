"use client";

import "./Hero.scss";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   Slider Images
===================================================== */

const SLIDES = [
  {
    image: "/Hero1.avif",
    title: "Designed for\nmodern living",
    subtitle:
      "Furniture that turns a house into a calm, modern home you'll love coming back to every single day.",
  },
  {
    image:"/Hero2.avif",
    title: "Designed for\nmodern living",
    subtitle:
      "Furniture that turns a house into a calm, modern home you'll love coming back to every single day.",
  },
];

/* =====================================================
   Animation
===================================================== */

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    y: "120%",
  },
  show: {
    y: 0,
    transition: {
      duration: 1.2,
      ease: EASE,
    },
  },
};

const buttonItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: EASE,
    },
  },
};

/* =====================================================
   Hero
===================================================== */

export default function Hero() {
  const [current, setCurrent] = useState(0);

  /* ---------------------------------- */
  /* Auto Slider                        */
  /* ---------------------------------- */

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        pin: true,
        pinSpacing: false
      });
    });

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 4000);

    return () => {
      clearInterval(timer);
      ctx.revert();
    };
  }, []);

  const nextThumb =
    SLIDES[(current + 1) % SLIDES.length];

  const activeSlide = SLIDES[current];

    return (
    <section className="hero">

      {/* =======================================
          Background Images
      ======================================== */}

      <div className="hero-bg">

        <AnimatePresence>

          <motion.div
            key={current}
            className="hero-bg-slide"
            initial={{
              opacity: 0,
              scale: 1.05,
              filter: "brightness(0.6)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "brightness(1.05)",
            }}
            exit={{
              opacity: 0,
              scale: 1,
              filter: "brightness(0.6)",
            }}
            transition={{
              duration: 1.6,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Image
              src={activeSlide.image}
              alt={activeSlide.title}
              fill
              priority
              className="hero-bg-image"
            />
          </motion.div>

        </AnimatePresence>

        <div className="hero-overlay" />

      </div>

      {/* =======================================
          Content
      ======================================== */}

      <div className="hero-container">

        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >

          <h1 className="hero-title">
            {activeSlide.title.split("\n").map((line, index) => (
              <span key={index} style={{ display: "block", overflow: "hidden", paddingBottom: "0.1em", marginBottom: "-0.1em" }}>
                <motion.span variants={item} style={{ display: "block" }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <div style={{ overflow: "hidden", marginTop: "20px" }}>
            <motion.p
              variants={item}
              className="hero-description"
              style={{ marginTop: 0 }}
            >
              {activeSlide.subtitle}
            </motion.p>
          </div>

          <motion.div
            variants={buttonItem}
          >
            <Link
              href="/shop"
              className="hero-button"
            >
              Shop now
            </Link>
          </motion.div>

        </motion.div>

      </div>

      {/* =======================================
          Right Preview Images
      ======================================== */}

      <motion.div
        className="hero-preview"
        initial={{ opacity: 0, scale: 1.05, y: "-50%" }}
        animate={{ opacity: 1, scale: 1, y: "-50%" }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      >

        {SLIDES.map((slide, index) => (
          <motion.div
            key={index}
            className={`hero-thumb ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              className="hero-thumb-image"
            />
          </motion.div>
        ))}

      </motion.div>

    </section>
  );
}