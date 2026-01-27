#  ChatNest

Modern Real-Time SaaS Chat Application
ChatNest is a full-stack real-time chat application built with a modern tech stack, featuring real-time messaging, authentication, and a production-grade Docker + Nginx deployment with CI/CD.

##  Live Links

Primary (Custom Domain)
👉 https://chat.wmavishka.me

⚠️ Note: This server may occasionally be offline because it runs on an EC2 instance that is manually shut down to reduce cloud costs.

Backup (Always Available)
👉 https://chatnest-12.netlify.app

##  Features

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

- Node.js
- Express
- MongoDB Atlas
- Socket.IO
- JWT Authentication
- Cloudinary

### Cloud

- Render (Backend)
- Netlify (Frontend)

### Infrastructure & DevOps

- Docker & Docker Compose
- Nginx (Reverse Proxy)
- Let's Encrypt (SSL)
- AWS EC2 (Production Server)
- GitHub Actions (CI/CD)

##  Local Setup

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
MONGO_URL=your_mongodb_uri
JWT_SECRET=your_secret
CLOUDINARY_COLOUD_NAME=your_cloudinary_name
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
VITE_BACKEND_URL=your backend url
```

Run frontend:

```bash
npm run dev
```

## 🌍 Deployment

| Service  | Platform   |
|----------|-----------|
| Frontend | Netlify   |
| Backend  | Render    |
| Media    | Cloudinary |
| SSL      | Let's Encrypt|
| CI/CD    | Github Actions |

The EC2 deployment uses Docker Compose with Nginx as a reverse proxy and automatic deployments triggered on pushes to the production branch.


## 👑 Author

Avishka CS Undergraduate | Full Stack Developer

## ⭐ Support

Star ⭐ this repo if ChatNest helped you!
