'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we have a recovery token in the URL hash
    const hash = window.location.hash;
    if (hash && hash.includes('type=recovery')) {
      setHasToken(true);
      // Supabase client will automatically handle the token from the hash
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setError(`Error: ${error.message}`);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/blog');
        }, 2000);
      }
    } catch {
      setError('Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Contraseña Actualizada</h1>
            <p className="text-foreground/70">Redirigiendo al panel de administración...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!hasToken) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Enlace Inválido</h1>
            <p className="text-foreground/70 mb-6">
              Este enlace de recuperación no es válido o ha expirado.
            </p>
            <Button onClick={() => router.push('/admin/login')} variant="hero">
              Ir al Login
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 8C15 3.58172 18.5817 0 23 0H37C41.4183 0 45 3.58172 45 8C45 12.4183 41.4183 16 37 16H23C18.5817 16 15 12.4183 15 8Z" fill="white"/>
              <circle cx="12" cy="28" r="12" fill="white"/>
              <circle cx="48" cy="28" r="12" fill="white"/>
              <path d="M25 24C25 24 30 32 30 32C30 32 35 24 35 24" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">Nueva Contraseña</h1>
          <p className="text-foreground/70 text-center mb-6">
            Ingresa tu nueva contraseña
          </p>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Lock className="w-4 h-4" />
                Nueva Contraseña
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Lock className="w-4 h-4" />
                Confirmar Contraseña
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
