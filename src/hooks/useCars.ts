import type { ICar } from "../utils/types.ts";
import { getCars } from "../api/cars.ts";
import { useState, useEffect } from "react";

function useCars(): { cars: ICar[]; loading: boolean; error: unknown } {
  const [cars, setCars] = useState<ICar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted: boolean = true;
    setError(null);

    (async () => {
      try {
        const data: ICar[] = await getCars();
        if (!isMounted) return;
        setCars(data);
      } catch (error) {
        isMounted && setError(error);
      } finally {
        isMounted && setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);
  return { cars, loading, error };
}

export default useCars;
