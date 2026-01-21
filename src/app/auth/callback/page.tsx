'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Procesando autenticación...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const hash = window.location.hash;

        if (!hash || hash.length < 2) {
          setMessage('No se encontró token de autenticación');
          setTimeout(() => router.push('/admin/login'), 2000);
          return;
        }

        // Parse the hash parameters
        const hashParams = new URLSearchParams(hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        const type = hashParams.get('type');

        if (!accessToken || !refreshToken) {
          setMessage('Token inválido o incompleto');
          setTimeout(() => router.push('/admin/login'), 2000);
          return;
        }

        // Set the session manually
        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          console.error('Error setting session:', error);
          setMessage(`Error: ${error.message}`);
          setTimeout(() => router.push('/admin/login'), 3000);
          return;
        }

        if (data.session) {
          if (type === 'recovery') {
            setMessage('Redirigiendo para cambiar contraseña...');
            router.push('/admin/reset-password');
          } else {
            setMessage('Sesión iniciada correctamente. Redirigiendo...');
            router.push('/admin/blog');
          }
        } else {
          setMessage('No se pudo establecer la sesión');
          setTimeout(() => router.push('/admin/login'), 2000);
        }
      } catch (err) {
        console.error('Callback error:', err);
        setMessage('Error procesando la autenticación');
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
