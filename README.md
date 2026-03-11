# AdTech Campaign Manager

Ce projet est une plateforme de gestion et de diffusion de campagnes publicitaires vidéo. Il se compose d'une API REST robuste et d'une interface moderne pour piloter les performances publicitaires.

## Architecture Technique

L'application repose sur une architecture découplée pour garantir une séparation claire des responsabilités :

- Frontend : Next.js 16 (App Router), TypeScript, Tailwind CSS, et Shadcn/ui pour une interface utilisateur réactive et professionnelle.

- Backend : Node.js avec Express et TypeScript, offrant une API structurée et typée.

- Base de données : MongoDB pour la flexibilité des schémas de données publicitaires.

- Validation : Zod pour la validation des données d'entrée côté client et Express-validator côté serveur.

### Installation et Lancement

Prérequis:

- Node.js (v18+)
- MongoDB (local ou Atlas)

1. Backend

```
cd backend
npm install

# Créez un fichier .env suivant le .env.example

npm run dev
```

2. Frontend

```
cd frontend
npm install

# Créez un fichier .env suivant le .env.example

npm run dev
```

### Réflexions sur la Scalabilité

Pour répondre aux contraintes de haute performance demandées dans l'exercice:

#### 1. Gestion de 1 million de requêtes par minute

Pour supporter cette charge sur l'endpoint /serve-ad:

- Mise en cache (Redis) : Stocker les campagnes actives dans Redis. Au lieu de requêter MongoDB à chaque impression, l'API interroge le cache en mémoire vive (latence < 1ms).

- Incrémentation Asynchrone : Ne pas attendre la mise à jour de la DB pour répondre à l'utilisateur. Utiliser un système de file d'attente (Message Broker comme RabbitMQ ou Kafka) pour traiter les incrémentations d'impressions en arrière-plan.

- Load Balancing : Déployer le backend sur plusieurs instances derrière un répartiteur de charge (Nginx ou AWS ALB).

#### 2. Gestion du Capping d'impressions

Pour limiter l'exposition répétitive d'une publicité à un même utilisateur:

- Capping par IP/UserID : Utiliser Redis avec une clé cap:{user_id}:{campaign_id} assortie d'un TTL (Time To Live). Si le compteur dépasse la limite définie, la campagne est exclue des résultats pour cet utilisateur.

#### 3. Stratégie de mise en Production

Pour assurer la stabilité et la disponibilité du système:

- Conteneurisation : Utiliser Docker et Docker Compose pour garantir la parité entre les environnements de développement et de production.

- CI/CD : Mettre en place des GitHub Actions pour automatiser les tests unitaires et le déploiement.

- Monitoring : Intégrer des outils comme Prometheus/Grafana pour surveiller le taux d'erreur et la latence de l'API.

### Améliorations possibles (Roadmap)

Si j'avais disposé de plus de temps, j'aurais implémenté:

- Tests Unitaires : Couverture complète avec Jest pour la logique de filtrage des campagnes.

- Authentification : Sécurisation du dashboard via NextAuth ou Clerk.
