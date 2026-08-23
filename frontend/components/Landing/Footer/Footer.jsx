"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bag } from "iconsax-react";
import { RiTwitterXLine, RiLinkedinFill, RiInstagramLine, RiFacebookFill, RiYoutubeFill } from "react-icons/ri";

import "./Footer.scss";

const PAGES = [
  { title: "Home", href: "/" },
  { title: "Shop", href: "/shop" },
  { title: "About", href: "/about" },
  { title: "Support", href: "/support" },
  { title: "Blog", href: "/blog" },
];

const STORES = [
  {
    city: "Ecomuz Zwolle",
    address: [
      "Hanzelaan 351 8017",
      "JM Zwolle Netherlands",
    ],
    phone: "+31 (0)38-760 1750",
  },
  {
    city: "Ecomuz Amsterdam",
    address: [
      "Moermanskkade 313 1013 BC",
      "Amsterdam",
    ],
    phone: "+31 (0)20-354 0259",
  },
  {
    city: "Ecomuz Lisbon",
    address: [
      "Fontes Pereira de Melo 14/Lisboa",
      "Portugal",
    ],
    phone: "+351 (0)20-354 0259",
  },
];

export default function Footer() {
  return (
    <footer className="fur-footer">

      <div className="fur-footer__container">

        <motion.div
          className="fur-footer__top"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
        >

          <div className="fur-footer__topRow">

            <div className="fur-footer__left">
              <h2>
                Explore more <span className="fur-footer__muted">products</span>
                <br />
                crafted just for <span className="fur-footer__muted">your needs</span>
              </h2>
            </div>

            <div className="fur-footer__logo">
              <Image
                src="/Footer-logo.png"
                alt="Ecomuz"
                width={720}
                height={180}
                priority
              />
            </div>

          </div>

          <div className="fur-footer__bottomRow">

            <div className="fur-footer__newsletter">
              <span className="fur-footer__labels">
                 Business email
              </span>

              <form className="fur-footer__form">
                <input
                  type="email"
                  placeholder="Email address"
                />
                <button type="submit">
                  Subscribe
                </button>
              </form>
            </div>

            <div className="fur-footer__policies">
              <Link href="/">
                Shipping & Returns
              </Link>
              <Link href="/">
                Terms & Conditions
              </Link>
              <Link href="/">
                Privacy Policy
              </Link>
            </div>

          </div>

        </motion.div>

        <div className="fur-footer__divider" />

        <div className="fur-footer__middle">

          <div className="fur-footer__pages">

            <span className="fur-footer__labels">
              ○ Pages
            </span>

            <nav>

              {PAGES.map((page) => (

                <Link
                  key={page.title}
                  href={page.href}
                >
                  {page.title}
                </Link>

              ))}

            </nav>

          </div>

          {STORES.map((store) => (

            <div
              key={store.city}
              className="fur-footer__store"
            >

              <span className="fur-footer__label">
                ○ {store.city}
              </span>

              <div className="fur-footer__address">

                {store.address.map((line) => (

                  <p key={line}>
                    {line}
                  </p>

                ))}

                <a href={`tel:${store.phone}`}>
                  {store.phone}
                </a>

              </div>

            </div>

          ))}
                  </div>

        <div className="fur-footer__bottom">

          <div className="fur-footer__copyright">

            Copyright & design by
            <span> @Ecomuz · 2026</span>

          </div>

          <div className="fur-footer__socials">

            <Link
              href="https://instagram.com"
              target="_blank"
              aria-label="Instagram"
            >
              <RiInstagramLine size="22" />
            </Link>

            <Link
              href="https://youtube.com"
              target="_blank"
              aria-label="YouTube"
            >
              <RiYoutubeFill size="22" />
            </Link>

            <Link
              href="https://facebook.com"
              target="_blank"
              aria-label="Facebook"
            >
              <RiFacebookFill size="22" />
            </Link>

            <Link
              href="https://x.com"
              target="_blank"
              aria-label="X"
            >
              <RiTwitterXLine />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              aria-label="LinkedIn"
            >
              <RiLinkedinFill size="22" />
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}