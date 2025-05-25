'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function Contact() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
    renderer.setSize(200, 200);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // 3D Map Pin
    const pinGeometry = new THREE.ConeGeometry(0.3, 1, 32);
    const pinMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const pin = new THREE.Mesh(pinGeometry, pinMaterial);
    pin.position.set(0, 0, 0);
    scene.add(pin);

    // Camera and Controls
    camera.position.set(0, 1, 2);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      pin.rotation.y += 0.02;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Contactez-Nous</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Envoyez un Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Nom</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-400"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors"
              >
                Envoyer
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Nos Coordonnées</h2>
            <canvas ref={canvasRef} className="w-48 h-48 mx-auto mb-4" />
            <p className="mb-2"><strong>Email:</strong> contact@3ddour.com</p>
            <p className="mb-2"><strong>Téléphone:</strong> +213 123 456 789</p>
            <p className="mb-2"><strong>Adresse:</strong> Alger, Algérie</p>
            <p>Servant Hainaut et au-delà.</p>
          </div>
        </div>
      </div>
    </div>
  );
}