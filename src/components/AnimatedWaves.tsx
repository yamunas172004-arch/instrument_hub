import { useEffect, useRef } from 'react';

const AnimatedWaves = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawWave = (
      yBase: number,
      amplitude: number,
      frequency: number,
      speed: number,
      color: string,
      width: number,
      height: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 2) {
        const y =
          yBase +
          Math.sin(x * frequency + time * speed) * amplitude +
          Math.sin(x * frequency * 0.5 + time * speed * 1.3) * amplitude * 0.5;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      // Dark background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, 'hsl(20, 10%, 6%)');
      bgGrad.addColorStop(1, 'hsl(20, 10%, 3%)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Waves from back to front
      drawWave(height * 0.55, 40, 0.004, 0.4, 'hsla(38, 90%, 55%, 0.06)', width, height);
      drawWave(height * 0.6, 35, 0.005, 0.6, 'hsla(30, 70%, 45%, 0.08)', width, height);
      drawWave(height * 0.65, 30, 0.006, 0.8, 'hsla(38, 90%, 55%, 0.1)', width, height);
      drawWave(height * 0.72, 25, 0.007, 1.0, 'hsla(30, 70%, 45%, 0.12)', width, height);
      drawWave(height * 0.8, 20, 0.008, 1.2, 'hsla(38, 80%, 50%, 0.14)', width, height);

      // Top ambient glow
      const glow = ctx.createRadialGradient(width * 0.5, height * 0.25, 0, width * 0.5, height * 0.25, width * 0.5);
      glow.addColorStop(0, 'hsla(38, 90%, 55%, 0.08)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      time += 0.015;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default AnimatedWaves;
