import PocketBase from 'pocketbase';

// Instance PocketBase - utilise la variable d'environnement en production
const PB_URL = import.meta.env.PUBLIC_PB_URL || 'http://127.0.0.1:8090';
export const pb = new PocketBase(PB_URL);

// Types pour les collections
export interface Materiaux {
  id?: string;
  libelle: string;
  couleur?: string;
  created?: string;
  updated?: string;
}

export interface Lunettes {
  id?: string;
  nom_modele: string;
  svg_code: string;
  largeur_pont: number;
  taille_verres: number;
  date_creation?: string;
  materiaux_monture?: string;
  materiaux_branches?: string;
  users?: string;
  couleur_monture?: string;
  couleur_branches?: string;
  couleur_verres?: string;
  favori?: boolean;
  prix?: number;
}

export interface Commande {
  id?: string;
  date_commande?: string;
  users_?: string;
  created?: string;
  updated?: string;
}

export interface LigneCommande {
  id?: string;
  quantite: number;
  prix_unitaire: number;
  commande?: string;
  lunette?: string;
  created?: string;
  updated?: string;
  expand?: {
    lunette?: Lunettes;
  };
}

// Fonction pour sauvegarder une paire de lunettes
export async function saveLunettes(data: Lunettes) {
  try {
    const record = await pb.collection('Lunettes').create(data);
    return { success: true, data: record };
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return { success: false, error };
  }
}

// Fonction pour récupérer toutes les lunettes d'un utilisateur
export async function getUserLunettes(userId: string) {
  try {
    const records = await pb.collection('Lunettes').getFullList({
      filter: `users = "${userId}"`,
      sort: '-created',
    });
    return { success: true, data: records };
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return { success: false, error };
  }
}

// Fonction pour récupérer une paire de lunettes par ID
export async function getLunetteById(id: string) {
  try {
    const record = await pb.collection('Lunettes').getOne(id);
    return { success: true, data: record };
  } catch (error) {
    console.error('Erreur lors de la récupération:', error);
    return { success: false, error };
  }
}

// Fonction pour mettre à jour une paire de lunettes
export async function updateLunettes(id: string, data: Partial<Lunettes>) {
  try {
    const record = await pb.collection('Lunettes').update(id, data);
    return { success: true, data: record };
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return { success: false, error };
  }
}

// Fonction pour supprimer une paire de lunettes
export async function deleteLunettes(id: string) {
  try {
    await pb.collection('Lunettes').delete(id);
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return { success: false, error };
  }
}

// Fonction pour basculer le statut favori d'une paire de lunettes
export async function toggleFavori(id: string, currentStatus: boolean) {
  try {
    const record = await pb.collection('Lunettes').update(id, {
      favori: !currentStatus
    });
    return { success: true, data: record };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du favori:', error);
    return { success: false, error };
  }
}

// Fonction pour récupérer tous les matériaux
export async function getMateriaux() {
  try {
    const records = await pb.collection('Materiaux').getFullList({
      sort: 'nom',
    });
    return { success: true, data: records };
  } catch (error) {
    console.error('Erreur lors de la récupération des matériaux:', error);
    return { success: false, error };
  }
}

// Vérifier si l'utilisateur est connecté
export function isAuthenticated() {
  return pb.authStore.isValid;
}

// Récupérer l'utilisateur connecté
export function getCurrentUser() {
  return pb.authStore.model;
}

// Fonction de connexion
export async function login(email: string, password: string) {
  try {
    const authData = await pb.collection('users').authWithPassword(email, password);
    return { success: true, data: authData };
  } catch (error: any) {
    console.error('Erreur de connexion:', error);
    return { 
      success: false, 
      error: error.message || 'Erreur lors de la connexion' 
    };
  }
}

// Fonction d'inscription
export async function register(email: string, password: string, passwordConfirm: string, name: string) {
  try {
    // Créer l'utilisateur
    const user = await pb.collection('users').create({
      email,
      password,
      passwordConfirm,
      nom: name,
      emailVisibility: true,
    });

    // Connexion automatique après inscription
    const authData = await pb.collection('users').authWithPassword(email, password);
    
    return { success: true, data: authData };
  } catch (error: any) {
    console.error('Erreur d\'inscription:', error);
    return { 
      success: false, 
      error: error.message || 'Erreur lors de l\'inscription' 
    };
  }
}

// Fonction de déconnexion
export function logout() {
  pb.authStore.clear();
}

// ============ FONCTIONS PANIER ============

