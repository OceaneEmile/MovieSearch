import { useEffect, useState } from 'react';

export const useQueryState = (querykey, initialValue) => {
    const [queryState, setQueryState] = useState(initialValue);

    useEffect(() => {
        const newURL = new URL(window.location);
        const params = newURL.searchParams;

        if (params.get(querykey)) {
            setQueryState(params.get(querykey));
        }
    }, [querykey]);

    useEffect(() => {
        const newURL = new URL(window.location);
        const params = newURL.searchParams;

        if (!queryState) {
            params.delete(querykey);
        } else {
            params.set(querykey, queryState);
        }

        console.log(newURL.toString());

        window.history.replaceState(null, "", newURL.toString());
    }, [querykey, queryState]);

    return [queryState, setQueryState];
};
