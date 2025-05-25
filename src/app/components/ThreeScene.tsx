'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js';

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827); // Match bg-gray-900
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Load EXR Panorama
    const exrLoader = new EXRLoader();
    exrLoader.load(
      '/textures/panorama.exr', // Your EXR file
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1); // Invert for inside view
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Hotspots (adjust positions based on panorama)
        const hotspots = [
          { position: new THREE.Vector3(100, 0, 0), label: 'Salon' },
          { position: new THREE.Vector3(-100, 0, 0), label: 'Cuisine' },
          { position: new THREE.Vector3(0, 0, 100), label: 'Chambre' },
        ];
        hotspots.forEach((hotspot) => {
          const geometry = new THREE.SphereGeometry(10, 32, 32);
          const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
          const sphere = new THREE.Mesh(geometry, material);
          sphere.position.copy(hotspot.position);
          sphere.userData = { label: hotspot.label };
          scene.add(sphere);
        });

        // Click Handler for Hotspots
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const onClick = (event: MouseEvent) => {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          const intersects = raycaster.intersectObjects(scene.children, true);
          if (intersects.length > 0) {
            const obj = intersects[0].object;
            if (obj.userData.label) {
              alert(`Visiter: ${obj.userData.label}`);
            }
          }
        };
        window.addEventListener('click', onClick);

        setIsLoading(false);

        // Animation Loop
        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
          window.removeEventListener('click', onClick);
        };
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error) => {
        console.error('Error loading EXR panorama:', error);
        setIsLoading(false);
      }
    );

    // Camera Position (inside panorama sphere)
    camera.position.set(0, 0, 0.1);

    // Orbit Controls (panning only)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // No zoom for panorama
    controls.minDistance = 0;
    controls.maxDistance = 0;

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

  return (
    <div ref={mountRef} className="absolute inset-0 z-0">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}