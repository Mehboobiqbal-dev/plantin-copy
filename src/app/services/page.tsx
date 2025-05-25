'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Services() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(300, 300);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Procedural House
    const house = new THREE.Group();
    const wallGeometry = new THREE.BoxGeometry(2, 1, 0.1);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc });
    const walls = [
      { position: [0, 0.5, -1] },
      { position: [0, 0.5, 1] },
      { position: [-1, 0.5, 0], rotation: [0, Math.PI / 2, 0] },
      { position: [1, 0.5, 0], rotation: [0, Math.PI / 2, 0] },
    ];
    walls.forEach((wall) => {
      const mesh = new THREE.Mesh(wallGeometry, wallMaterial);
      mesh.position.set(...wall.position);
      if (wall.rotation) mesh.rotation.set(...wall.rotation);
      house.add(mesh);
    });
    const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, 1.5, 0);
    house.add(roof);
    scene.add(house);

    // Camera and Controls
    camera.position.set(3, 2, 3);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      house.rotation.y += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      if (canvasRef.current) {
        const { width, height } = canvasRef.current.getBoundingClientRect();
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Nos Services</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <canvas ref={canvasRef} className="w-full h-64 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Visites Virtuelles 3D</h2>
            <p>Explorez des propriétés en détail avec des visites immersives en 3D, accessibles sur tous les appareils.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-full h-64 bg-gray-700 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-400">Icône 3D HDR (bientôt)</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Photos HDR</h2>
            <p>Capturez chaque détail avec des images haute dynamique, parfaites pour mettre en valeur les biens immobiliers.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-full h-64 bg-gray-700 rounded mb-4 flex items-center justify-center">
              <span className="text-gray-400">Icône 3D Web (bientôt)</span>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Création de Sites Web</h2>
            <p>Des sites modernes et optimisés pour présenter vos propriétés et attirer des clients.</p>
          </div>
        </div>
      </div>
    </div>
  );
}