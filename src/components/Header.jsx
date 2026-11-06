import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useDeferredGSAP } from "../lib/motion";
import { lockScroll, scrollToTarget } from "../lib/scroll";
import socialLinks, { email } from "../data/socialLinks";
import navLinks from "../data/navLinks";
import RollText from "./ui/RollText";
import logo from "/assets/images/logo.svg";

export default function Header() {
  const [open, setOpen] = useState(false);
  const bar = useRef(null);
  const menu = useRef(null);
  const menuTl = useRef(null);
  const openRef = useRef(open);
  openRef.current = open;

  useDeferredGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const hide = self.direction === 1 && self.scroll() > 240 && !openRef.current;
        gsap.to(bar.current, { yPercent: hide ? -120 : 0, duration: 0.7, ease: "power3.out", overwrite: "auto" });
      },
    });
  });

  const toggleMenu = () => {
    // Built on first use rather than at load, since most visitors never open it.
    menuTl.current ??= gsap
      .timeline({ paused: true })
      .set(menu.current, { visibility: "visible" })
      .fromTo(
        menu.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "expo.inOut" }
      )
      .from(menu.current.querySelectorAll(".menu-link"), { yPercent: 110, duration: 1, stagger: 0.06 }, "-=0.45")
      .from(menu.current.querySelector(".menu-foot"), { autoAlpha: 0, y: 20, duration: 0.8 }, "-=0.7");
    setOpen((v) => !v);
  };

  useEffect(() => {
    if (!menuTl.current) return;
    if (open) menuTl.current.timeScale(1).play();
    else menuTl.current.timeScale(1.6).reverse();
    lockScroll(open);
  }, [open]);

  useEffect(() => () => menuTl.current?.kill(), []);

  const go = (e, href) => {
    e.preventDefault();
    setOpen(false);
    scrollToTarget(href === "#home" ? 0 : href);
  };

  return (
    <>
      <header ref={bar} className="header-blend fixed inset-x-0 top-0 z-50 text-white">
        <div className="flex items-center justify-between px-gutter py-5 md:py-6">
          <a href="#home" onClick={(e) => go(e, "#home")} aria-label="Rajab Aabed — back to top">
            <img src={logo} alt="" width="28" height="24" className="h-6 w-auto md:h-7" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-9 text-[13px] md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}>
                <RollText>{link.label}</RollText>
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            onClick={(e) => go(e, "#contact")}
            className="hidden items-center gap-2.5 text-[13px] md:inline-flex"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-gold" />
            <RollText>Let&rsquo;s talk</RollText>
          </a>

          <button
            type="button"
            onClick={toggleMenu}
            className="text-[13px] uppercase tracking-[0.18em] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <RollText>{open ? "Close" : "Menu"}</RollText>
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menu}
        className="invisible fixed inset-0 z-40 flex flex-col justify-between bg-ink-2 px-gutter pb-8 pt-28 md:hidden"
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav aria-label="Mobile">
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.href} className="overflow-hidden border-b border-line">
                <a
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="menu-link flex items-baseline justify-between py-4 text-[13vw] font-medium leading-none tracking-[-0.04em]"
                >
                  {link.label}
                  <span className="text-xs tracking-normal text-mute tabular-nums">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="menu-foot flex flex-wrap justify-between gap-4 text-sm text-mute">
          <a href={`mailto:${email}`} className="text-bone">
            {email}
          </a>
          <div className="flex gap-5">
            {socialLinks.slice(0, 2).map((s) => (
              <a key={s.id} href={s.link} target="_blank" rel="noreferrer">
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
