import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import Matter from "matter-js";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663396562182/SJoT7r7MN9FQEDZBQ3q5Hf/hero-bg-3reyvR8dwHdcYjyo6gnL4i.webp";

const skillLabels = {
  es: [
    { label: "Meta Ads", color: "#2196F3" },
    { label: "React / Hydrogen", color: "#00BCD4" },
    { label: "IA Generativa", color: "#7B2FBE" },
    { label: "Adobe Illustrator", color: "#9C27B0" },
    { label: "Community Manager", color: "#4CAF50" },
    { label: "YouTube 271K", color: "#00BCD4" },
    { label: "Shopify", color: "#4CAF50" },
    { label: "LORA Training", color: "#7B2FBE" },
    { label: "ControlNet", color: "#00BCD4" },
    { label: "Full Stack Dev", color: "#2196F3" },
    { label: "Tech Packs", color: "#9C27B0" },
    { label: "Photoshop", color: "#4CAF50" },
    { label: "Fiverr Freelance", color: "#2196F3" },
    { label: "Analisis DAFO", color: "#7B2FBE" },
    { label: "E-commerce", color: "#00BCD4" },
    { label: "Sourcing Global", color: "#4CAF50" },
  ],
  en: [
    { label: "Meta Ads", color: "#2196F3" },
    { label: "React / Hydrogen", color: "#00BCD4" },
    { label: "Generative AI", color: "#7B2FBE" },
    { label: "Adobe Illustrator", color: "#9C27B0" },
    { label: "Community Manager", color: "#4CAF50" },
    { label: "YouTube 271K", color: "#00BCD4" },
    { label: "Shopify", color: "#4CAF50" },
    { label: "LORA Training", color: "#7B2FBE" },
    { label: "ControlNet", color: "#00BCD4" },
    { label: "Full Stack Dev", color: "#2196F3" },
    { label: "Tech Packs", color: "#9C27B0" },
    { label: "Photoshop", color: "#4CAF50" },
    { label: "Fiverr Freelance", color: "#2196F3" },
    { label: "SWOT Analysis", color: "#7B2FBE" },
    { label: "E-commerce", color: "#00BCD4" },
    { label: "Global Sourcing", color: "#4CAF50" },
  ],
};

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const copy = useMemo(
    () =>
      language === "es"
        ? {
            eyebrow: "✦ Portfolio Personal",
            description:
              "Entusiasta de la tecnologia y mente creativa. Marketing digital, desarrollo web, inteligencia artificial generativa y creacion de contenido. Siempre innovando.",
            primaryCta: "Ver Portfolio",
            secondaryCta: "Contactar",
            scroll: "Scroll",
          }
        : {
            eyebrow: "✦ Personal Portfolio",
            description:
              "Technology enthusiast with a creative mindset. Digital marketing, web development, generative AI, and content creation. Always exploring better ways to build.",
            primaryCta: "View Portfolio",
            secondaryCta: "Contact",
            scroll: "Scroll",
          },
    [language]
  );

  const skills = useMemo(() => skillLabels[language], [language]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    const { Engine, Runner, Bodies, Body, World } = Matter;

    const engine = Engine.create({ gravity: { x: 0, y: 0.08 } });
    const world = engine.world;

    const walls = [
      Bodies.rectangle(W / 2, H + 25, W, 50, { isStatic: true, label: "floor" }),
      Bodies.rectangle(-25, H / 2, 50, H, { isStatic: true }),
      Bodies.rectangle(W + 25, H / 2, 50, H, { isStatic: true }),
      Bodies.rectangle(W / 2, -25, W, 50, { isStatic: true }),
    ];
    World.add(world, walls);

    const pillBodies: {
      body: Matter.Body;
      label: string;
      color: string;
      h: number;
    }[] = [];

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.font = "500 13px 'DM Sans', sans-serif";

    skills.forEach((skill, i) => {
      const textW = ctx.measureText(skill.label).width;
      const w = textW + 32;
      const h = 34;
      const x = Math.random() * (W - w) + w / 2;
      const y = -50 - i * 40;

      const body = Bodies.rectangle(x, y, w, h, {
        restitution: 0.4,
        friction: 0.05,
        frictionAir: 0.01,
        chamfer: { radius: h / 2 },
        label: skill.label,
      });

      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: Math.random() * 2,
      });

      World.add(world, body);
      pillBodies.push({ body, label: skill.label, color: skill.color, h });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      pillBodies.forEach(({ body }) => {
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0 && dist < 120) {
          const force = 0.0012 * (1 - dist / 120);
          Body.applyForce(body, body.position, {
            x: (dx / dist) * force,
            y: (dy / dist) * force,
          });
        }
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);

    const runner = Runner.create();
    Runner.run(runner, engine);

    let animId = 0;
    const render = () => {
      ctx.clearRect(0, 0, W, H);

      pillBodies.forEach(({ body, label, color, h }) => {
        const { x, y } = body.position;
        const angle = body.angle;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        const textW = ctx.measureText(label).width;
        const pw = textW + 32;
        const ph = h;
        const r = ph / 2;

        ctx.beginPath();
        ctx.roundRect(-pw / 2, -ph / 2, pw, ph, r);
        ctx.fillStyle = color + "18";
        ctx.fill();
        ctx.strokeStyle = color + "80";
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.font = "500 13px 'DM Sans', sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, 0, 0);

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(world, false);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [skills]);

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden isolate"
      style={{
        height: "100vh",
        minHeight: "600px",
        background:
          "radial-gradient(ellipse at 30% 40%, oklch(0.15 0.04 230 / 0.6) 0%, oklch(0.08 0.005 260) 70%)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${HERO_BG})` }}
      />

      <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-none"
          style={{ display: "block" }}
        />
      </div>

      <div className="relative z-10 container pb-24 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mono-label mb-6 text-[var(--glow-orange)]">{copy.eyebrow}</p>
          <h1
            className="display-title text-white"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            Carlos
            <br />
            <span style={{ color: "var(--glow-orange)" }}>Martinez</span>
            <br />
            Lasierra
          </h1>
          <p
            className="mt-8 max-w-xl text-white/50 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.05rem", fontWeight: 300 }}
          >
            {copy.description}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-black transition-all duration-300 hover:scale-105"
              style={{ background: "var(--glow-orange)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {copy.primaryCta}
              <span>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-white/20 text-white/70 hover:border-white/50 hover:text-white transition-all duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {copy.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="mono-label">{copy.scroll}</span>
        <motion.div
          className="w-px h-12 bg-white/20"
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>
    </section>
  );
}
