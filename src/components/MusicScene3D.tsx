import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, RoundedBox } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const MusicNote = ({ position, color, delay }: { position: [number, number, number]; color: string; delay: number }) => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + delay;
    ref.current.position.y = position[1] + Math.sin(t * 1.5) * 0.4;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.3;
    ref.current.rotation.y = t * 0.5;
  });

  return (
    <group ref={ref} position={position}>
      {/* Note head */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0.3]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Note stem */}
      <mesh position={[0.12, 0.35, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.7, 8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Note flag */}
      <mesh position={[0.2, 0.6, 0]} rotation={[0, 0, -0.5]}>
        <planeGeometry args={[0.2, 0.15]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

const GuitarBody = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.3) * 0.4;
    ref.current.rotation.x = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <group ref={ref}>
      {/* Guitar body - lower bout */}
      <mesh position={[0, -0.3, 0]}>
        <sphereGeometry args={[0.7, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="hsl(30, 70%, 35%)" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Guitar body - upper bout */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color="hsl(30, 70%, 35%)" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Sound hole */}
      <Torus args={[0.18, 0.03, 16, 32]} position={[0, -0.1, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="hsl(38, 90%, 55%)" metalness={0.9} roughness={0.1} />
      </Torus>
      {/* Neck */}
      <RoundedBox args={[0.15, 1.4, 0.08]} position={[0, 1.3, 0]} radius={0.03}>
        <meshStandardMaterial color="hsl(20, 50%, 25%)" metalness={0.2} roughness={0.7} />
      </RoundedBox>
      {/* Headstock */}
      <RoundedBox args={[0.2, 0.4, 0.06]} position={[0, 2.1, 0]} radius={0.04}>
        <meshStandardMaterial color="hsl(20, 50%, 20%)" metalness={0.3} roughness={0.6} />
      </RoundedBox>
      {/* Strings */}
      {[-0.04, -0.015, 0.01, 0.035].map((x, i) => (
        <mesh key={i} position={[x, 0.9, 0.2]}>
          <cylinderGeometry args={[0.003 + i * 0.001, 0.003 + i * 0.001, 2.4, 4]} />
          <meshStandardMaterial color="hsl(40, 30%, 70%)" metalness={0.95} roughness={0.05} />
        </mesh>
      ))}
      {/* Bridge */}
      <RoundedBox args={[0.25, 0.04, 0.04]} position={[0, -0.35, 0.25]} radius={0.01}>
        <meshStandardMaterial color="hsl(20, 40%, 20%)" metalness={0.4} roughness={0.5} />
      </RoundedBox>
    </group>
  );
};

const FloatingRing = ({ radius, color, speed, yOffset }: { radius: number; color: string; speed: number; yOffset: number }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed;
    ref.current.rotation.z = t * speed * 0.5;
    ref.current.position.y = yOffset + Math.sin(t * 0.7) * 0.2;
  });

  return (
    <Torus ref={ref} args={[radius, 0.02, 16, 64]} position={[0, yOffset, 0]}>
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} transparent opacity={0.6} />
    </Torus>
  );
};

const Particles = () => {
  const count = 40;
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="hsl(38, 90%, 55%)" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

const MusicScene3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0.5, 5], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="hsl(38, 90%, 75%)" />
        <pointLight position={[-3, 2, 2]} intensity={0.5} color="hsl(30, 70%, 55%)" />
        <pointLight position={[2, -2, 3]} intensity={0.3} color="hsl(38, 90%, 55%)" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <GuitarBody />
        </Float>

        <MusicNote position={[-1.8, 1.2, 0.5]} color="hsl(38, 90%, 55%)" delay={0} />
        <MusicNote position={[1.6, 0.8, -0.5]} color="hsl(30, 70%, 50%)" delay={2} />
        <MusicNote position={[-1.2, -0.5, 1]} color="hsl(38, 80%, 60%)" delay={4} />

        <FloatingRing radius={1.8} color="hsl(38, 90%, 55%)" speed={0.3} yOffset={0.5} />
        <FloatingRing radius={2.2} color="hsl(30, 70%, 45%)" speed={-0.2} yOffset={-0.2} />

        <Float speed={2} floatIntensity={1}>
          <Sphere args={[0.12, 16, 16]} position={[2, 1.5, -1]}>
            <MeshDistortMaterial color="hsl(38, 90%, 55%)" metalness={0.8} roughness={0.2} distort={0.4} speed={3} />
          </Sphere>
        </Float>

        <Particles />
      </Canvas>
    </div>
  );
};

export default MusicScene3D;
