import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { supabase } from "../../lib/supabase";

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!supabase) {
      setAllowed(false);
      setLoading(false);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAllowed(Boolean(data.session));
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setAllowed(Boolean(session));
      setLoading(false);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="min-h-[40vh] grid place-items-center text-muted-foreground">관리자 인증 확인 중...</div>;
  }
  if (!allowed) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
}

