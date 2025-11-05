// src/pages/api/login.js
import PocketBase from 'pocketbase';

export const POST = async ({ request, cookies }) => {
  const { email, password } = await request.json();

  try {
    const PB_URL = process.env.NODE_ENV === 'development' 
      ? 'http://localhost:8090'    // machine de dev
      : 'http://localhost:8091';   // machine de déploiement
    const pb = new PocketBase(PB_URL);
    
    const auth = await pb
      .collection('users')
      .authWithPassword(email, password);

    // stocke le token PB dans un cookie httpOnly
    cookies.set("pb_auth", pb.authStore.exportToCookie(), {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    });

    return new Response(JSON.stringify({ user: auth.record }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("login error:", err);
    return new Response(JSON.stringify({ error: "Identifiants invalides" }), {
      headers: { "Content-Type": "application/json" },
      status: 401,
    });
  }
};
