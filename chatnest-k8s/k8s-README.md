# ChatNest — Kubernetes Deployment

## Structure
```
chatnest-k8s/
├── namespace-hpa.yaml          # namespace + auto-scaling
├── secrets/
│   └── secrets.yaml            # env secrets (DON'T COMMIT)
├── backend/
│   └── deployment.yaml         # backend deployment + service
├── frontend/
│   └── deployment.yaml         # frontend deployment + service
└── ingress/
    └── ingress-traefik.yaml    # traefik ingress + sticky sessions
```

## Prerequisites on your EC2
```bash
# install k3s (comes with traefik built-in, no extra ingress controller needed)
curl -sfL https://get.k3s.io | sh -

# verify cluster is ready
sudo kubectl get nodes
```

## Step 1 — Build & push Docker images
```bash
# backend
docker build -t avishka55/chatnest-backend:latest ./backend
docker push avishka55/chatnest-backend:latest

# frontend (VITE_BACKEND_URL gets baked into the React build)
docker build \
  --build-arg VITE_BACKEND_URL=http://chat.wmavishka.me \
  -t avishka55/chatnest-frontend:latest ./frontend
docker push avishka55/chatnest-frontend:latest
```

## Step 2 — Encode your secrets
```bash
# use printf to avoid newline/encoding issues
printf 'your_actual_value' | base64 -w 0
```
Paste each encoded value into `secrets/secrets.yaml`

>  Secret keys must match your backend .env variable names exactly
> e.g. if your backend uses `MONGODB_URL`, the secret key must also be `MONGODB_URL`

## Step 3 — Apply in order
```bash
sudo kubectl apply -f namespace-hpa.yaml
sudo kubectl apply -f secrets/secrets.yaml
sudo kubectl apply -f backend/deployment.yaml
sudo kubectl apply -f frontend/deployment.yaml
sudo kubectl apply -f ingress/ingress-traefik.yaml
```

## Step 4 — Patch external IP (bare EC2, no cloud load balancer)
```bash
# get your EC2 public IP
curl ifconfig.me

# patch ingress controller with your EC2 IP
sudo kubectl patch svc ingress-nginx-controller \
  -n ingress-nginx \
  -p '{"spec":{"externalIPs":["YOUR_EC2_IP"]}}'
```

## Step 5 — Verify everything
```bash
sudo kubectl get all -n chatnest
sudo kubectl get ingress -n chatnest
sudo kubectl logs -n chatnest deployment/backend
```

## CI/CD (GitHub Actions)
Push to `k8s` branch triggers:
1. Build backend image → push to DockerHub
2. Build frontend image → push to DockerHub
3. SSH into EC2 → rolling restart of both deployments

**Required GitHub Secrets:**
| Secret | Value |
|---|---|
| `DOCKERHUB_USERNAME` | `avishka55` |
| `DOCKERHUB_TOKEN` | DockerHub access token (Read & Write) |
| `VITE_BACKEND_URL` | `http://chat.wmavishka.me` |
| `EC2_K8S_HOST` | your EC2 public IP |
| `EC2_K8S_SSH_KEY` | contents of your `.pem` file |

##  Add to .gitignore
```
secrets/secrets.yaml
```

## Notes
- MongoDB stays on Atlas — add your EC2 IP to Atlas Network Access whitelist
- traefik is k3s built-in, no need to install nginx ingress controller
- Socket.IO sticky sessions configured via cookie affinity on ingress
- HPA scales backend from 2 to 5 pods based on CPU (70% threshold)
- Health check endpoint: `GET /api/status` → 200 OK
- Frontend env vars are baked in at build time, backend secrets are injected by k8s at runtime