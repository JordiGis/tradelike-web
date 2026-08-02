import { useEffect, useRef } from "react";

/** The quiet background for everything below the hero: vertical candles
 * drifting slowly straight down, lane by lane, each looping back to the top
 * the instant it fades out at the bottom — `position: fixed` so it never
 * stops or resets as you scroll, it just sits behind whatever section is
 * currently in view. Kept deliberately dim (alpha ~0.1-0.2) since real text
 * sits on top of it at all times, unlike the hero's own brighter tunnel. */
const VERT = `#version 300 es
void main() {
  vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_green;
uniform vec3 u_red;
out vec4 outColor;

float hash11(float n) { return fract(sin(n * 12.9898) * 43758.5453123); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  // WebGL's fragment-coordinate origin is bottom-left, not top-left: without
  // this flip "travel" increasing over time reads as moving up the screen.
  uv.y = 1.0 - uv.y;
  float lanes = floor(u_resolution.x / 160.0) + 1.0;
  float lanef = uv.x * lanes;
  float li = floor(lanef);
  float lx = fract(lanef);

  // One candle per lane, quiet rather than a downpour — same slow crawl
  // top-to-bottom for its whole lifetime (not a spawn pulse), wrapping only
  // once it has fully faded out at the bottom.
  float hz = hash11(li * 4.13 + 1.0);
  float speed = 0.010 + hash11(li * 1.7) * 0.006;
  float raw = u_time * speed + hz;
  float cellIndex = floor(raw);
  float travel = fract(raw); // 0 at the top, 1 at the bottom, ever-increasing

  float isred = step(0.5, hash11(li * 2.31 + cellIndex * 0.77));
  vec3 ccol = mix(u_green, u_red, isred);

  float halfH = 0.045;
  float halfW = 0.22;
  float wickHalfW = halfW * 0.18;

  float dy = (uv.y - travel) / halfH;
  float dx = (lx - 0.5) / halfW;
  float body = step(abs(dx), 1.0) * step(abs(dy), 1.0);

  float wdy = (uv.y - travel) / (halfH * 1.8);
  float wdx = (lx - 0.5) / wickHalfW;
  float wick = step(abs(wdx), 1.0) * step(abs(wdy), 1.0);

  // Fades in arriving from the top and out leaving at the bottom — no hard
  // pop at either end — and reads faintly brighter near the bottom, as if
  // drifting a touch closer on its way down.
  float fade = smoothstep(0.0, 0.05, travel) * smoothstep(1.0, 0.95, travel);
  float depth = mix(0.6, 1.0, travel);
  float mask = clamp(body * 0.8 + wick * 0.45, 0.0, 1.0) * fade * depth;

  outColor = vec4(ccol * mask * 0.3, mask * 0.3);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

export function CandleField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: true, premultipliedAlpha: true });
    if (!gl) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const u = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      green: gl.getUniformLocation(program, "u_green"),
      red: gl.getUniformLocation(program, "u_red"),
    };
    gl.uniform3f(u.green, 0x29 / 255, 0xff / 255, 0x8c / 255);
    gl.uniform3f(u.red, 0xff / 255, 0x3d / 255, 0x4a / 255);

    let raf = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }

    // The clock the shader reads doesn't tick in real time — it ticks in
    // "virtual time", advanced each frame by real elapsed seconds times the
    // current speed boost. That boost jumps up on a scroll event (scaled by
    // how fast you're actually scrolling) and eases back to 1 every frame
    // it doesn't get refreshed, so the drift speeds up while you scroll and
    // settles back to its normal pace once you stop — smoothly, since the
    // clock itself never jumps, only the rate it advances at does.
    let virtualTime = 0;
    let lastFrameTs = performance.now();
    let boost = 1;
    let lastScrollY = window.scrollY;
    let lastScrollTs = performance.now();

    function onScroll() {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastScrollY);
      const dt = Math.max(1, now - lastScrollTs);
      const velocity = dy / dt; // px/ms
      boost = Math.max(boost, 1 + Math.min(velocity * 35, 7));
      lastScrollY = window.scrollY;
      lastScrollTs = now;
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    function frame(ts: number) {
      const dt = Math.min(0.05, (ts - lastFrameTs) / 1000);
      lastFrameTs = ts;
      boost += (1 - boost) * Math.min(1, dt * 2.2);
      virtualTime += dt * boost;

      resize();
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.uniform2f(u.resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(u.time, virtualTime);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      observer.disconnect();
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
