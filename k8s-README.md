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
    └── ingress.yaml            # nginx ingress + sticky sessions + TLS
```

## Prerequisites on your EC2 (k3s)
```bash
# install k3s
curl -sfL https://get.k3s.io | sh -

# install nginx ingress controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.10.0/deploy/static/provider/cloud/deploy.yaml

# install cert-manager (for SSL)
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.14.0/cert-manager.yaml
```

## Step 1 — Build & push Docker images
```bash
# backend
docker build -t avishka55/chatnest-backend:latest ./backend
docker push avishka55/chatnest-backend:latest

# frontend
docker build -t avishka55/chatnest-frontend:latest ./frontend
docker push avishka55/chatnest-frontend:latest
```

## Step 2 — Encode your secrets
```bash
echo -n "your_mongo_url" | base64
echo -n "your_jwt_secret" | base64
# etc...
```
Paste the values into `secrets/secrets.yaml`

## Step 3 — Apply in order
```bash
kubectl apply -f namespace-hpa.yaml
kubectl apply -f secrets/secrets.yaml
kubectl apply -f backend/deployment.yaml
kubectl apply -f frontend/deployment.yaml
kubectl apply -f ingress/ingress.yaml
```

## Step 4 — Verify everything
```bash
kubectl get all -n chatnest
kubectl get ingress -n chatnest
kubectl logs -n chatnest deployment/backend
```

## ⚠️ Add to .gitignore
```
secrets/secrets.yaml
```

## Notes
- MongoDB stays on Atlas, no changes needed
- Socket.IO sticky sessions configured via cookie affinity on ingress
- HPA scales backend from 2 to 5 pods based on CPU (70% threshold)
- Health check endpoint needed: GET /api/health → 200 OK
