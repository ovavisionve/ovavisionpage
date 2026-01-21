'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Procesando autenticación...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      const hash = window.location.hash;

      if (!hash) {
        setMessage('No se encontró token de autenticación');
        setTimeout(() => router.push('/admin/login'), 2000);
        return;
      }

      // Parse the hash to get the type
      const params = new URLSearchParams(hash.substring(1));
      const type = params.get('type');
      const accessToken = params.get('access_token');

      if (!accessToken) {
        setMessage('Token inválido');
        setTimeout(() => router.push('/admin/login'), 2000);
        return;
      }

      // Let Supabase handle the session from the URL
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        setMessage(`Error: ${error.message}`);
        setTimeout(() => router.push('/admin/login'), 2000);
        return;
      }

      if (session) {
        if (type === 'recovery') {
          // Password recovery - redirect to reset password page
          setMessage('Redirigiendo para cambiar contraseña...');
          router.push(`/admin/reset-password#${hash.substring(1)}`);
        } else {
          // Magic link or other - redirect to admin
          setMessage('Sesión iniciada. Redirigiendo...');
          router.push('/admin/blog');
        }
      } else {
        setMessage('No se pudo establecer la sesión');
        setTimeout(() => router.push('/admin/login'), 2000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass-card p-8 text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/70">{message}</p>
        </div>
      </div>
    </main>
  );
}
