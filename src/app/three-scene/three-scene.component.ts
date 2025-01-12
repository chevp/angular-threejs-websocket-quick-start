import { Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  standalone: true,
  imports: [],
  template: '<canvas #canvas></canvas>',
})
export class ThreeSceneComponent {

  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef;

  // Three.js variables
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private cube!: THREE.Mesh;

  constructor() {}

  ngOnInit(): void {
    this.initThreeJS();
    this.animate();
  }

  initThreeJS() {
    const canvas = this.canvasRef.nativeElement;

    // Create a WebGL renderer
    this.renderer = new THREE.WebGLRenderer({ canvas });

    // Set size for the renderer
    // this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Set the size for the renderer to match your desired width and height
    this.renderer.setSize(780, 365);

    // Create a new scene
    this.scene = new THREE.Scene();

    // Create a camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Create a simple cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);

    // Add the cube to the scene
    this.scene.add(this.cube);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Rotate the cube
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Render the scene from the perspective of the camera
    this.renderer.render(this.scene, this.camera);
  }

}
