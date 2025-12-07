"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Matter from "matter-js";
import { Button } from "@/components/ui";

interface PageBreakerProps {
  isActive: boolean;
  onReset: () => void;
}

interface FallingElement {
  el: HTMLElement;
  body: Matter.Body;
  originalRect: DOMRect;
}

interface Debris {
  x: number;
  y: number;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  opacity: number;
}


export default function PageBreaker({ isActive, onReset }: PageBreakerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const elementsRef = useRef<FallingElement[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const debrisRef = useRef<Debris[]>([]);
  const debrisCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [phase, setPhase] = useState<"idle" | "shake" | "fall">("idle");

  // Sync DOM elements with physics bodies
  const syncDOMWithPhysics = useCallback(() => {
    elementsRef.current.forEach(({ el, body }) => {
      const { x, y } = body.position;
      const angle = body.angle;
      const width = el.offsetWidth;
      const height = el.offsetHeight;

      el.style.transform = `translate(${x - width / 2}px, ${y - height / 2}px) rotate(${angle}rad)`;
    });

    // Animate debris
    if (debrisCanvasRef.current) {
      const ctx = debrisCanvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        debrisRef.current = debrisRef.current.filter((d) => {
          d.y += d.velocityY;
          d.x += d.velocityX;
          d.velocityY += 0.5; // gravity
          d.rotation += d.velocityX * 0.1;
          d.opacity -= 0.005;

          if (d.opacity > 0 && d.y < window.innerHeight + 100) {
            ctx.save();
            ctx.translate(d.x, d.y);
            ctx.rotate(d.rotation);
            ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity})`;
            ctx.fillRect(-d.size / 2, -d.size / 2, d.size, d.size);
            ctx.restore();
            return true;
          }
          return false;
        });
      }
    }

    animationFrameRef.current = requestAnimationFrame(syncDOMWithPhysics);
  }, []);

  // Create debris particles
  const createDebris = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      debrisRef.current.push({
        x: x + (Math.random() - 0.5) * 50,
        y: y + (Math.random() - 0.5) * 50,
        size: Math.random() * 8 + 2,
        rotation: Math.random() * Math.PI * 2,
        velocityX: (Math.random() - 0.5) * 15,
        velocityY: Math.random() * -10 - 5,
        opacity: 1,
      });
    }
  }, []);

  // Create fake scrollbar element
  const createFakeScrollbar = useCallback((engine: Matter.Engine, container: HTMLElement) => {
    const scrollbarWidth = 12;
    const scrollbarHeight = 100;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    const scrollRatio = viewHeight / docHeight;
    const thumbHeight = Math.max(scrollbarHeight * scrollRatio, 30);
    const thumbTop = (scrollTop / docHeight) * viewHeight;

    // Create scrollbar track
    const track = document.createElement("div");
    track.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: ${scrollbarWidth}px;
      height: ${viewHeight}px;
      background: rgba(100, 100, 100, 0.3);
      z-index: 9998;
      border-radius: 6px;
    `;
    track.className = "falling-element fake-scrollbar-track";
    container.appendChild(track);

    // Create scrollbar thumb
    const thumb = document.createElement("div");
    thumb.style.cssText = `
      position: fixed;
      top: ${thumbTop}px;
      right: 2px;
      width: ${scrollbarWidth - 4}px;
      height: ${thumbHeight}px;
      background: rgba(201, 160, 80, 0.8);
      z-index: 9998;
      border-radius: 4px;
    `;
    thumb.className = "falling-element fake-scrollbar-thumb";
    container.appendChild(thumb);

    // Physics for track
    const trackBody = Matter.Bodies.rectangle(
      window.innerWidth - scrollbarWidth / 2,
      viewHeight / 2,
      scrollbarWidth,
      viewHeight,
      {
        friction: 0.3,
        restitution: 0.2,
        density: 0.001,
      }
    );
    Matter.Composite.add(engine.world, trackBody);

    // Physics for thumb
    const thumbBody = Matter.Bodies.rectangle(
      window.innerWidth - scrollbarWidth / 2,
      thumbTop + thumbHeight / 2,
      scrollbarWidth - 4,
      thumbHeight,
      {
        friction: 0.3,
        restitution: 0.4,
        density: 0.002,
      }
    );
    Matter.Body.setVelocity(thumbBody, { x: -5, y: 2 });
    Matter.Composite.add(engine.world, thumbBody);

    return [
      { el: track, body: trackBody, originalRect: track.getBoundingClientRect() },
      { el: thumb, body: thumbBody, originalRect: thumb.getBoundingClientRect() },
    ];
  }, []);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Start animation sequence
    setPhase("shake");

    // Phase 1: Screen shake
    document.body.classList.add("shake-effect-intense");

    // Phase 2: Start falling after shake
    setTimeout(() => {
      document.body.classList.remove("shake-effect-intense");
      setPhase("fall");
      initPhysics();
    }, 400);

    const initPhysics = () => {
      if (!containerRef.current) return;

      // Create physics engine with stronger gravity
      const engine = Matter.Engine.create({
        gravity: { x: 0, y: 1.5 },
      });
      engineRef.current = engine;

      // Granular element selectors
      const selectorsToBreak = [
        // Headers and text
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p:not(:empty)",
        // Interactive elements
        "button", "a:not(header a):not(nav a)",
        // Media
        "img", "video", "svg:not(button svg):not(a svg)",
        // Cards and containers
        "[class*='card']", "[class*='Card']",
        // Specific elements
        ".logo", "[class*='logo']", "[class*='Logo']",
        // Stats and features
        "[class*='stat']", "[class*='Stat']",
        "[class*='feature']", "[class*='Feature']",
        // Navigation (as a whole)
        "header", "footer", "nav",
      ];

      const allElements = document.querySelectorAll(selectorsToBreak.join(", "));
      const fallingElements: FallingElement[] = [];
      const processedElements = new Set<Element>();

      // Create floor and walls
      const floorThickness = 100;
      const wallThickness = 60;

      const walls = [
        // Floor - below viewport
        Matter.Bodies.rectangle(
          window.innerWidth / 2,
          window.innerHeight + floorThickness / 2 + 200,
          window.innerWidth * 3,
          floorThickness,
          { isStatic: true, friction: 0.9, restitution: 0.1 }
        ),
        // Left wall
        Matter.Bodies.rectangle(
          -wallThickness / 2,
          window.innerHeight / 2,
          wallThickness,
          window.innerHeight * 3,
          { isStatic: true, friction: 0.5 }
        ),
        // Right wall
        Matter.Bodies.rectangle(
          window.innerWidth + wallThickness / 2,
          window.innerHeight / 2,
          wallThickness,
          window.innerHeight * 3,
          { isStatic: true, friction: 0.5 }
        ),
      ];

      Matter.Composite.add(engine.world, walls);

      // Process elements with staggered timing
      const elementsArray = Array.from(allElements);
      let elementIndex = 0;

      const processNextBatch = () => {
        const batchSize = 5;
        const batch = elementsArray.slice(elementIndex, elementIndex + batchSize);

        batch.forEach((element) => {
          // Skip if already processed or is a child of processed element
          if (processedElements.has(element)) return;

          // Skip elements inside the PageBreaker container (the overlay message)
          if (containerRef.current?.contains(element)) return;

          // Skip if parent is in the list (avoid duplicates)
          let parent = element.parentElement;
          while (parent) {
            if (processedElements.has(parent)) return;
            parent = parent.parentElement;
          }

          const el = element as HTMLElement;
          const rect = el.getBoundingClientRect();

          // Skip if too small or not visible
          if (rect.width < 20 || rect.height < 10) return;
          if (rect.top > window.innerHeight + 100 || rect.bottom < -100) return;
          if (rect.left > window.innerWidth || rect.right < 0) return;

          processedElements.add(element);

          // Create clone
          const clone = el.cloneNode(true) as HTMLElement;
          clone.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: ${rect.width}px;
            height: ${rect.height}px;
            margin: 0;
            z-index: 9998;
            pointer-events: auto;
            cursor: grab;
            transform-origin: center center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1);
            border-radius: 4px;
            overflow: hidden;
            will-change: transform;
            background: inherit;
          `;
          clone.classList.add("falling-element");
          clone.style.transform = `translate(${rect.left}px, ${rect.top}px)`;

          containerRef.current?.appendChild(clone);

          // Hide original
          el.style.visibility = "hidden";
          el.setAttribute("data-was-visible", "true");

          // Create physics body
          const body = Matter.Bodies.rectangle(
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
            rect.width,
            rect.height,
            {
              friction: 0.4,
              frictionAir: 0.02,
              restitution: 0.3,
              density: 0.001 + Math.random() * 0.002,
              angle: (Math.random() - 0.5) * 0.05,
            }
          );

          // Add slight random initial impulse
          Matter.Body.setVelocity(body, {
            x: (Math.random() - 0.5) * 8,
            y: Math.random() * 3 + 2,
          });

          // Add slight angular velocity
          Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.1);

          Matter.Composite.add(engine.world, body);

          fallingElements.push({
            el: clone,
            body,
            originalRect: rect,
          });

          // Create debris at element position
          createDebris(rect.left + rect.width / 2, rect.top, 3);
        });

        elementIndex += batchSize;

        if (elementIndex < elementsArray.length) {
          setTimeout(processNextBatch, 50);
        }
      };

      // Start processing elements
      processNextBatch();

      // Add fake scrollbar
      const scrollbarElements = createFakeScrollbar(engine, containerRef.current);
      fallingElements.push(...scrollbarElements);

      elementsRef.current = fallingElements;

      // Setup mouse interaction
      const mouse = Matter.Mouse.create(containerRef.current);
      const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });

      // Fix scroll issues
      mouse.element.removeEventListener("mousewheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", (mouse as unknown as { mousewheel: EventListener }).mousewheel);

      Matter.Composite.add(engine.world, mouseConstraint);

      // Start physics
      const runner = Matter.Runner.create();
      runnerRef.current = runner;
      Matter.Runner.run(runner, engine);

      // Start DOM sync
      syncDOMWithPhysics();
    };

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (runnerRef.current) {
        Matter.Runner.stop(runnerRef.current);
      }

      if (engineRef.current) {
        Matter.Engine.clear(engineRef.current);
      }

      // Restore original elements
      document.querySelectorAll('[data-was-visible="true"]').forEach((el) => {
        (el as HTMLElement).style.visibility = "visible";
        el.removeAttribute("data-was-visible");
      });

      // Remove clones
      document.querySelectorAll(".falling-element").forEach((el) => el.remove());

      document.body.classList.remove("shake-effect-intense");
      setPhase("idle");
    };
  }, [isActive, syncDOMWithPhysics, createDebris, createFakeScrollbar]);

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9997] overflow-hidden"
      style={{ background: "transparent" }}
    >


      {/* Debris canvas */}
      <canvas
        ref={debrisCanvasRef}
        width={typeof window !== "undefined" ? window.innerWidth : 1920}
        height={typeof window !== "undefined" ? window.innerHeight : 1080}
        className="absolute inset-0 z-[10002] pointer-events-none"
      />

      {/* Message Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-[10003]"
        style={{
          opacity: phase === "fall" ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
          transitionDelay: "0.5s",
        }}
      >
        <div className="text-center pointer-events-auto px-4">
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 font-[var(--font-playfair)]"
            style={{
              color: "var(--ace-gold)",
              textShadow:
                "0 0 60px rgba(201, 160, 80, 0.6), 0 0 120px rgba(201, 160, 80, 0.3)",
            }}
          >
            TU EXAGÈRES
          </h1>
          <p className="text-2xl md:text-3xl text-white/80 mb-12 font-light">
            à tout appuyer.
          </p>
          <Button onClick={onReset} variant="primary" size="lg">
            Réparer ma bêtise
          </Button>
        </div>
      </div>

      {/* Intense shake effect styles */}
      <style jsx global>{`
        .shake-effect-intense {
          animation: shake-intense 0.4s ease-in-out;
        }

        @keyframes shake-intense {
          0%, 100% { transform: translateX(0) translateY(0) rotate(0); }
          10% { transform: translateX(-10px) translateY(-5px) rotate(-1deg); }
          20% { transform: translateX(10px) translateY(5px) rotate(1deg); }
          30% { transform: translateX(-15px) translateY(-3px) rotate(-2deg); }
          40% { transform: translateX(15px) translateY(3px) rotate(2deg); }
          50% { transform: translateX(-10px) translateY(-5px) rotate(-1deg); }
          60% { transform: translateX(10px) translateY(5px) rotate(1deg); }
          70% { transform: translateX(-8px) translateY(-2px) rotate(-0.5deg); }
          80% { transform: translateX(8px) translateY(2px) rotate(0.5deg); }
          90% { transform: translateX(-3px) translateY(-1px) rotate(0); }
        }

        .falling-element {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .falling-element:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
