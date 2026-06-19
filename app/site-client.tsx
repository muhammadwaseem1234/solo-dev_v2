"use client";

import { type MouseEvent, type ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";

const LOGO_URL =
  "/Main_Logo.jpg";

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

const HERO = {
  section: "hero-section",
  headline: "hero-headline",
  ctaPrimary: "hero-cta-primary",
  ctaSecondary: "hero-cta-secondary",
  statBlock: "hero-stat-block",
};

const SERVICES = {
  section: "services-section",
  card: (id: string) => `services-card-${id}`,
};

const PROCESS = {
  section: "process-section",
  step: (index: number) => `process-step-${index}`,
};

const ENGAGEMENT = {
  section: "engagement-section",
  option: (index: number) => `engagement-option-${index}`,
  ctaEmail: "engagement-cta-email",
};

const CAPABILITY = {
  section: "capability-section",
  project: (id: string) => `capability-project-${id}`,
};

const CONTACT = {
  section: "contact-section",
  ctaEmail: "contact-cta-email",
  ctaCalendar: "contact-cta-calendar",
};

const FOOTER = {
  container: "footer-container",
  emailLink: "footer-email-link",
};

function Icon({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="inline-flex leading-none">
      {children}
    </span>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (
    event: MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  const links = [
    { id: "services", label: "Services", testId: NAV.linkServices },
    { id: "process", label: "Process", testId: NAV.linkProcess },
    { id: "engagement", label: "Engagement", testId: NAV.linkEngagement },
    { id: "capability", label: "Capability", testId: NAV.linkCapability },
    { id: "contact", label: "Contact", testId: NAV.linkContact },
  ];

  return (
    <header
      data-testid={NAV.container}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-premium ${
        scrolled ? "header-background py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
        <a
          href="#top"
          data-testid={NAV.logo}
          onClick={(event) => handleAnchor(event, "top")}
          className="group flex items-center gap-3"
        >
          <Image
            src={LOGO_URL}
            alt="Waseem Studio"
            width={120}
            height={36}
            className="h-9 w-auto rounded-md transition-transform duration-700 ease-premium group-hover:scale-105"
          />
          <span className="hidden text-sm font-medium tracking-tight text-ink-100 sm:inline-block">
             Waseem <span className="text-ink-400">/ Studio</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-testid={link.testId}
              onClick={(event) => handleAnchor(event, link.id)}
              className="text-sm text-ink-300 transition-colors duration-500 ease-premium hover:text-ink-50"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="mailto:hello@waseem.studio"
          data-testid={NAV.ctaEmail}
          className="btn-pill btn-pill--primary hidden text-sm md:inline-flex"
        >
          Start a project
          <Icon>&rarr;</Icon>
        </a>

        <button
          aria-label="Toggle menu"
          data-testid={NAV.mobileToggle}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-100 md:hidden"
        >
          {open ? <Icon>&times;</Icon> : <Icon>&#9776;</Icon>}
        </button>
      </div>

      {open && (
        <div
          data-testid={NAV.mobileMenu}
          className="header-background mx-4 mt-3 flex flex-col gap-4 rounded-2xl p-5 md:hidden"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              data-testid={`${link.testId}-mobile`}
              onClick={(event) => handleAnchor(event, link.id)}
              className="text-base text-ink-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:hello@waseem.studio"
            className="btn-pill btn-pill--primary justify-center"
          >
            Start a project <Icon>&rarr;</Icon>
          </a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = wrap.current?.querySelectorAll(".lazy-load") ?? [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add("lazy-load--loaded"),
              index * 80,
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="top"
      data-testid={HERO.section}
      ref={wrap}
      className="relative min-h-screen overflow-hidden pb-24 pt-32 md:pt-40"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 h-[60vmin] w-[60vmin] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(208,255,113,0.10), transparent 70%)",
          filter: "blur(20px)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-[40vmin] w-[40vmin] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.06), transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="lazy-load mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink-400">
          <span className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-lime-accent" />
          Independent web partner &mdash; booking Q1
        </div>

        <h1
          data-testid={HERO.headline}
          className="lazy-load max-w-[18ch] text-balance font-display text-[12vw] font-light leading-tighter tracking-tightest text-ink-50 sm:text-[10vw] lg:text-[7.4vw] xl:text-[6.6vw]"
        >
          Websites that turn{" "}
          <span className="font-serif italic text-ink-300">visits</span> into{" "}
          <span className="relative inline-block">
            <span className="relative z-10">conversations.</span>
            <span
              aria-hidden="true"
              className="absolute bottom-[0.08em] left-0 right-0 -z-0 h-[0.18em] bg-lime-accent/90"
            />
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
          <p className="lazy-load max-w-2xl text-pretty text-lg leading-snug text-ink-300 md:text-xl lg:col-span-7">
            Waseem Studio is the independent web partner for founders and
            service teams. We design and build fast, persuasive sites with clear
            positioning, smooth interactions, and the technical setup needed to
            turn visits into serious client conversations.
          </p>

          <div className="lazy-load flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
            <a
              href="mailto:hello@waseem.studio?subject=New%20project%20enquiry"
              data-testid={HERO.ctaPrimary}
              className="btn-pill btn-pill--primary"
            >
              Email the studio
              <Icon>&rarr;</Icon>
            </a>
            <a
              href="#capability"
              onClick={(event) => {
                event.preventDefault();
                document
                  .getElementById("capability")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid={HERO.ctaSecondary}
              className="btn-pill btn-pill--ghost"
            >
              See capability
              <Icon>&darr;</Icon>
            </a>
          </div>
        </div>

        <div
          data-testid={HERO.statBlock}
          className="lazy-load mt-24 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 md:mt-32 md:grid-cols-4 md:gap-10"
        >
          {[
            { k: "07 yrs", v: "Designing & shipping for founders" },
            { k: "60+", v: "Sites in production" },
            { k: "3-6 wks", v: "Typical project window" },
            { k: "1 partner", v: "Senior, end-to-end - no handoff" },
          ].map((stat) => (
            <div key={stat.k}>
              <div className="text-2xl font-medium tracking-tight text-ink-50 md:text-3xl">
                {stat.k}
              </div>
              <div className="mt-1.5 max-w-[22ch] text-sm leading-snug text-ink-400">
                {stat.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    {
      id: "sales-website",
      n: "01",
      title: "Sales Websites",
      copy: "High-intent marketing sites built for clarity, speed and conversion. Positioning, narrative, design and build - one continuous track.",
      bullets: [
        "Positioning & messaging",
        "Conversion-led design",
        "Analytics & instrumentation",
      ],
    },
    {
      id: "responsive-app",
      n: "02",
      title: "Responsive Web Apps",
      copy: "Marketing-grade product surfaces. Auth, dashboards, billing and admin - engineered to feel as good as your landing page.",
      bullets: [
        "React / Next.js front-ends",
        "FastAPI back-ends",
        "Stripe & auth flows",
      ],
    },
    {
      id: "automation",
      n: "03",
      title: "Automation Systems",
      copy: "The quiet infrastructure that keeps your funnel moving - lead routing, CRM sync, calendar, email sequences and internal ops.",
      bullets: [
        "Lead capture -> CRM",
        "Slack / email triggers",
        "Internal dashboards",
      ],
    },
    {
      id: "cms",
      n: "04",
      title: "CMS-Ready Content",
      copy: "A website your team can actually update. Structured content, type-safe schemas and editor experiences that don't break the design.",
      bullets: [
        "Headless CMS setup",
        "Structured schemas",
        "Editor training & docs",
      ],
    },
  ];

  return (
    <section
      id="services"
      data-testid={SERVICES.section}
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-ink-400">
              Services / 01 &mdash; 04
            </div>
            <h2 className="mt-4 max-w-[16ch] text-balance font-display text-5xl font-light leading-tighter tracking-tighter text-ink-50 md:text-6xl lg:text-7xl">
              What we can build,{" "}
              <span className="font-serif italic text-ink-300">
                end&nbsp;to&nbsp;end.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base leading-snug text-ink-400 md:text-lg">
            A small, senior practice - one partner, one process. Each engagement
            covers strategy, design, build and the technical setup behind it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item.id}
              data-testid={SERVICES.card(item.id)}
              className="hover-lift group relative bg-ink-950 p-8 md:p-12"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="text-xs tracking-[0.18em] text-ink-500">
                  {item.n}
                </div>
                <span className="text-ink-500 transition-colors duration-700 ease-premium group-hover:text-lime-accent">
                  <Icon>&rarr;</Icon>
                </span>
              </div>
              <h3 className="mt-10 font-display text-3xl font-light tracking-tight text-ink-50 md:text-4xl">
                {item.title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink-400">
                {item.copy}
              </p>
              <ul className="mt-8 space-y-2.5">
                {item.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-center gap-3 text-sm text-ink-300"
                  >
                    <span className="inline-block h-px w-5 bg-lime-accent" />
                    {bullet}
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

function Process() {
  const steps = [
    {
      n: "01",
      title: "Positioning brief",
      days: "Week 0 - 1",
      copy: "We map your audience, offer and competitors, then write the one-line story your website has to tell. Nothing gets designed until this lands.",
    },
    {
      n: "02",
      title: "Narrative & structure",
      days: "Week 1 - 2",
      copy: "Page-by-page outline, key sections, proof points, calls to action. You sign off on the argument before a single pixel moves.",
    },
    {
      n: "03",
      title: "Design",
      days: "Week 2 - 4",
      copy: "Type-driven, performance-aware design in Figma. Two rounds, focused on clarity, hierarchy and the parts that actually convert.",
    },
    {
      n: "04",
      title: "Build & integrate",
      days: "Week 3 - 5",
      copy: "Hand-built front-end, CMS schemas, analytics, automation hooks. Production-grade code you can take anywhere.",
    },
    {
      n: "05",
      title: "Launch & iterate",
      days: "Week 5 - 6",
      copy: "QA, accessibility, performance pass, soft launch, then we measure. The site keeps earning after we hand over the keys.",
    },
  ];

  return (
    <section
      id="process"
      data-testid={PROCESS.section}
      className="relative border-t border-white/8 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 max-w-3xl md:mb-24">
          <div className="text-xs uppercase tracking-[0.18em] text-ink-400">
            Process / Delivery
          </div>
          <h2 className="mt-4 text-balance font-display text-5xl font-light leading-tighter tracking-tighter text-ink-50 md:text-6xl lg:text-7xl">
            Five stages.{" "}
            <span className="font-serif italic text-ink-300">One partner.</span>{" "}
            No handoff.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-snug text-ink-400 md:text-lg">
            A focused, linear process designed for momentum. You&apos;ll never
            wonder where the project is.
          </p>
        </div>

        <ol className="relative">
          {steps.map((step, index) => (
            <li
              key={step.n}
              data-testid={PROCESS.step(index + 1)}
              className="group grid grid-cols-12 gap-6 border-t border-white/8 py-10 last:border-b md:gap-10 md:py-14"
            >
              <div className="col-span-12 text-sm tracking-[0.18em] text-ink-500 md:col-span-2">
                {step.n}
              </div>
              <div className="col-span-12 md:col-span-5">
                <h3 className="font-display text-2xl font-light tracking-tight text-ink-50 transition-transform duration-700 ease-premium group-hover:translate-x-1 md:text-4xl">
                  {step.title}
                </h3>
                <div className="mt-3 text-xs uppercase tracking-[0.18em] text-lime-accent/90">
                  {step.days}
                </div>
              </div>
              <p className="col-span-12 max-w-md text-base leading-relaxed text-ink-400 md:col-span-5">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Engagement() {
  const options = [
    {
      title: "Launch Sprint",
      meta: "3-4 weeks",
      copy: "A focused sprint for founders who need a sharp single-page sales site with messaging, design, build and launch support.",
    },
    {
      title: "Website System",
      meta: "5-8 weeks",
      copy: "A deeper engagement for teams that need multiple pages, CMS-ready content, analytics and conversion paths across the site.",
    },
    {
      title: "Product Surface",
      meta: "Scoped build",
      copy: "A responsive web app or operational interface with clear UX, clean front-end engineering and integration-ready foundations.",
    },
  ];

  return (
    <section
      id="engagement"
      data-testid={ENGAGEMENT.section}
      className="relative border-t border-white/8 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-ink-400">
              Engagement Options
            </div>
            <h2 className="mt-4 max-w-[16ch] text-balance font-display text-5xl font-light leading-tighter tracking-tighter text-ink-50 md:text-6xl lg:text-7xl">
              Clear scopes for{" "}
              <span className="font-serif italic text-ink-300">
                focused work.
              </span>
            </h2>
          </div>
          <a
            href="mailto:hello@waseem.studio?subject=New%20project%20enquiry"
            data-testid={ENGAGEMENT.ctaEmail}
            className="btn-pill btn-pill--primary w-fit"
          >
            Discuss scope
            <Icon>&rarr;</Icon>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-white/8 bg-white/8 lg:grid-cols-3">
          {options.map((option, index) => (
            <article
  key={option.title}
  data-testid={ENGAGEMENT.option(index + 1)}
  className="
    group relative overflow-hidden rounded-3xl
    border border-white/10
    bg-white/[0.03]
    p-8 md:p-10
    transition-all duration-500
    hover:border-lime-accent/40
    hover:-translate-y-2
  "
>
  {/* Glow */}
  <div
    className="
      pointer-events-none absolute inset-0 opacity-0
      transition-opacity duration-500
      group-hover:opacity-100
    "
  >
    <div
      className="
        absolute -top-24 left-1/2 h-48 w-48
        -translate-x-1/2 rounded-full
        bg-lime-accent/20 blur-3xl
      "
    />
  </div>

  {/* Glass Overlay */}
  <div
    className="
      absolute inset-0
      bg-gradient-to-b
      from-white/[0.08]
      via-transparent
      to-transparent
      opacity-0
      transition-opacity duration-500
      group-hover:opacity-100
    "
  />

  <div className="relative z-10">
    <div
      className="
        text-xs uppercase tracking-[0.18em]
        text-lime-accent/90
      "
    >
      {option.meta}
    </div>

    <h3
      className="
        mt-8 font-display text-3xl font-light
        tracking-tight text-ink-50
        transition-colors duration-500
        group-hover:text-white
      "
    >
      {option.title}
    </h3>

    <p
      className="
        mt-5 text-base leading-relaxed text-ink-400
        transition-colors duration-500
        group-hover:text-ink-300
      "
    >
      {option.copy}
    </p>
  </div>
</article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capability() {
  const projects = [
  {
    id: "venture-studio",
    client: "Venture Studio",
    sector: "Startup / Product",
    kicker: "MVP web application",
    result: "Launch in weeks, not months",
    copy: "Design and develop a production-ready MVP with authentication, dashboards, payments, and scalable infrastructure for early-stage founders.",
    img: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=70",
  },
  {
    id: "health-platform",
    client: "Healthcare Platform",
    sector: "Healthcare SaaS",
    kicker: "Responsive web app",
    result: "Simplified user journeys",
    copy: "Build intuitive patient and practitioner experiences with secure authentication, scheduling, records management, and analytics.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=70",
  },
  {
    id: "creative-agency",
    client: "Creative Agency",
    sector: "Studio / Service",
    kicker: "Sales website + CMS",
    result: "Built for inbound growth",
    copy: "Create editorial-driven websites with flexible content management, strong storytelling, and conversion-focused design systems.",
    img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=70",
  },
  {
    id: "operations-suite",
    client: "Operations Team",
    sector: "Business Automation",
    kicker: "Automation system",
    result: "Hours reclaimed every week",
    copy: "Connect CRMs, payment systems, communication tools, and internal processes into a streamlined operational workflow.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=70",
  },
  {
    id: "professional-firm",
    client: "Professional Firm",
    sector: "Consulting / Legal",
    kicker: "Authority website",
    result: "Stronger digital presence",
    copy: "Craft trust-driven websites with refined messaging, service architecture, and content systems that position expertise clearly.",
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=70",
  },
  {
    id: "modern-brand",
    client: "Modern Brand",
    sector: "DTC / Lifestyle",
    kicker: "Content ecosystem",
    result: "Consistent publishing workflow",
    copy: "Develop scalable content platforms with structured CMS architecture, collection management, and growth-ready foundations.",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=70",
  },
];

  return (
    <section
      id="capability"
      data-testid={CAPABILITY.section}
      className="relative border-t border-white/8 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-ink-400">
              Capability Snapshot
            </div>
            <h2 className="mt-4 max-w-[18ch] text-balance font-display text-5xl font-light leading-tighter tracking-tighter text-ink-50 md:text-6xl lg:text-7xl">
              What we can{" "}
              <span className="font-serif italic text-ink-300">
                build for you.
              </span>
            </h2>
          </div>
          <p className="max-w-md text-pretty text-base leading-snug text-ink-400 md:text-lg">
            From conversion-focused websites to custom software and automation systems,
  these are the kinds of solutions I help businesses launch and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, index) => (
            <article
              key={project.id}
              data-testid={CAPABILITY.project(project.id)}
              className={`group ${index % 2 === 1 ? "md:mt-24" : ""}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/8 bg-ink-900">
                <Image
                  src={project.img}
                  alt={project.client}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-105 transition-transform duration-[1.4s] ease-premium group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 via-transparent to-transparent" />
                <div className="absolute left-5 top-5 rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-ink-50/90 backdrop-blur">
                  {project.kicker}
                </div>
              </div>
              <div className="mt-7 flex items-start justify-between gap-6">
                <div>
                  <h3 className="font-display text-2xl font-light tracking-tight text-ink-50 md:text-3xl">
                    {project.client}
                  </h3>
                  <div className="mt-1.5 text-sm text-ink-400">
                    {project.sector}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs uppercase tracking-[0.18em] text-ink-500">
                    Outcome
                  </div>
                  <div className="mt-1 text-sm text-lime-accent md:text-base">
                    {project.result}
                  </div>
                </div>
              </div>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-400">
                {project.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      data-testid={CONTACT.section}
      className="relative border-t border-white/8 py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-12 rounded-3xl border border-white/8 bg-ink-900 p-8 md:grid-cols-12 md:p-12 lg:p-16">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-[0.18em] text-lime-accent/90">
              Start a project
            </div>
            <h2 className="mt-4 max-w-[14ch] text-balance font-display text-5xl font-light leading-tighter tracking-tighter text-ink-50 md:text-6xl lg:text-7xl">
              Bring the idea. We&apos;ll shape the web presence.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-400 md:text-lg">
              Send a short note with your goal, timeline, and the type of site
              you need. We&apos;ll respond with the most practical next step.
            </p>
          </div>
          <div className="flex flex-col justify-end gap-4 md:col-span-5">
            <a
              href="mailto:hello@mmuhammadwaseem2004@gmail.com?subject=New%20project%20enquiry"
              data-testid={CONTACT.ctaEmail}
              className="btn-pill btn-pill--primary justify-center"
            >
              Email Us
              <Icon>&rarr;</Icon>
            </a>
            <a
              href="https://cal.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid={CONTACT.ctaCalendar}
              className="btn-pill btn-pill--ghost justify-center"
            >
              Book a discovery call
              <Icon>&rarr;</Icon>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      data-testid={FOOTER.container}
      className="relative border-t border-white/8 pb-12 pt-16"
    >
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src={LOGO_URL}
                alt="Waseem Studio"
                width={132}
                height={40}
                className="h-10 w-auto rounded-md"
              />
              <span className="text-base font-medium text-ink-100">
                Waseem <span className="text-ink-400">/ Studio</span>
              </span>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-400">
              Independent web partner for founders and service teams. Sales
              websites, responsive web apps, automation systems and CMS-ready
              content.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink-500">
                Navigate
              </div>
              <ul className="mt-4 space-y-2.5 text-ink-200">
                {["Services", "Process", "Engagement", "Capability"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="transition-colors duration-500 hover:text-lime-accent"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-ink-500">
                Contact
              </div>
              <ul className="mt-4 space-y-2.5 text-ink-200">
                <li>
                  <a
                    data-testid={FOOTER.emailLink}
                    href="mailto:mmuhammadwaseem2004@gmail.com"
                    className="link"
                  >
                    mmuhammadwaseem2004@gmail.com
                  </a>
                </li>
                <li className="text-ink-400">Remote, working globally</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/8 pt-8 text-xs text-ink-500 md:flex-row md:items-center md:justify-between">
          <div> Designed by team Waseem Studio.</div>
          <div className="flex items-center gap-5">
            
          </div>
        </div>
      </div>
    </footer>
  );
}

function GooeyFilter() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: "absolute" }}
    >
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

export default function SiteClient() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".lazy-load");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(
              () => entry.target.classList.add("lazy-load--loaded"),
              index * 60,
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="App grain min-h-screen bg-ink-950 text-ink-50 antialiased">
      <GooeyFilter />
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
