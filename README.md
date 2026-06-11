# ChatNest

Modern Real-Time SaaS Chat Application

ChatNest is a full-stack real-time chat application built with a modern tech stack, featuring real-time messaging, authentication, and production-grade deployment with CI/CD.

## 🌿 Branches

| Branch | Description |
|---|---|
| `main` | Docker + Nginx deployment on AWS EC2 via Docker Compose |
| `k8s` | Kubernetes deployment on AWS EC2 using k3s |

> Each branch has its own CI/CD pipeline via GitHub Actions. See deployment details below.

## 🔗 Live Links

**Primary (Custom Domain)**
👉 http://chat.wmavishka.me

⚠️ Note: This server may occasionally be offline because it runs on an EC2 instance that is manually shut down to reduce cloud costs.

**Backup (Always Available)**
👉 https://chatnest-12.netlify.app

## ✨ Features

- Real-time messaging (Socket.IO)
- Live online user status
- JWT authentication
- Profile avatar & bio customization
- Cloudinary image hosting
- Fully responsive modern green UI
- Production-ready Dockerized deployment

## 🛠 Tech Stack

### Frontend
- React + Vite
- Tailwind CSS
- Socket.IO Client
- Axios

### Backend
- Node.js + Express
- MongoDB Atlas
- Socket.IO
- JWT Authentication
- Cloudinary

### Infrastructure & DevOps
- Docker & Docker Compose
- Kubernetes (k3s)
- Nginx / Traefik (Reverse Proxy)
- Let's Encrypt (SSL)
- AWS EC2 (Production Server)
- GitHub Actions (CI/CD)

## 💻 Local Setup

### Clone repo
```bash
git clone https://github.com/Avishka-55/Chat-Nest.git
cd Chat-Nest
```

### Backend setup
```bash
cd backend
npm install
```

Create `.env`:
```env
PORT=5000
MONGODB_URL=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Run backend:
```bash
npm run server
```

### Frontend setup
```bash
cd frontend
npm install
```

Create `.env`:
```env
VITE_BACKEND_URL=your_backend_url
```

Run frontend:
```bash
npm run dev
```

## 🌍 Deployment

### 🐳 main branch — Docker Compose
Simple single-server deployment using Docker Compose + Nginx reverse proxy on AWS EC2.

| Service | Platform |
|---|---|
| Frontend | Netlify & EC2 |
| Backend | Render & EC2 |
| Media | Cloudinary |
| SSL | Let's Encrypt |
| CI/CD | GitHub Actions → Docker Compose deploy |

Push to `main` → GitHub Actions builds images → SSHs into EC2 → `docker compose up`

### ☸️ k8s branch — Kubernetes
Production-grade deployment using k3s on AWS EC2.

| Feature | Details |
|---|---|
| Cluster | k3s (lightweight Kubernetes) |
| Ingress | Traefik (k3s built-in) |
| Auto-scaling | HPA — backend scales 2→5 pods at 70% CPU |
| Sticky sessions | Cookie-based affinity for Socket.IO |
| Secrets | Kubernetes Secrets (never in image) |
| CI/CD | GitHub Actions → DockerHub → kubectl rollout restart |

Push to `k8s` → GitHub Actions builds & pushes images to DockerHub → rolling restart on EC2

> See `chatnest-k8s/README.md` in the k8s branch for full setup instructions.

## 👑 Author

Avishka — CS Graduate | Full Stack Developer

## ⭐ Support

Star ⭐ this repo if ChatNest helped you!