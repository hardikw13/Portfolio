"use client";

import { useEffect, useRef, useCallback } from "react";

const NODE_COUNT   = 35;
const CONNECT_DIST = 160;

const NODE_COLORS = [
  "180,210,255","140,180,255","100,160,255",
  "200,225,255","120,190,255","160,200,255",
  "80,150,255", "220,235,255","100,170,240","170,215,255",
];

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number; pulse: number; pulseSpeed: number;
  pinned: boolean; color: string;
}
interface Packet { from: number; to: number; t: number; speed: number; }

export default function HeroAnimation() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const rafRef     = useRef<number>(0);
  const nodesRef   = useRef<Node[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const dragRef    = useRef<{ idx: number; offX: number; offY: number } | null>(null);
  const frameRef   = useRef(0);
  const hoverRef   = useRef<number>(-1);
  const sizeRef    = useRef({ w: 600, h: 800 });

  const hitNode = useCallback((cx: number, cy: number) => {
    for (let i = nodesRef.current.length - 1; i >= 0; i--) {
      const n = nodesRef.current[i];
      const d = Math.sqrt((cx - n.x) ** 2 + (cy - n.y) ** 2);
      if (d <= n.r + 10) return i;
    }
    return -1;
  }, []);

  const getCoords = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const src = "touches" in e ? e.touches[0] : e;
    return {
      x: src.clientX - rect.left,
      y: src.clientY - rect.top,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      const w = parent ? parent.offsetWidth  : Math.round(window.innerWidth  * 0.52);
      const h = parent ? parent.offsetHeight : window.innerHeight;
      sizeRef.current = { w, h };
      canvas.width  = w;
      canvas.height = h;
      // Keep CSS size in sync so coordinate scaling = 1:1
      canvas.style.width  = w + "px";
      canvas.style.height = h + "px";
    };
    resize();

    const { w, h } = sizeRef.current;

    nodesRef.current = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: 30 + Math.random() * (w - 60),
      y: 30 + Math.random() * (h - 60),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: 5 + Math.random() * 4,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.016 + Math.random() * 0.018,
      pinned: false,
      color: NODE_COLORS[i % NODE_COLORS.length],
    }));

    packetsRef.current = Array.from({ length: 12 }, (_, i) => ({
      from: i % NODE_COUNT, to: (i + 7) % NODE_COUNT,
      t: Math.random(), speed: 0.004 + Math.random() * 0.005,
    }));

    // Pointer handlers
    const onDown = (e: MouseEvent | TouchEvent) => {
      const { x, y } = getCoords(e, canvas);
      const idx = hitNode(x, y);
      if (idx >= 0) {
        e.preventDefault();
        const n = nodesRef.current[idx];
        n.pinned = true; n.vx = 0; n.vy = 0;
        dragRef.current = { idx, offX: x - n.x, offY: y - n.y };
        canvas.style.cursor = "grabbing";
      }
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      const { x, y } = getCoords(e, canvas);
      if (dragRef.current) {
        e.preventDefault();
        const { w: cw, h: ch } = sizeRef.current;
        const n = nodesRef.current[dragRef.current.idx];
        n.x = Math.max(10, Math.min(cw - 10, x - dragRef.current.offX));
        n.y = Math.max(10, Math.min(ch - 10, y - dragRef.current.offY));
      } else {
        hoverRef.current = hitNode(x, y);
        canvas.style.cursor = hoverRef.current >= 0 ? "grab" : "default";
      }
    };
    const onUp = () => {
      if (dragRef.current) {
        const n = nodesRef.current[dragRef.current.idx];
        n.pinned = false;
        n.vx = (Math.random() - 0.5) * 0.6;
        n.vy = (Math.random() - 0.5) * 0.6;
        dragRef.current = null;
        canvas.style.cursor = "default";
      }
    };

    canvas.addEventListener("mousedown",  onDown,  { passive: false });
    canvas.addEventListener("mousemove",  onMove,  { passive: false });
    canvas.addEventListener("mouseup",    onUp);
    canvas.addEventListener("mouseleave", onUp);
    canvas.addEventListener("touchstart", onDown,  { passive: false });
    canvas.addEventListener("touchmove",  onMove,  { passive: false });
    canvas.addEventListener("touchend",   onUp);
    window.addEventListener("resize", resize);

    // Render loop
    const tick = () => {
      const { w: cw, h: ch } = sizeRef.current;
      const nodes = nodesRef.current;
      const packets = packetsRef.current;
      frameRef.current++;
      ctx.clearRect(0, 0, cw, ch);

      for (const n of nodes) {
        if (n.pinned) continue;
        n.x += n.vx; n.y += n.vy; n.pulse += n.pulseSpeed;
        if (n.x < 20 || n.x > cw - 20) n.vx *= -1;
        if (n.y < 20 || n.y > ch - 20) n.vy *= -1;
      }

      // Edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const a = (1 - d / CONNECT_DIST) * 0.32;
            const hot = hoverRef.current === i || hoverRef.current === j ||
                        dragRef.current?.idx === i || dragRef.current?.idx === j;
            const g = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            g.addColorStop(0, `rgba(${nodes[i].color},${hot ? a * 2.8 : a})`);
            g.addColorStop(1, `rgba(${nodes[j].color},${hot ? a * 2.8 : a})`);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = g; ctx.lineWidth = hot ? 1.5 : 1; ctx.stroke();
          }
        }
      }

      // Packets
      for (const p of packets) {
        p.t += p.speed;
        if (p.t >= 1) {
          p.t = 0; p.from = p.to;
          let best = -1, bestD = Infinity;
          for (let k = 0; k < nodes.length; k++) {
            if (k === p.from) continue;
            const dx = nodes[k].x - nodes[p.from].x, dy = nodes[k].y - nodes[p.from].y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < CONNECT_DIST && d < bestD) { bestD = d; best = k; }
          }
          p.to = best >= 0 ? best : (p.from + 3) % NODE_COUNT;
        }
        const fx = nodes[p.from].x, fy = nodes[p.from].y;
        const tx = nodes[p.to].x,   ty = nodes[p.to].y;
        const px = fx + (tx - fx) * p.t, py = fy + (ty - fy) * p.t;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 12);
        g.addColorStop(0, `rgba(${nodes[p.from].color},0.8)`);
        g.addColorStop(1, `rgba(${nodes[p.from].color},0)`);
        ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const isDragged = dragRef.current?.idx === i;
        const isHovered = hoverRef.current === i;
        const color = isDragged ? "245,158,11" : n.color;
        const haloR = isDragged ? n.r * 10 : n.r * 7;
        const haloA = isDragged ? 0.4 : 0.18 + glow * 0.22;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
        g.addColorStop(0, `rgba(${color},${haloA})`);
        g.addColorStop(1, `rgba(${color},0)`);
        ctx.beginPath(); ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        if (isDragged || isHovered) {
          ctx.beginPath(); ctx.arc(n.x, n.y, n.r + 5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${color},0.7)`; ctx.lineWidth = 1.5; ctx.stroke();
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, isDragged ? n.r * 1.4 : n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${0.8 + glow * 0.2})`; ctx.fill();
      }

      // Scan line
      const sy = ((frameRef.current * 0.55) % (ch + 60)) - 30;
      const sg = ctx.createLinearGradient(0, sy - 30, 0, sy + 30);
      sg.addColorStop(0, "rgba(255,255,255,0)");
      sg.addColorStop(0.5, "rgba(255,255,255,0.02)");
      sg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sg; ctx.fillRect(0, sy - 30, cw, 60);

      rafRef.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown",  onDown);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseup",    onUp);
      canvas.removeEventListener("mouseleave", onUp);
      canvas.removeEventListener("touchstart", onDown);
      canvas.removeEventListener("touchmove",  onMove);
      canvas.removeEventListener("touchend",   onUp);
    };
  }, [hitNode]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block", cursor: "default" }}
    />
  );
}
