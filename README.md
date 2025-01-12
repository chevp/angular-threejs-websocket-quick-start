
# Angular Three.js WebSocket Quick-Start

This project is a boilerplate for integrating Angular, Three.js, and WebSocket to build interactive 3D applications with real-time communication.

## Features

- **Angular Framework**: Modular and scalable architecture for building single-page applications.
- **Three.js Integration**: Create stunning 3D scenes, animations, and visualizations.
- **WebSocket Communication**: Real-time data exchange with WebSocket.
- **Quick Start**: Minimal setup for fast prototyping and learning.

---

## Setup Instructions

### Prerequisites

Ensure the following are installed on your system:

- [Node.js](https://nodejs.org/) and npm
- [Angular CLI](https://angular.io/cli) (Install with: `npm install -g @angular/cli`)

---

### Steps to Run the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chevp/angular-threejs-websocket-quick-start.git
   cd angular-threejs-websocket-quick-start
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   ng serve
   ```

   Open your browser and navigate to `http://localhost:4200` to see the app in action.

---

## Project Structure

- **src/app/three-scene.component.ts**: Contains the Three.js 3D scene setup and rendering logic.
- **src/app/websocket.service.ts**: Handles WebSocket connection and message exchange.
- **src/app/app.module.ts**: Angular module configuration.
- **src/app/app.component.html**: Entry point for the app UI.

---

## Sample Code Snippets

### Three.js Scene
A basic Three.js scene is set up in `three-scene.component.ts`:

```typescript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const animate = () => {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
};

animate();
```

### WebSocket Service
The `websocket.service.ts` provides WebSocket communication:

```typescript
@Injectable({ providedIn: 'root' })
export class WebSocketService {
  private socket!: WebSocket;

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message: string) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    }
  }
}
```

---

## Sample WebSocket Server
For testing, use this WebSocket server:

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
    ws.send(`Echo: ${message}`);
  });
  ws.send('Welcome to WebSocket Server');
});
```

Run the server:
```bash
node websocket-server.js
```

---

## Extending the Project

- **Scene Management**: Dynamically update scenes based on WebSocket messages.
- **UI Enhancements**: Use Angular Material for interactive controls.
- **Advanced Features**: Load GLTF models and implement animations with Three.js.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- [Angular](https://angular.io/)
- [Three.js](https://threejs.org/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

