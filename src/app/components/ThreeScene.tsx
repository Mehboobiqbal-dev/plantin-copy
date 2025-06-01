'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Simple 3D House Model
    const houseGroup = new THREE.Group();
    
    // Base (Foundation)
    const baseGeometry = new THREE.BoxGeometry(10, 0.5, 8);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    houseGroup.add(base);

    // Walls
    const wallGeometry = new THREE.BoxGeometry(10, 4, 8);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xf5f5f5 });
    const walls = new THREE.Mesh(wallGeometry, wallMaterial);
    walls.position.y = 2.25;
    houseGroup.add(walls);

    // Roof
    const roofGeometry = new THREE.ConeGeometry(7.5, 3, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x800000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 5;
    roof.rotation.y = Math.PI / 4;
    houseGroup.add(roof);

    scene.add(houseGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Camera Position
    camera.position.z = 15;

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
}