// Récupérer ou créer le panier actif de l'utilisateur
export async function getOrCreateCart(userId: string) {
  try {
    // Chercher une commande active (sans date de commande = panier)
    const existingCarts = await pb.collection('Commandes').getFullList({
      filter: `users_ = "${userId}" && date_commande = null`,
      sort: '-created',
    });

    if (existingCarts.length > 0) {
      return { success: true, data: existingCarts[0] };
    }

    // Créer un nouveau panier si aucun n'existe
    const newCart = await pb.collection('Commandes').create({
      users_: userId,
      date_commande: null,
    });

    return { success: true, data: newCart };
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return { success: false, error };
  }
}

// Ajouter une lunette au panier
export async function addToCart(lunetteId: string, quantite: number = 1, prixUnitaire: number = 150) {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'Utilisateur non connecté' };
    }

    // Récupérer ou créer le panier
    const cartResult = await getOrCreateCart(currentUser.id);
    if (!cartResult.success || !cartResult.data) {
      return { success: false, error: 'Impossible de créer le panier' };
    }

    const cart = cartResult.data;

    // Vérifier si la lunette est déjà dans le panier
    const existingLines = await pb.collection('Lignes_Commande').getFullList({
      filter: `commande = "${cart.id}" && lunette = "${lunetteId}"`,
    });

    if (existingLines.length > 0) {
      // Mettre à jour la quantité
      const line = existingLines[0];
      const updatedLine = await pb.collection('Lignes_Commande').update(line.id, {
        quantite: line.quantite + quantite,
      });
      return { success: true, data: updatedLine };
    }

    // Créer une nouvelle ligne
    const newLine = await pb.collection('Lignes_Commande').create({
      commande: cart.id,
      lunette: lunetteId,
      quantite,
      prix_unitaire: prixUnitaire,
    });

    return { success: true, data: newLine };
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    return { success: false, error };
  }
}

// Récupérer les articles du panier
export async function getCartItems(userId: string) {
  try {
    // Récupérer le panier actif
    const cartResult = await getOrCreateCart(userId);
    if (!cartResult.success || !cartResult.data) {
      return { success: true, data: [] };
    }

    const cart = cartResult.data;

    // Récupérer les lignes avec les lunettes
    const lines = await pb.collection('Lignes_Commande').getFullList({
      filter: `commande = "${cart.id}"`,
      expand: 'lunette',
      sort: '-created',
    });

    return { success: true, data: lines };
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return { success: false, error };
  }
}

// Mettre à jour la quantité d'une ligne
export async function updateCartItemQuantity(lineId: string, quantite: number) {
  try {
    if (quantite <= 0) {
      return await removeFromCart(lineId);
    }

    const updatedLine = await pb.collection('Lignes_Commande').update(lineId, {
      quantite,
    });

    return { success: true, data: updatedLine };
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return { success: false, error };
  }
}

// Supprimer une ligne du panier
export async function removeFromCart(lineId: string) {
  try {
    await pb.collection('Lignes_Commande').delete(lineId);
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
    return { success: false, error };
  }
}

// Vider le panier
export async function clearCart(userId: string) {
  try {
    const cartResult = await getOrCreateCart(userId);
    if (!cartResult.success || !cartResult.data) {
      return { success: true };
    }

    const cart = cartResult.data;

    // Supprimer toutes les lignes
    const lines = await pb.collection('Lignes_Commande').getFullList({
      filter: `commande = "${cart.id}"`,
    });

    for (const line of lines) {
      await pb.collection('Lignes_Commande').delete(line.id);
    }

    return { success: true };
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error);
    return { success: false, error };
  }
}

// Valider la commande
export async function validateOrder(userId: string) {
  try {
    const cartResult = await getOrCreateCart(userId);
    if (!cartResult.success || !cartResult.data) {
      return { success: false, error: 'Panier introuvable' };
    }

    const cart = cartResult.data;

    // Vérifier qu'il y a des articles
    const lines = await pb.collection('Lignes_Commande').getFullList({
      filter: `commande = "${cart.id}"`,
    });

    if (lines.length === 0) {
      return { success: false, error: 'Le panier est vide' };
    }

    // Mettre à jour la commande avec la date
    const updatedOrder = await pb.collection('Commandes').update(cart.id, {
      date_commande: new Date().toISOString(),
    });

    return { success: true, data: updatedOrder };
  } catch (error) {
    console.error('Erreur lors de la validation:', error);
    return { success: false, error };
  }
}
