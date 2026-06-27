// GLSL shaders for the hero fluid-trail reveal.
//
// Three named exports: vertexShader, fluidFragmentShader,
// displayFragmentShader — same names and identical bodies as the PDF
// specification. Do not modify the shader logic, the uniform names, or
// the constants (decay 0.97, lineWidth 0.09, perFrameIntensity 0.3,
// revealThreshold 0.02, edgeWidthBase 0.004, halo bounds, gray tint) —
// the hero is the only theatrical motion moment on the site and its
// architecture is locked.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Writes the trail mask into the ping-pong target each frame.
 * The closest-point-on-segment math is critical: it draws a continuous
 * line between prevMouse and mouse each frame instead of dots, so fast
 * movement still produces a smooth trail.
 */
export const fluidFragmentShader = /* glsl */ `
  uniform sampler2D uPrevTrails;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform vec2 uResolution;
  uniform float uDecay;
  uniform bool uIsMoving;

  varying vec2 vUv;

  void main() {
    vec4 prev = texture2D(uPrevTrails, vUv);
    float newValue = prev.r * uDecay; // 0.97 decay

    if (uIsMoving) {
      vec2 dir = uMouse - uPrevMouse;
      float len = length(dir);
      if (len > 0.001) {
        vec2 d = dir / len;
        vec2 toPx = vUv - uPrevMouse;
        float proj = clamp(dot(toPx, d), 0.0, len);
        vec2 closest = uPrevMouse + proj * d;
        float dist = length(vUv - closest);

        float lineWidth = 0.09;
        float intensity = smoothstep(lineWidth, 0.0, dist) * 0.3;
        newValue += intensity;
      }
    }

    gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0);
  }
`;

/**
 * Composites the final pixel.
 * - getCoverUV replicates CSS object-fit: cover in shader space.
 * - smoothstep over (threshold, threshold + edgeWidth) gives a soft
 *   edge where the bottom image takes over.
 * - The halo overlay tints the top image with a near-black gray just
 *   ahead of the reveal edge so the trail itself is visible against
 *   the clean portrait. Halo fades out as t → 1 so the revealed
 *   bottom image stays clean.
 */
export const displayFragmentShader = /* glsl */ `
  uniform sampler2D uFluid;
  uniform sampler2D uTopTexture;
  uniform sampler2D uBottomTexture;
  uniform vec2 uResolution;
  uniform vec2 uTopTextureSize;
  uniform vec2 uBottomTextureSize;
  uniform float uDpr;

  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 ts) {
    if (ts.x < 1.0 || ts.y < 1.0) return uv;
    vec2 s = uResolution / ts;
    float scale = max(s.x, s.y);
    vec2 scaled = ts * scale;
    vec2 offset = (uResolution - scaled) * 0.5;
    return (uv * uResolution - offset) / scaled;
  }

  void main() {
    float fluid = texture2D(uFluid, vUv).r;

    vec2 topUV = getCoverUV(vUv, uTopTextureSize);
    vec2 bottomUV = getCoverUV(vUv, uBottomTextureSize);

    vec4 topColor = texture2D(uTopTexture, topUV);
    vec4 bottomColor = texture2D(uBottomTexture, bottomUV);

    float threshold = 0.02;
    float edgeWidth = 0.004 / uDpr;
    float t = smoothstep(threshold, threshold + edgeWidth, fluid);

    // Soft gray trail-visibility overlay (top image only).
    // Halo peaks just before the reveal threshold and fades out as
    // t -> 1 so the bottom image still appears clean inside the trail.
    float halo = smoothstep(0.0, threshold * 2.0, fluid) * (1.0 - t);
    vec3 trailGray = vec3(0.12);
    vec3 tintedTop = mix(topColor.rgb, trailGray, halo * 0.35);

    vec4 finalColor = mix(vec4(tintedTop, topColor.a), bottomColor, t);
    gl_FragColor = finalColor;
  }
`;
