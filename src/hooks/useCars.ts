import { getCars } from '../api/cars.ts'
import type { ICar } from '../utils/types.ts'
import { useState, useEffect } from 'react'

function useCars() {
    const [cars, setCars] = useState<ICar[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        let isMounted = true;
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
    }, [])
    return { cars, loading, error }
}

export default useCars;