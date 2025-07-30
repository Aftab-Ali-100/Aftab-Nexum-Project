'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ChefHat } from 'lucide-react';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Auth error:', error);
        router.push('/auth?error=auth_error');
        return;
      }

      if (data.session) {
        router.push('/generate');
      } else {
        router.push('/auth');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="p-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mx-auto mb-4 animate-pulse">
          <ChefHat className="h-12 w-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Signing you in...</h2>
        <p className="text-gray-600">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}