- Nom: Juillard
- Prénom: Mathis
- URL pocketbase: https://sae-301.mathis-juillard.fr/_/
- URL:https://sae-301.mathis-juillard.fr/

Problèmes rencontrés et éléments non finalisés

Malgré le bon fonctionnement du projet en local (PocketBase, serveur Astro, SVG, etc.), certains points n’ont pas pu être finalisés lors du déploiement sur le VPS :

Blocage du VPS après un déploiement GitHub Actions :
Le dernier déploiement s’est exécuté en boucle infinie, provoquant une saturation du serveur (port SSH bloqué, Apache inactif).
Le VPS reste accessible en ping, mais aucune connexion SSH ou HTTPS n’est possible.

Déploiement automatique interrompu :
L’action GitHub se coupe au bout de 15 minutes, empêchant la mise à jour du site en production.
Cela empêche la prise en compte du dernier commit pourtant fonctionnel en local.

En local

Tout fonctionne correctement :

Le site Astro est opérationnel et entièrement responsive.

PocketBase gère bien les utilisateurs, les commandes et les vues.

Les SVG se génèrent et s’affichent sans erreur.