"use client"

import { useState } from 'react';

export default function KeyGenComponent() {
    const [keyshares, setKeyshares] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateKeys = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/keyGenAccount');
            const data = await response.json();
            setKeyshares(data.keyshares);
        } catch (error) {
            console.error('Error generating keyshares:', error);
        }
        setLoading(false);
    };

    return (
        <div>
            <button onClick={generateKeys} disabled={loading}>
                {loading ? 'Generating...' : 'Silence Keygen'}
            </button>
            {keyshares && (
                <div>
                    <h3>Keyshares:</h3>
                    <pre>{JSON.stringify(keyshares, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
