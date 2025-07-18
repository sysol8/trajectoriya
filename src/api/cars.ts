import type { ICar } from "../utils/types.ts";

const BASE_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles'

const parseJson = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    const data = await response.json()
    return data as T;
}

const getCars = async (): Promise<ICar[]> => {
    const response = await fetch(`${BASE_URL}`, {
        method: 'GET'
    })

    return parseJson<ICar[]>(response);
}

export { getCars }