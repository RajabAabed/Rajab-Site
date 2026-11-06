export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Domain-warped gradient noise read as a height field, lit like folded silk.
export const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uReveal;
  uniform float uScroll;

  varying vec2 vUv;

  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float gnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash2(i), f), dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 4; i++) {
      v += a * gnoise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

    // Soft lens that follows the pointer
    vec2 d = p - uMouse;
    p -= d * 0.32 * exp(-dot(d, d) * 7.0);

    float t = uTime * 0.04;
    vec2 sp = p * 0.62 + vec2(0.0, uScroll * 0.35);

    vec2 q = vec2(fbm(sp + vec2(0.0, t)), fbm(sp + vec2(5.2, 1.3) - t * 0.8));
    vec2 r = vec2(
      fbm(sp + 2.2 * q + vec2(1.7, 9.2) + t * 0.6),
      fbm(sp + 2.2 * q + vec2(8.3, 2.8) - t * 0.5)
    );
    float h = fbm(sp + 2.4 * r);

    vec2 grad = vec2(dFdx(h), dFdy(h)) * uResolution.y * 0.3;
    vec3 n = normalize(vec3(-grad, 1.0));

    vec3 L = normalize(vec3(-0.45, 0.65, 0.6));
    vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));
    float diff = clamp(dot(n, L), 0.0, 1.0);
    float spec = pow(max(dot(n, H), 0.0), 40.0);
    float rim = pow(1.0 - n.z, 1.6);

    vec3 ink = vec3(0.034, 0.033, 0.03);
    vec3 umber = vec3(0.13, 0.115, 0.1);
    vec3 gold = vec3(0.83, 0.72, 0.54);
    vec3 bone = vec3(0.93, 0.91, 0.88);

    vec3 col = mix(ink, umber, diff * diff);

    // Champagne light pooling toward the lower right
    float goldMask = smoothstep(-0.1, 0.55, q.x + r.y * 0.9) * smoothstep(-0.9, 0.6, p.x - p.y * 0.6);
    col += gold * min(rim * 2.6, 0.9) * goldMask;
    col += bone * spec * 0.22;

    float vig = smoothstep(1.45, 0.25, length(p * vec2(0.75, 1.0)));
    col *= mix(0.35, 1.0, vig);

    // Radial reveal from the right of frame
    float rad = length(p - vec2(0.45, -0.15));
    col *= smoothstep(uReveal * 2.1, uReveal * 2.1 - 0.7, rad);

    col *= 1.0 - uScroll * 0.55;

    // Dither to avoid banding in the darks
    col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;

    gl_FragColor = vec4(col, 1.0);
  }
`;
