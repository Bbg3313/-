import { useCallback, useEffect, useState } from "react";
import { fetchProcedureHeroImageOverrides } from "../lib/cmsApi";
import { isSupabaseConfigured } from "../lib/supabase";

export function useProcedureHeroImageOverrides() {
  const [map, setMap] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(async () => {
    setLoaded(false);
    if (!isSupabaseConfigured) {
      setMap({});
      setLoaded(true);
      return;
    }
    try {
      setMap(await fetchProcedureHeroImageOverrides());
    } catch {
      setMap({});
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { map, loaded, reload };
}
