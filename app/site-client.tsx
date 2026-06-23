"use client";

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";

const LOGO_URL = "/Main_Logo.jpg";

/* ─── Test IDs (unchanged for compatibility) ─────────────────── */
const NAV = {
  container: "nav-container",
  logo: "nav-logo",
  linkServices: "nav-link-services",
  linkProcess: "nav-link-process",
  linkEngagement: "nav-link-engagement",
  linkCapability: "nav-link-capability",
  linkContact: "nav-link-contact",
  ctaEmail: "nav-cta-email",
  mobileToggle: "nav-mobile-toggle",
  mobileMenu: "nav-mobile-menu",
};
const HERO       = { section: "hero-section", headline: "hero-headline", ctaPrimary: "hero-cta-primary", ctaSecondary: "hero-cta-secondary", statBlock: "hero-stat-block" };
const SERVICES   = { section: "services-section", card: (id: string) => `services-card-${id}` };
const PROCESS    = { section: "process-section", step: (i: number) => `process-step-${i}` };
const ENGAGEMENT = { section: "engagement-section", option: (i: number) => `engagement-option-${i}`, ctaEmail: "engagement-cta-email" };
const CAPABILITY = { section: "capability-section", project: (id: string) => `capability-project-${id}` };
const CONTACT    = { section: "contact-section", ctaEmail: "contact-cta-email", ctaCalendar: "contact-cta-calendar" };
const FOOTER     = { container: "footer-container", emailLink: "footer-email-link" };

/* ─── Helpers ────────────────────────────────────────────────── */
function Icon({ children }: { children: ReactNode }) {
  return <span aria-hidden="true" className="inline-flex leading-none">{children}</span>;
}

/** Smooth-scroll to a section id, close mobile menu */
function useSmoothNav(setOpen?: (v: boolean) => void) {
  return (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen?.(false);
  };
}

/** Wire up IntersectionObserver to add a loaded class */
function useReveal(ref: React.RefObject<HTMLElement | null>, selector = ".reveal") {
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(selector) ?? [];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en, i) => {
        if (en.isIntersecting) {
          setTimeout(() => {
            (en.target as HTMLElement).classList.add(`${selector.replace(".", "")}--loaded`);
          }, i * 70);
          obs.unobserve(en.target);
        }
      }),
      { threshold: 0.08 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ref, selector]);
}

