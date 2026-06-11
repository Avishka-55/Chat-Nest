# ChatNest

Modern Real-Time SaaS Chat Application

ChatNest is a full-stack real-time chat application built with a modern tech stack, featuring real-time messaging, authentication, containerized deployment, and automated CI/CD using Kubernetes.

## 🔗 Live Links

### Primary (Custom Domain)

👉 http://chat.wmavishka.me

⚠️ Note: The production server may occasionally be offline because the EC2 instance is manually stopped to reduce cloud costs.

### Backup

👉 https://chatnest-12.netlify.app

## ✨ Features

* Real-time messaging (Socket.IO)
* Live online user status
* JWT authentication
* Profile avatar & bio customization
* Cloudinary image hosting
* Fully responsive modern UI
* Dockerized microservice deployment
* Kubernetes orchestration
* Automated CI/CD pipeline

## 🛠 Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* Socket.IO Client
* Axios

### Backend

* Node.js + Express
* MongoDB Atlas
* Socket.IO
* JWT Authentication
* Cloudinary

### Infrastructure & DevOps

* Docker
* DockerHub
* Kubernetes (k3s)
* Traefik Ingress Controller
* Horizontal Pod Autoscaler (HPA)
* Let's Encrypt SSL
* AWS EC2
* GitHub Actions (CI/CD)

## 💻 Local Setup

### Clone Repository

```bash
git clone https://github.com/Avishka-55/Chat-Nest.git
cd Chat-Nest
```

### Backend Setup

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

### Frontend Setup

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

## ☸️ Production Deployment

ChatNest is deployed on AWS EC2 using a lightweight Kubernetes (k3s) cluster.

### Architecture

* Frontend and backend containerized using Docker
* Images stored in DockerHub
* Kubernetes Deployments manage application pods
* Traefik Ingress Controller handles routing
* Let's Encrypt provides SSL certificates
* Horizontal Pod Autoscaler scales backend pods automatically
* GitHub Actions performs automated CI/CD deployments

### CI/CD Pipeline

```text
Developer Push
      ↓
GitHub Actions
      ↓
Build Docker Images
      ↓
Push to DockerHub
      ↓
kubectl Rollout Restart
      ↓
Kubernetes Rolling Update
```

### Kubernetes Features

* Rolling updates with zero downtime
* Automatic pod recovery
* Horizontal scaling (2–5 backend replicas)
* Sticky sessions for Socket.IO
* Secure secret management
* Automated deployment pipeline

## 👑 Author

Avishka — CS Graduate | Full Stack & DevOps Engineer

## ⭐ Support

If you found this project useful, consider giving it a star.
