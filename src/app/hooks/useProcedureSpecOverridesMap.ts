import { useCallback, useEffect, useState } from "react";
import type { ProcedureDetailSpecs } from "../../data/proceduresExcelCatalog";
import { fetchProcedureSpecsOverridesPublic } from "../lib/cmsApi";
import { isSupabaseConfigured } from "../lib/supabase";

export function useProcedureSpecOverridesMap() {
  const [map, setMap] = useState<Record<string, Partial<ProcedureDetailSpecs>>>({});
  const [loaded, setLoaded] = useState(false);

  const reload = useCallback(async () => {
    setLoaded(false);
    if (!isSupabaseConfigured) {
      setMap({});
      setLoaded(true);
      return;
    }
    try {
      setMap(await fetchProcedureSpecsOverridesPublic());
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