/* ─── Nav ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const nav = useSmoothNav(setOpen);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { id: "services",   label: "Services",   testId: NAV.linkServices },
    { id: "process",    label: "Process",    testId: NAV.linkProcess },
    { id: "engagement", label: "Engagement", testId: NAV.linkEngagement },
    { id: "capability", label: "Capability", testId: NAV.linkCapability },
    { id: "contact",    label: "Contact",    testId: NAV.linkContact },
  ];

  return (
    <header
      data-testid={NAV.container}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled ? "header-glass py-3" : "py-5"
      }`}
    >
      <div className="container-site flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          data-testid={NAV.logo}
          onClick={(e) => nav(e, "top")}
          className="group flex items-center gap-3"
        >
          <Image
            src={LOGO_URL}
            alt="Waseem Studio"
            width={108}
            height={34}
            className="h-8 w-auto rounded transition-opacity duration-500 group-hover:opacity-80"
          />
          <span className="hidden text-[13px] font-medium tracking-tight text-ink-200 sm:block">
            Waseem<span className="text-ink-500"> / Studio</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              data-testid={l.testId}
              onClick={(e) => nav(e, l.id)}
              className="text-[13px] text-ink-400 transition-colors duration-400 hover:text-ink-50"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="mailto:hello@waseem.studio"
          data-testid={NAV.ctaEmail}
          className="btn btn-primary hidden text-[13px] md:inline-flex"
        >
          Get a free audit <Icon>&rarr;</Icon>
        </a>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          data-testid={NAV.mobileToggle}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-ink-100 md:hidden"
        >
          {open ? <Icon>&times;</Icon> : <Icon>&#9776;</Icon>}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid={NAV.mobileMenu}
          className="container-site mx-auto mt-3 md:hidden"
        >
          <div className="header-glass flex flex-col gap-3 rounded-2xl p-5">
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                data-testid={`${l.testId}-mobile`}
                onClick={(e) => nav(e, l.id)}
                className="text-[15px] text-ink-100"
              >
                {l.label}
              </a>
            ))}
            <a href="mailto:hello@waseem.studio" className="btn btn-primary mt-2 justify-center">
              Get a free audit <Icon>&rarr;</Icon>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const stats = [
    { k: "40 %",    v: "Average reduction\nin manual ops" },
    { k: "3×",      v: "More qualified leads\nvs. cold outreach" },
    { k: "8 wks",   v: "From brief to\nlive system" },
    { k: "24 / 7",  v: "AI agents running\nwhile you sleep" },
  ];

  return (
    <section
      id="top"
      data-testid={HERO.section}
      ref={ref}
      className="relative min-h-screen overflow-hidden pb-28 pt-36 md:pt-44"
    >
      <div className="container-site relative">
        {/* Eyebrow */}
        <div className="reveal mb-10 flex items-center gap-2.5">
          <span className="pulse-dot" />
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink-400">
            AI &amp; Automation Agency — accepting new clients
          </span>
        </div>

        {/* Headline */}
        <h1
          data-testid={HERO.headline}
          className="reveal text-display-xl text-balance font-light text-ink-50"
          style={{ maxWidth: "20ch" }}
        >
          Replace manual work
          with{" "}
          <em className="font-serif italic not-italic text-ink-300">systems</em>
          {" "}that scale.
        </h1>

        {/* Sub + CTAs */}
        <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <p className="reveal max-w-2xl text-[1.05rem] leading-relaxed text-ink-400 lg:col-span-7">
            Waseem Studio builds AI-powered growth infrastructure for SaaS founders,
            SMBs, and enterprise teams. We combine AI agents, marketing automation,
            and lead generation systems so your business runs faster — with fewer
            people doing the work no one should be doing by hand.
          </p>
          <div className="reveal flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <a
              href="mailto:hello@waseem.studio?subject=New%20project%20enquiry"
              data-testid={HERO.ctaPrimary}
              className="btn btn-primary"
            >
              Get a free audit <Icon>&rarr;</Icon>
            </a>
            <a
              href="#capability"
              onClick={(e) => { e.preventDefault(); document.getElementById("capability")?.scrollIntoView({ behavior: "smooth" }); }}
              data-testid={HERO.ctaSecondary}
              className="btn btn-outline"
            >
              See results <Icon>&darr;</Icon>
            </a>
          </div>
        </div>

        {/* Stats */}
        <div data-testid={HERO.statBlock} className="reveal mt-24 md:mt-32">
          <div className="stat-block">
            {stats.map((s) => (
              <div key={s.k} className="stat-item">
                <div className="text-[1.65rem] font-medium tracking-tight text-ink-50 md:text-[2rem]">
                  {s.k}
                </div>
                <div className="mt-1.5 text-[0.78rem] leading-snug text-ink-400 whitespace-pre-line">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────── */
function Services() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const items = [
    {
      id: "ai-automation",
      n: "01",
      title: "AI & Automation",
      copy: "We map every repetitive workflow in your business and replace it with an AI agent or automated pipeline — from inbox triage to contract generation.",
      bullets: ["Custom AI agents (GPT-4o, Claude)", "Workflow automation (Make, n8n, Zapier)", "CRM & ops integration"],
    },
    {
      id: "saas-growth",
      n: "02",
      title: "SaaS Growth Systems",
      copy: "Full-funnel growth infrastructure for SaaS products — onboarding sequences, activation triggers, churn prevention, and expansion revenue playbooks.",
      bullets: ["Product-led growth loops", "Lifecycle email & in-app flows", "Revenue analytics & dashboards"],
    },
    {
      id: "lead-generation",
      n: "03",
      title: "Lead Generation",
      copy: "We build the systems that fill your pipeline — outbound sequences, enrichment, lead scoring, and automated follow-up that runs without a sales team watching it.",
      bullets: ["AI-assisted outbound sequences", "Lead enrichment & scoring", "Automated booking & CRM sync"],
    },
    {
      id: "digital-marketing",
      n: "04",
      title: "Digital Marketing",
      copy: "Paid acquisition, SEO, and content — engineered around data, not guesswork. Every channel ties back to a single source of truth for cost-per-acquisition.",
      bullets: ["Paid search & social (Meta, Google)", "SEO & programmatic content", "Attribution & performance reporting"],
    },
  ];

  return (
    <section
      id="services"
      data-testid={SERVICES.section}
      ref={ref}
      className="relative py-28 md:py-40"
    >
      <hr className="rule" />
      <div className="container-site">
        {/* Header */}
        <div className="reveal mb-16 grid grid-cols-1 gap-10 pt-16 md:mb-24 md:grid-cols-12 md:pt-20">
          <div className="md:col-span-6">
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-ink-500">Services / 01–04</p>
            <h2 className="text-display-lg font-light text-ink-50 text-balance">
              Four disciplines.{" "}
              <em className="font-serif italic not-italic text-ink-400">One growth engine.</em>
            </h2>
          </div>
          <p className="self-end text-[0.95rem] leading-relaxed text-ink-400 md:col-span-5 md:col-start-8">
            Most agencies pick one lane. We connect AI, automation, lead generation,
            and marketing into a single system — so every part compounds the others.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.06] md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              data-testid={SERVICES.card(item.id)}
              className="reveal service-card"
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] tracking-[0.18em] text-ink-600">{item.n}</span>
                <span className="arrow-icon text-ink-400">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <h3 className="mt-10 text-[1.55rem] font-light tracking-tight text-ink-50 md:text-[1.9rem]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-ink-400">
                {item.copy}
              </p>
              <ul className="mt-7 space-y-2">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-[0.82rem] text-ink-300">
                    <span className="h-px w-4 shrink-0 bg-lime-accent opacity-70" />
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process ────────────────────────────────────────────────── */
function Process() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const steps = [
    {
      n: "01",
      title: "Audit & opportunity map",
      days: "Week 1",
      copy: "We interview your team, document every manual process, and score each one by time cost and automation potential. You get a ranked backlog of what to fix first.",
    },
    {
      n: "02",
      title: "System architecture",
      days: "Week 1–2",
      copy: "We design the full data flow — which AI models, which automation platforms, how everything connects to your existing CRM, data warehouse, and comms stack.",
    },
    {
      n: "03",
      title: "Build & integrate",
      days: "Week 2–6",
      copy: "Agents, workflows, and lead pipelines are built in parallel with your team in the loop. Every piece is tested against real data before it touches production.",
    },
    {
      n: "04",
      title: "Activate & hand over",
      days: "Week 6–8",
      copy: "We go live in stages, monitor error rates and output quality, train your team on overrides and escalation paths, and document everything in a living runbook.",
    },
    {
      n: "05",
      title: "Optimise & expand",
      days: "Ongoing",
      copy: "Monthly performance reviews tied to the metrics that matter: hours saved, leads generated, cost per acquisition. We iterate and expand to the next layer of the business.",
    },
  ];

  return (
    <section
      id="process"
      data-testid={PROCESS.section}
      ref={ref}
      className="relative py-28 md:py-40"
    >
      <hr className="rule" />
      <div className="container-site">
        {/* Header */}
        <div className="reveal pt-16 md:pt-20 mb-14 md:mb-20 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-ink-500">How we work</p>
            <h2 className="text-display-lg font-light text-ink-50 text-balance">
              Audit first.{" "}
              <em className="font-serif italic not-italic text-ink-400">Build second.</em>{" "}
              Measure always.
            </h2>
          </div>
          <p className="self-end text-[0.95rem] leading-relaxed text-ink-400 md:col-span-4 md:col-start-9">
            We don't start with tools — we start with your workflow. Every system
            we build is tied to a measurable outcome before the first line runs.
          </p>
        </div>

        {/* Steps */}
        <ol>
          {steps.map((step, i) => (
            <li
              key={step.n}
              data-testid={PROCESS.step(i + 1)}
              className="reveal process-row group"
            >
              {/* Number */}
              <div className="text-[11px] tracking-[0.2em] text-ink-600 pt-0.5">{step.n}</div>

              {/* Title + timeline */}
              <div>
                <h3 className="text-[1.3rem] font-light tracking-tight text-ink-50 transition-colors duration-500 group-hover:text-ink-100 md:text-[1.6rem]">
                  {step.title}
                </h3>
                <span className="mt-2 inline-block text-[10px] uppercase tracking-[0.2em] text-lime-accent/80">
                  {step.days}
                </span>
              </div>

              {/* Copy */}
              <p className="text-[0.9rem] leading-relaxed text-ink-400 md:pt-0.5">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─── Engagement ─────────────────────────────────────────────── */
function Engagement() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const options = [
    {
      title: "Starter",
      meta: "From $2,500 / mo",
      badge: null,
      copy: "One automation system or lead generation channel built, monitored, and optimised. Right for founders validating a growth hypothesis before scaling spend.",
      detail: "1 workflow system · monthly reporting · async support",
    },
    {
      title: "Growth",
      meta: "From $5,500 / mo",
      badge: "Most popular",
      copy: "Full AI + lead generation stack: outbound sequences, CRM automation, and a paid acquisition channel — all managed and reported as one integrated system.",
      detail: "3 workflow systems · weekly reporting · dedicated Slack",
    },
    {
      title: "Scale",
      meta: "Custom pricing",
      badge: null,
      copy: "End-to-end growth infrastructure across AI, SaaS lifecycle, multi-channel marketing, and advanced analytics. Built for teams ready to compound every investment.",
      detail: "Unlimited scope · daily collaboration · embedded team",
    },
  ];

  return (
    <section
      id="engagement"
      data-testid={ENGAGEMENT.section}
      ref={ref}
      className="relative py-28 md:py-40"
    >
      <hr className="rule" />
      <div className="container-site">
        {/* Header */}
        <div className="reveal pt-16 md:pt-20 mb-14 md:mb-20 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-ink-500">Engagement Options</p>
            <h2 className="text-display-lg font-light text-ink-50 text-balance" style={{ maxWidth: "16ch" }}>
              Retainers built for{" "}
              <em className="font-serif italic not-italic text-ink-400">compounding growth.</em>
            </h2>
          </div>
          <a
            href="mailto:hello@waseem.studio?subject=New%20project%20enquiry"
            data-testid={ENGAGEMENT.ctaEmail}
            className="btn btn-outline w-fit self-start md:self-auto"
          >
            Get a free audit <Icon>&rarr;</Icon>
          </a>
        </div>

        {/* Cards */}
        <div className="reveal grid grid-cols-1 gap-5 lg:grid-cols-3">
          {options.map((opt, i) => (
            <article
              key={opt.title}
              data-testid={ENGAGEMENT.option(i + 1)}
              className="engagement-card flex flex-col"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-lime-accent/80">{opt.meta}</span>
                {opt.badge && (
                  <span className="rounded-full border border-lime-accent/25 bg-lime-accent/8 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-lime-accent/70">
                    {opt.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="mt-8 text-[1.55rem] font-light tracking-tight text-ink-50">
                {opt.title}
              </h3>

              {/* Copy */}
              <p className="mt-4 text-[0.88rem] leading-relaxed text-ink-400 flex-1">
                {opt.copy}
              </p>

              {/* Detail line */}
              <p className="mt-6 border-t border-white/[0.06] pt-5 text-[0.78rem] leading-relaxed text-ink-500">
                {opt.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Capability ─────────────────────────────────────────────── */
function Capability() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  const projects = [
    {
      id: "saas-onboarding",
      client: "B2B SaaS — Series A",
      sector: "SaaS / Product-led growth",
      kicker: "AI onboarding agent",
      result: "Trial-to-paid up 34 %",
      copy: "Built a GPT-4o onboarding agent that guides new users to their first value moment, cutting time-to-activation from 6 days to 18 hours and reducing support tickets by half.",
      img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=70",
    },
    {
      id: "outbound-engine",
      client: "Consulting Firm — 12 partners",
      sector: "Professional services",
      kicker: "Outbound lead engine",
      result: "47 qualified calls / month",
      copy: "Replaced a manual prospecting process with an AI-enriched outbound system — intent signals, personalised sequences, and automatic booking — running without a dedicated SDR.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=70",
    },
    {
      id: "ecomm-retention",
      client: "DTC Brand — $8M ARR",
      sector: "E-commerce / Retention",
      kicker: "Lifecycle automation",
      result: "LTV up 28 % in 90 days",
      copy: "Designed and deployed a full post-purchase lifecycle: AI-generated personalised recommendations, reorder triggers, and win-back flows — replacing a static weekly newsletter.",
      img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=70",
    },
    {
      id: "ops-automation",
      client: "Operations Team — 80 staff",
      sector: "Healthcare operations",
      kicker: "Internal AI agents",
      result: "22 hrs / week reclaimed",
      copy: "Mapped 14 manual admin workflows — scheduling, referral triage, document processing — and automated 11 of them with a combination of AI extraction and no-code orchestration.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=70",
    },
    {
      id: "paid-acquisition",
      client: "Fintech Startup — pre-Series A",
      sector: "Fintech / Paid acquisition",
      kicker: "Performance marketing",
      result: "CAC down 41 % in 60 days",
      copy: "Rebuilt their Google and Meta campaigns around a single attribution model, cut wasted spend on bottom-funnel keywords, and introduced creative testing that reduced CAC from $380 to $224.",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=70",
    },
    {
      id: "content-seo",
      client: "SaaS Platform — 4,000 users",
      sector: "SaaS / Content & SEO",
      kicker: "Programmatic SEO",
      result: "3.2× organic traffic in 6 mo",
      copy: "Built a programmatic content engine that generates, reviews, and publishes 200+ intent-matched landing pages per month — fully automated from keyword cluster to indexed page.",
      img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=70",
    },
  ];

  return (
    <section
      id="capability"
      data-testid={CAPABILITY.section}
      ref={ref}
      className="relative py-28 md:py-40"
    >
      <hr className="rule" />
      <div className="container-site">
        {/* Header */}
        <div className="reveal pt-16 md:pt-20 mb-16 md:mb-24 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-ink-500">Results / Case Snapshots</p>
            <h2 className="text-display-lg font-light text-ink-50 text-balance" style={{ maxWidth: "18ch" }}>
              Real outcomes.{" "}
              <em className="font-serif italic not-italic text-ink-400">Measured numbers.</em>
            </h2>
          </div>
          <p className="self-end text-[0.95rem] leading-relaxed text-ink-400 md:col-span-4 md:col-start-9">
            Every project starts with a baseline and a target. These are the numbers
            we actually hit — across AI, automation, lead generation, and paid growth.
          </p>
        </div>

        {/* Project grid — alternating offset */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {projects.map((p, i) => (
            <article
              key={p.id}
              data-testid={CAPABILITY.project(p.id)}
              className={`reveal group ${i % 2 === 1 ? "md:mt-24" : ""}`}
            >
              {/* Thumbnail */}
              <div className="project-thumb">
                <Image
                  src={p.img}
                  alt={p.client}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                {/* Kicker badge */}
                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-ink-100 backdrop-blur-sm">
                  {p.kicker}
                </div>
              </div>

              {/* Meta row */}
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[1.2rem] font-light tracking-tight text-ink-50 md:text-[1.4rem]">
                    {p.client}
                  </h3>
                  <p className="mt-1 text-[0.8rem] text-ink-500">{p.sector}</p>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-ink-600">Result</div>
                  <div className="mt-1 text-[0.8rem] text-lime-accent">{p.result}</div>
                </div>
              </div>

              {/* Copy */}
              <p className="mt-4 max-w-lg text-[0.88rem] leading-relaxed text-ink-400">{p.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ────────────────────────────────────────────────── */
function Contact() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section
      id="contact"
      data-testid={CONTACT.section}
      ref={ref}
      className="relative py-28 md:py-40"
    >
      <hr className="rule" />
      <div className="container-site pt-16 md:pt-20">
        <div className="contact-panel">
          <div className="grid gap-12 md:grid-cols-12">
            {/* Left */}
            <div className="md:col-span-7">
              <p className="mb-5 text-[11px] uppercase tracking-[0.2em] text-lime-accent/75">
                Free growth audit
              </p>
              <h2
                className="text-display-md font-light text-ink-50 text-balance"
                style={{ maxWidth: "18ch" }}
              >
                Tell us where you're losing time. We'll show you where AI fixes it.
              </h2>
              <p className="mt-6 max-w-lg text-[0.95rem] leading-relaxed text-ink-400">
                Book a 30-minute audit call. We'll map your top three manual bottlenecks,
                show you the automation that removes each one, and give you a realistic
                ROI estimate — before any contract is signed.
              </p>

              {/* Expectation strip */}
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  { label: "Audit call", value: "30 min, free" },
                  { label: "Response time", value: "Within 24 hrs" },
                  { label: "First proposal", value: "Delivered in writing" },
                ].map((item) => (
                  <div key={item.label} className="border-t border-white/[0.08] pt-4">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-ink-600">{item.label}</div>
                    <div className="mt-1.5 text-[0.88rem] text-ink-200">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — CTAs */}
            <div className="flex flex-col justify-end gap-3.5 md:col-span-4 md:col-start-9">
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                data-testid={CONTACT.ctaCalendar}
                className="btn btn-primary justify-center text-[0.95rem]"
              >
                Book a free audit call <Icon>&rarr;</Icon>
              </a>
              <a
                href="mailto:hello@waseem.studio?subject=Growth%20audit%20enquiry"
                data-testid={CONTACT.ctaEmail}
                className="btn btn-outline justify-center text-[0.95rem]"
              >
                Email us instead <Icon>&rarr;</Icon>
              </a>
              <p className="text-center text-[0.75rem] text-ink-600">
                No commitment — just a 30-minute conversation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid={FOOTER.container}
      className="relative pb-10 pt-16"
    >
      <hr className="rule" />
      <div className="container-site pt-14">
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3">
              <Image
                src={LOGO_URL}
                alt="Waseem Studio"
                width={120}
                height={38}
                className="h-9 w-auto rounded"
              />
              <span className="text-[13px] font-medium text-ink-200">
                Waseem<span className="text-ink-600"> / Studio</span>
              </span>
            </div>
            <p className="mt-5 text-[0.82rem] leading-relaxed text-ink-500">
              AI &amp; automation agency for SaaS founders, SMBs, and scale-ups.
              We build the systems that replace manual work, generate qualified leads,
              and compound your growth.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-12 text-[0.82rem]">
            <div>
              <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-ink-600">Navigate</div>
              <ul className="space-y-2.5 text-ink-300">
                {["Services", "Process", "Engagement", "Capability"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="transition-colors duration-400 hover:text-lime-accent"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-ink-600">Contact</div>
              <ul className="space-y-2.5 text-ink-300">
                <li>
                  <a
                    data-testid={FOOTER.emailLink}
                    href="mailto:mmuhammadwaseem2004@gmail.com"
                    className="link-underline link-underline-lime transition-colors duration-400 hover:text-lime-accent"
                  >
                    mmuhammadwaseem2004@gmail.com
                  </a>
                </li>
                <li className="text-ink-500">Remote — working globally</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.06] pt-7 text-[0.72rem] text-ink-600 md:flex-row md:items-center md:justify-between">
          <div>© {year} Waseem Studio. AI &amp; Automation Agency.</div>
          <div className="flex items-center gap-1.5">
            <span className="pulse-dot" style={{ width: 5, height: 5 }} />
            <span>Accepting new clients</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function SiteClient() {
  /* Viewport height fix for mobile browsers */
  useEffect(() => {
    const set = () => document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  /* Global lazy-load pass for elements outside section refs */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((en, i) => {
        if (en.isIntersecting) {
          setTimeout(() => (en.target as HTMLElement).classList.add("reveal--loaded"), i * 60);
          obs.unobserve(en.target);
        }
      }),
      { threshold: 0.07 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="grain min-h-screen bg-[#080808] text-ink-50 antialiased">
      <Nav />
      <main>
        <Hero />
        <Services />
        <Process />
        <Engagement />
        <Capability />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}