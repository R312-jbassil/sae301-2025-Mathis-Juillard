// src/pages/api/signup.js
import PocketBase from 'pocketbase';

export const POST = async ({ request, cookies }) => {
  try {
    const { name, email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email et mot de passe requis." }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const PB_URL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8090'    // machine de dev
      : 'http://localhost:8091';   // machine de déploiement
    const pb = new PocketBase(PB_URL);

    // 1) Créer l'utilisateur dans la collection "users" (type Auth)
    await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
      name: name ?? "",
    });

    // 2) Connecter immédiatement l'utilisateur pour installer le cookie d'auth
    const authData = await pb.collection('users').authWithPassword(email, password);

    // 3) Écrire le cookie d'auth sécurisé
    cookies.set("pb_auth", pb.authStore.exportToCookie(), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    return new Response(JSON.stringify({ user: authData.record }), { 
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Signup error:", err);
    return new Response(JSON.stringify({ error: err?.message ?? "Signup failed" }), { 
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
};
