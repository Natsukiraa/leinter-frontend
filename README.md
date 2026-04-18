# Clean Code

## Membres de l'équipe
- GAZIO Maladie (Maël) 🦠
- PHE Lina 🐱
- TECHER Mathis 🤖

## Déploiement du projet

### Prérequis
- Aucun

### Variables d'environnement
| Nom de la variable | Description |
|--------------------|-------------|
| `NUXT_PUBLIC_API_BASE_URL`    | URL de base de l'API utilisée par le frontend. |


### Déploiement

Les déploiements sont réalisés automatiquement via une Github Action à chaque push sur la branche `main`. Le projet est hébergé sur Firebase Hosting.

L'URL de l'API peut être configurée dynamiquement via la variable GitHub Actions `NUXT_PUBLIC_API_BASE_URL` (Settings → Secrets and variables → Actions → Variables).