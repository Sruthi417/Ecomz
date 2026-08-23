"use client";

import "./Navbar.scss";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  ShoppingBag,
  HambergerMenu
} from "iconsax-react";

// import FurnitureCart from "../../CartComponents/Cart";
// import { useCartStore } from "@/store/cartStore";

const LINKS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    href: "/products",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Support",
    href: "/support",
  },
  {
    label: "Blog",
    href: "/blog",
  },
];

const EASE = [0.22, 1, 0.36, 1];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: -18,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

export default function Navbar() {
//   const { items, openCart } = useCartStore();
//   const cartCount = items.length;

  return (
    <>
      <motion.header
        className="navbar-new"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="navbar-inner"
          variants={item}
        >
          
          <button
            className="navbar-mobile-menu"
            aria-label="Menu"
          >
            <HambergerMenu
              size="24"
              color="#202020"
            />
          </button>

          <Link
            href="/"
            className="navbar-logo"
          >
            <Image 
              src="/nav-logo.png"
              alt="Ecomuz Logo"
              width={90}
              height={30}
              style={{ objectFit: 'contain' }}
              priority
            />
          </Link>

          {/* =========================
              Navigation
          ========================== */}

          <nav className="navbar-links">

            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="navbar-link"
              >
                {link.label}
              </Link>
            ))}

          </nav>

        

          <div className="navbar-actions">

            <button
              className="navbar-cart"
              aria-label="Shopping Cart"
            //   onClick={openCart}
            >
              <ShoppingBag
                size="24"
                variant="Linear"
                color="#202020"
              />
            </button>

            {/* {cartCount > 0 && (
              <span className="navbar-count">
                {cartCount}
              </span>
            )} */}

          </div>

        </motion.div>
      </motion.header>
      {/* <FurnitureCart /> */}
    </>
  );
}