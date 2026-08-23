"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./Trending.scss";

const TRENDING_PRODUCTS = [
  {
    productId: 1,
    title: "Maison Madeleine",
    description:
      "A refined living space where timeless minimalism meets contemporary craftsmanship. Maison Madeleine celebrates warm natural tones, sculptural forms, and carefully balanced proportions to create an inviting atmosphere of understated luxury.",
    image: "/collection1.webp",
  },
  {
    productId: 2,
    title: "Élan Dining",
    description:
      "Designed around simplicity and function, Élan Dining transforms the dining experience through clean architectural lines, premium materials, and a calming neutral palette that encourages effortless everyday living.",
    image: "/collection2.webp",
  },
  {
    productId: 3,
    title: "Atelier Wall",
    description:
      "A sophisticated wall cabinet collection that blends seamless storage with modern aesthetics. Atelier Wall showcases precision detailing, floating forms, and elegant finishes that elevate contemporary interiors without overwhelming the space.",
    image: "/collection3.jpg",
  },
];

export default function Trending() {
  const pinRef = useRef(null);
  const bgTrackRef = useRef(null);
  const panelRef = useRef(null);
  const layerRefs = useRef([]);

  const trendingProducts = TRENDING_PRODUCTS;

  useLayoutEffect(() => {
    const n = trendingProducts.length;

    if (
      !pinRef.current ||
      !bgTrackRef.current ||
      !panelRef.current ||
      n < 1
    ) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const render = (progress) => {
        const vh = window.innerHeight;

        const translateY =
          -progress * (n - 1) * vh;

        gsap.set(bgTrackRef.current, {
          y: translateY,
        });

        const rect =
          panelRef.current.getBoundingClientRect();

        const cardTop = rect.top;
        const cardBottom = rect.bottom;

        layerRefs.current.forEach((el, j) => {
          if (!el) return;

          // Where product j's background slide
          // sits in the viewport right now.
          const slideTop =
            j * vh + translateY;

          const slideBottom =
            (j + 1) * vh + translateY;

          // Intersect that band with the
          // fixed card rectangle.
          const visTop = Math.max(
            slideTop,
            cardTop
          );

          const visBottom = Math.min(
            slideBottom,
            cardBottom
          );

          if (visBottom <= visTop) {
            gsap.set(el, {
              clipPath:
                "inset(50% 0px 50% 0px)",
              opacity: 0,
            });
          } else {
            const top =
              visTop - cardTop;

            const bottom =
              cardBottom - visBottom;

            gsap.set(el, {
              clipPath: `inset(${top}px 0px ${bottom}px 0px)`,
              opacity: 1,
            });
          }
        });
      };

      const st = ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: () => `+=${n * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: true,

        onUpdate: (self) => {
          render(self.progress);
        },

        onRefresh: (self) => {
          render(self.progress);
        },
      });

      // Initial paint before first scroll event
      render(st.progress || 0);
    }, pinRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="trending-wrapper"
      style={{
        position: "relative",
        zIndex: 20,
      }}
    >
      <section
        ref={pinRef}
        className="trending"
      >

        {/* Sliding background track */}

        <div
          ref={bgTrackRef}
          className="trending__bgTrack"
        >
          {trendingProducts.map(
            (product, index) => (
              <div
                key={product.productId}
                className="trending__bgSlide"
              >
                <Image
                  fill
                  priority={index === 0}
                  src={product.image}
                  alt={product.title}
                  quality={100}
                  sizes="100vw"
                />
              </div>
            )
          )}
        </div>

        <div className="trending__overlay" />

        {/* Static card — one clipped layer per product */}

        <div className="trending__container">

          <div
            ref={panelRef}
            className="trending__panel"
          >
            {trendingProducts.map(
              (product, index) => (
                <div
                  key={product.productId}
                  ref={(el) =>
                    (layerRefs.current[index] = el)
                  }
                  className="trending__layer"
                >

                  <div className="trending__left">

                    <div className="trending__content">

                      <h2>
                        {product.title}
                      </h2>

                      <p>
                        {product.description}
                      </p>

                      <div className="trending__footer">

                        <Link
                          href={`/p/${product.productId}`}
                          className="trending__button"
                        >
                          Shop now
                        </Link>

                      </div>

                    </div>

                  </div>

                  <div className="trending__heroImage">

                    <div className="trending__heroImageInner">

                      <Image
                        fill
                        src={product.image}
                        alt={product.title}
                        quality={90}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />

                    </div>

                  </div>

                </div>
              )
            )}
          </div>

        </div>

      </section>
    </div>
  );
}