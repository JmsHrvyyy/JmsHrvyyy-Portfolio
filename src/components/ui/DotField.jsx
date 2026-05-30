// src/components/ui/DotField.jsx
// =========================================================================
// DOTFIELD CORE ENGINE - HIGH-PERFORMANCE MAGNETIC EVASION EDITION
// =========================================================================
import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function DotField({
  dotRadius = 1.2,
  dotSpacing = 30,
  cursorRadius = 200,
  cursorForce = -0.6, // Naka-negative para sa push-away force/evasion logic
  bulgeOnly = false, // Naka-false para sa XY responsive plane displacement
  bulgeStrength = 0,
  glowRadius = 120,
  sparkle = false,
  waveAmplitude = 2.5,
  gradientFrom = "rgba(0, 255, 247, 0.15)",
  gradientTo = "rgba(0, 85, 255, 0.04)",
  glowColor = "#010b14",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      0,
      width,
      height,
      0,
      -1000,
      1000,
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(-9999, -9999);
    const targetMouse = new THREE.Vector2(-9999, -9999);

    const vertexShader = `
      uniform vec2 u_mouse;
      uniform float u_cursorRadius;
      uniform float u_cursorForce;
      uniform bool u_bulgeOnly;
      uniform float u_bulgeStrength;
      uniform float u_waveAmplitude;
      uniform float u_time;
      varying vec2 v_gridPos;
      void main() {
        v_gridPos = position.xy;
        vec3 pos = vec3(position.xy, 0.0);
        float d = distance(pos.xy, u_mouse);
        if (d < u_cursorRadius) {
          float factor = 1.0 - (d / u_cursorRadius);
          float move = factor * u_cursorForce * 50.0;
          if (u_bulgeOnly) {
            pos.z += factor * u_bulgeStrength;
          } else {
            vec2 dir = normalize(pos.xy - u_mouse);
            pos.xy += dir * move;
          }
        }
        if (u_waveAmplitude > 0.0) {
          pos.z += sin(pos.x * 0.01 + u_time * 2.0) * u_waveAmplitude;
        }
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = u_waveAmplitude > 0.0 ? (3.0 + (pos.z / u_waveAmplitude) * 2.0) : 3.0;
      }
    `;

    const fragmentShader = `
      uniform vec2 u_resolution;
      uniform vec3 u_gradFrom;
      uniform vec3 u_gradTo;
      uniform vec3 u_glowColor;
      uniform vec2 u_mouse;
      uniform float u_glowRadius;
      uniform bool u_sparkle;
      uniform float u_time;
      varying vec2 v_gridPos;
      float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
      }
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        vec3 gradient = mix(u_gradFrom, u_gradTo, st.y);
        float dMouse = distance(v_gridPos, u_mouse);
        float glow = 0.0;
        if (dMouse < u_glowRadius) {
          glow = 1.0 - (dMouse / u_glowRadius);
          glow = pow(glow, 2.0);
        }
        vec3 finalColor = mix(gradient, u_glowColor, glow * 0.4);
        float alpha = 1.0;
        if (u_sparkle) {
          float n = rand(v_gridPos + u_time * 0.05);
          if (n > 0.98) alpha = 0.3 + 0.7 * sin(u_time * 5.0 + v_gridPos.x);
        }
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    const parseColor = (str) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = str;
      ctx.fillRect(0, 0, 1, 1);
      const data = ctx.getImageData(0, 0, 1, 1).data;
      return new THREE.Color(data[0] / 255, data[1] / 255, data[2] / 255);
    };

    const cFrom = parseColor(gradientFrom);
    const cTo = parseColor(gradientTo);
    const cGlow = parseColor(glowColor);

    const cols = Math.floor(width / dotSpacing) + 2;
    const rows = Math.floor(height / dotSpacing) + 2;
    const numPoints = cols * rows;

    const positions = new Float32Array(numPoints * 3);
    let index = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        positions[index++] = i * dotSpacing - (cols * dotSpacing - width) / 2;
        positions[index++] = j * dotSpacing - (rows * dotSpacing - height) / 2;
        positions[index++] = 0;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        u_mouse: { value: mouse },
        u_cursorRadius: { value: cursorRadius },
        u_cursorForce: { value: cursorForce },
        u_bulgeOnly: { value: bulgeOnly },
        u_bulgeStrength: { value: bulgeStrength },
        u_glowRadius: { value: glowRadius },
        u_waveAmplitude: { value: waveAmplitude },
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(width, height) },
        u_gradFrom: { value: cFrom },
        u_gradTo: { value: cTo },
        u_glowColor: { value: cGlow },
        u_sparkle: { value: sparkle },
      },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = rect.height - (e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
      targetMouse.set(-9999, -9999);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // =========================================================================
    // NATIVE PERFORMANCE CLOCK DEPLOYMENT (ZERO DEPRECATION WARNINGS)
    // =========================================================================
    let startTime = performance.now();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Kinakalkula ang lumipas na segundo gamit ang native performance monitor ng browser
      const elapsedTime = (performance.now() - startTime) / 1000;
      material.uniforms.u_time.value = elapsedTime;

      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;
      material.uniforms.u_mouse.value.copy(mouse);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.right = w;
      camera.top = h;
      camera.updateProjectionMatrix();
      material.uniforms.u_resolution.value.set(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    glowRadius,
    waveAmplitude,
    gradientFrom,
    gradientTo,
    glowColor,
    sparkle,
  ]);

  return <div ref={containerRef} className="w-full h-full" />;
}
