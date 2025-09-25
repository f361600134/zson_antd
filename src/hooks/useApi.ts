import {useState, useEffect} from 'react';

interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useApi<T>(apiCall: () => Promise<T>, dependencies: never[] = []) {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: true,
        error: null,
    });
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                setState(prev => ({...prev, loading: true, error: null}));
                const result = await apiCall();
                if (isMounted) {
                    setState({data: result, loading: false, error: null,});
                }
            } catch (error) {
                if (isMounted) {
                    setState({data: null, loading: false, error: error instanceof Error ? error.message : '请求失败',});
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    }, dependencies);
    return state;
}

export function useAsyncAction<T>() {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const execute = async (apiCall: () => Promise<T>) => {
        try {
            setState({data: null, loading: true, error: null});
            const result = await apiCall();
            setState({data: result, loading: false, error: null});
            return result;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : '操作失败';
            setState({data: null, loading: false, error: errorMessage});
            throw error;
        }
    };

    return {...state, execute};
}