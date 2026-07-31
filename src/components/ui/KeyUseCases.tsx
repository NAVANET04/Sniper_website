import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";
import { useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

// ========================================================
// ✦ USE CASE DATA
// Each thumbnail is a pure-CSS gradient + grain overlay, so there
// are no image assets to source/host — swap `gradient` for a real
// image any time by rendering an <img> instead of the gradient div.
// ========================================================
type UseCase = {
  tag: string;
  title: string;
  description: string;
  gradient: string;
};

const USE_CASES: UseCase[] = [
  {
    tag: "Use Case 01",
    title: "Immersive Training",
    description:
      "Explore popular industry use cases that unlock the potential of 3D data to achieve real business goals.",
    gradient:
      "linear-gradient(115deg, #1a0f0a 0%, #7c2d12 22%, #ea580c 42%, #fbbf24 58%, #38bdf8 78%, #0c4a6e 100%)",
  },
  {
    tag: "Use Case 02",
    title: "3D Collaboration",
    description:
      "Explore popular industry use cases that unlock the potential of 3D data to achieve real business goals.",
    gradient:
      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 35%, #8b5cf6 70%, #c4b5fd 100%)",
  },
  {
    tag: "Use Case 03",
    title: "Customer Experiences",
    description:
      "Explore popular industry use cases that unlock the potential of 3D data to achieve real business goals.",
    gradient:
      "linear-gradient(160deg, #fecdd3 0%, #fda4af 40%, #f43f5e 75%, #be123c 100%)",
  },
  {
    tag: "Use Case 04",
    title: "Embedded Systems",
    description:
      "Explore popular industry use cases that unlock the potential of 3D data to achieve real business goals.",
    gradient:
      "linear-gradient(135deg, #0a0118 0%, #1e1033 30%, #4c1d95 55%, #0a0118 100%)",
  },
];

// Cheap film-grain (SVG feTurbulence, tiled) — keeps the gradient
// thumbnails from reading as flat, glossy AI-gradient tiles.
const GRAIN_SVG =
  "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
  "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>" +
  "<feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter>" +
  "<rect width='100%' height='100%' filter='url(%23n)'/></svg>";

// ========================================================
// ✦ FADE-UP WRAPPER (self-contained copy — drop if your file
// already has one of these from elsewhere in the page)
// ========================================================
const FadeUp = ({
  children, delay = 0, className = "",
}: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </motion.div>
  );
};

// ========================================================
// ✦ USE CASE CARD
// ========================================================
const UseCaseCard = ({ item, index, inView }: { item: UseCase; index: number; inView: boolean }) => (
  <motion.div
    className="group flex flex-col rounded-2xl bg-white overflow-hidden"
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, ease, delay: 0.1 + index * 0.08 }}
  >
    {/* Thumbnail */}
    <div className="relative h-40 sm:h-48 overflow-hidden">
      <div
        className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
        style={{ background: item.gradient }}
      />
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`,
          backgroundSize: "160px 160px",
        }}
      />
      <span className="absolute left-4 top-4 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white">
        {item.tag}
      </span>
    </div>

    {/* Body */}
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-6">
        {item.description}
      </p>

      <button className="group/btn mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-[#1E1B1B] pl-4 pr-3 py-2 text-xs font-medium text-white transition-colors hover:bg-black">
        Discover
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
      </button>
    </div>
  </motion.div>
);

// ========================================================
// ✦ KEY USE CASES SECTION
// ========================================================
const KeyUseCases = ({ items = USE_CASES }: { items?: UseCase[] }) => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 z-10">
      <div className="max-w-5xl mx-auto" ref={sectionRef}>
        <FadeUp className="mb-10 sm:mb-14 max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-gradient-to-r from-violet-400 to-fuchsia-400" />
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-violet-300/80">
              Key Use Cases
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tighter mb-4">
            Push the boundaries of What&rsquo;s possible
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed">
            Explore popular industry use cases that unlock the potential of 3D data to achieve real business goals.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, index) => (
            <UseCaseCard key={item.title} item={item} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyUseCases;