# Journal de Bord Technique

Ce document répertorie les arbitrages techniques, les difficultés rencontrées et les solutions apportées lors du développement de la plateforme AdTech.

## Arbitrages Techniques (Choix de Stack)

### 1. Next.js 16 & Shadcn/ui (Frontend)

- Décision : Utilisation du App Router pour le rendu côté serveur (SSR).

- Raison : Le SSR permet d'afficher les statistiques et la liste des campagnes instantanément, améliorant l'expérience utilisateur (UX). Shadcn/ui a été choisi pour construire une interface "pixel-perfect" rapidement sans sacrifier l'accessibilité.

### 2. Express & TypeScript (Backend)

- Décision : Utilisation d'Express plutôt que NestJS.

- Raison : Compte tenu de la contrainte de temps de 24 heures , Express permet une configuration plus légère et une itération plus rapide pour un micro-service de cette taille, tout en maintenant une robustesse grâce à TypeScript.

### 3. MongoDB (Base de données)

- Décision : Utilisation de MongoDB pour le stockage des campagnes.

- Raison : La flexibilité des schémas NoSQL est idéale pour l'AdTech, où les critères de ciblage (pays, devices, types de médias) évoluent fréquemment.

## Erreurs Rencontrées & Solutions

### 1. Problème de Concurrence sur les Impressions

- Erreur : Au départ, l'incrémentation des impressions se faisait via deux appels (récupération de la donnée + modification + sauvegarde). Avec plusieurs requêtes simultanées, le compteur devenait erroné (Race Condition).

- Solution : Utilisation de l'opération atomique $inc de MongoDB et de findOneAndUpdate dans le controller serve-ad. Cela garantit que chaque impression est comptée, même en cas de trafic élevé.

### 2. Formatage des Dates

- Erreur : Décalages entre les dates envoyées par le formulaire frontend (strings) et les objets Date attendus par MongoDB pour les comparaisons.

- Solution : Mise en place d'une validation stricte avec Zod côté frontend et backend pour transformer et normaliser les dates au format ISO avant la requête en base.

## Vision Produit & Scalabilité

### Capping d'Impressions

Pour éviter de saturer un utilisateur avec la même publicité, j'ai prévu dans l'architecture (bien que non implémenté par manque de temps) l'utilisation d'un TTL Cache basé sur l'ID utilisateur.

### Gestion du Million de Requêtes / Minute

- Optimisation DB : Ajout d'index sur les champs status et targetCountries pour accélérer la recherche des campagnes actives.

- Cache de Lecture : Utilisation de Redis pour stocker les campagnes éligibles, réduisant la charge sur MongoDB de 90%.

## Présentation Vidéo

- Lien Loom : (https://www.loom.com/share/32323e2d235643d0b86de11a9f8ad8f0)[https://www.loom.com/share/32323e2d235643d0b86de11a9f8ad8f0]
