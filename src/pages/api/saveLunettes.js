// src/pages/api/saveLunettes.js
export const prerender = false;

import PocketBase from 'pocketbase';

const PB_URL = process.env.PUBLIC_PB_URL || 'http://127.0.0.1:8090';
const pb = new PocketBase(PB_URL);

export async function POST({ request, cookies }) {
  try {
    // 1) Lecture des données (incluant le userId envoyé par le client)
    const data = await request.json().catch(() => ({}));

    const userId = data.users;
    if (!userId) {
      return new Response(JSON.stringify({ success: false, error: "User ID manquant" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log('=== Sauvegarde lunettes ===');
    console.log('User ID:', userId);
    console.log('SVG length:', data.svg_code?.length || 0);

    const payload = {
      nom_modele: (data.nom_modele || "Ma paire").toString(),
      svg_code: (data.svg_code || "").toString(),
      largeur_pont: parseFloat(data.largeur_pont) || 18,
      taille_verres: parseFloat(data.taille_verres) || 52,
      date_creation: data.date_creation || new Date().toISOString(),
      couleur_monture: data.couleur_monture || "#2D2926",
      couleur_branches: data.couleur_branches || "#2D2926",
      couleur_verres: data.couleur_verres || "#ABC4A1",
      materiaux_monture: data.materiaux_monture || "",
      materiaux_branches: data.materiaux_branches || "",
      users: userId,
      favori: data.favori || false,
      prix: parseFloat(data.prix) || 0,
    };

    console.log('Payload:', { ...payload, svg_code: payload.svg_code.substring(0, 50) + '...' });

    // 3) Création en base
    const record = await pb.collection('Lunettes').create(payload);

    console.log('Record créé:', record.id);

    return new Response(JSON.stringify({ success: true, id: record.id, data: record }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error saving lunettes:", err);
    return new Response(JSON.stringify({ 
      success: false, 
      error: err?.message || "Server error",
      details: err?.data || null
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
