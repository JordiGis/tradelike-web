import { useEffect, useRef } from "react";

/** A direct port of the game's own `resources/shaders/living_sky.gdshader`
 * (the MENU skin) — same math, same palette, so the site's hero is the exact
 * "data tunnel" the app opens on, not an approximation of it. */
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
uniform float u_cycle_speed;
uniform float u_flow_speed;
uniform float u_scale;
uniform float u_density;
out vec4 outColor;

float hash11(float n) { return fract(sin(n * 12.9898) * 43758.5453123); }
float band(float x, float w) { return smoothstep(w, 0.0, abs(x)); }

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv - 0.5;
  p.x *= u_resolution.x / u_resolution.y;

  float box = max(max(abs(p.x), abs(p.y)), 0.001);
  float depth = 0.30 / box;
  bool horiz = abs(p.x) > abs(p.y);
  float w = horiz ? p.y / abs(p.x) : p.x / abs(p.y);
  float wall = horiz ? (p.x > 0.0 ? 0.0 : 1.0) : (p.y > 0.0 ? 2.0 : 3.0);

  float t = u_time * u_flow_speed;
  float z = depth + t;

  float lanes = u_scale * u_density;
  float uu = w * 0.5 + 0.5;
  float lanef = uu * lanes;
  float li = floor(lanef) + wall * lanes * 1.37;
  float lf = fract(lanef);

  vec3 GREEN = u_green;
  vec3 RED = u_red;

  float phase = 0.5 - 0.5 * cos(u_time * u_cycle_speed);
  float persp = smoothstep(0.02, 0.22, box) * smoothstep(2.4, 0.5, depth);

  vec3 col = vec3(0.0);

  float hz = hash11(li);
  float zc = z * 1.1 + hz * 7.0;
  float cell = floor(zc);
  float ch = hash11(li * 3.1 + cell * 1.73);
  float present = step(0.42, ch);
  float barlen = 0.12 + 0.55 * hash11(li * 5.3 + cell * 0.7);
  float along = smoothstep(barlen, barlen - 0.05, fract(zc));
  float core = band(lf - 0.5, 0.32);
  float redsel = hash11(li * 2.31);
  float spawn_z = (cell - hz * 7.0) / 1.1;
  float swell = 0.5 - 0.5 * cos(spawn_z * u_cycle_speed / max(u_flow_speed, 0.001));
  float isred = step(0.5 + (swell - 0.5) * 0.8, redsel);
  vec3 ccol = mix(GREEN, RED, isred);
  col += ccol * (present * along * core) * 2.2 * persp;

  float rungs = pow(0.5 + 0.5 * cos(z * 6.28318530718 * 1.5), 80.0);
  float verts = pow(0.5 + 0.5 * cos(lanef * 6.28318530718), 44.0);
  vec3 gridcol = mix(GREEN, RED, 0.25) * 0.18 + vec3(0.0, 0.03, 0.035);
  col += gridcol * (rungs + verts) * persp * 0.5;

  float glow = smoothstep(0.18, 0.0, box);
  col += mix(GREEN, RED, phase) * glow * 0.14;

  col = vec3(1.0) - exp(-col * 1.2);
  outColor = vec4(col, 1.0);
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

export function Sky({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
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

    const u = {
      resolution: gl.getUniformLocation(program, "u_resolution"),
      time: gl.getUniformLocation(program, "u_time"),
      green: gl.getUniformLocation(program, "u_green"),
      red: gl.getUniformLocation(program, "u_red"),
      cycle: gl.getUniformLocation(program, "u_cycle_speed"),
      flow: gl.getUniformLocation(program, "u_flow_speed"),
      scale: gl.getUniformLocation(program, "u_scale"),
      density: gl.getUniformLocation(program, "u_density"),
    };

    // The MENU sky from Background.gd — same palette, same tempo.
    gl.uniform3f(u.green, 0x29 / 255, 0xff / 255, 0x8c / 255);
    gl.uniform3f(u.red, 0xff / 255, 0x3d / 255, 0x4a / 255);
    gl.uniform1f(u.cycle, 0.12);
    gl.uniform1f(u.flow, 0.3);
    gl.uniform1f(u.scale, 3.0);
    gl.uniform1f(u.density, 4.0);

    const start = performance.now();
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

    function frame() {
      resize();
      gl!.uniform2f(u.resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(u.time, (performance.now() - start) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }
    frame();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
