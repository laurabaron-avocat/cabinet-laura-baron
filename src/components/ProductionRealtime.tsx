'use client';

import { useEffect, useState } from 'react';
import { supabase, isConfigured } from '@/lib/supabase';

interface ProductionRealtimeProps {
  onDataUpdate: () => void;
}

export default function ProductionRealtime({ onDataUpdate }: ProductionRealtimeProps) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!supabase || !isConfigured) {
      console.warn('Supabase not configured for Realtime');
      return;
    }

    console.log('🔄 Initializing Realtime for production...');

    const channel = supabase
      .channel('posts_realtime_production')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts',
          filter: 'status=eq.published'
        },
        (payload) => {
          console.log('🔥 Production Realtime update:', payload.eventType);

          // Force page refresh or data update
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE' || payload.eventType === 'DELETE') {
            console.log('📝 Updating posts data...');
            onDataUpdate();

            // Optional: Show notification to user
            if (typeof window !== 'undefined' && window.location.pathname === '/ressources') {
              // Small visual indicator that content was updated
              const indicator = document.createElement('div');
              indicator.innerHTML = '✅ Contenu mis à jour';
              indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #059669;
                color: white;
                padding: 8px 16px;
                border-radius: 6px;
                z-index: 9999;
                font-size: 14px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              `;
              document.body.appendChild(indicator);

              setTimeout(() => {
                document.body.removeChild(indicator);
              }, 3000);
            }
          }
        }
      )
      .subscribe((status) => {
        console.log('📡 Production WebSocket status:', status);
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          console.log('✅ Production Realtime connected successfully');
        } else if (status === 'CHANNEL_ERROR') {
          setIsConnected(false);
          console.error('❌ Production Realtime connection failed');
        }
      });

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up Realtime connection');
      supabase.removeChannel(channel);
    };
  }, [onDataUpdate]);

  // Only show indicator in development
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-20 right-4 bg-green-100 border border-green-300 rounded p-2 text-xs z-50">
        📡 Production Realtime: {isConnected ? '✅ Connected' : '⏳ Connecting...'}
      </div>
    );
  }

  return null;
}