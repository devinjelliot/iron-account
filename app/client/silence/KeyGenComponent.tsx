"use client"

import { useState } from 'react';

export default function KeyGenComponent() {
    const [keyshares, setKeyshares] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateKeys = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/silence/keyGen');
            const data = await response.json();
            setKeyshares(data.keyshares);
        } catch (error) {
            console.error('Error generating keyshares:', error);
        }
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-1 bg-gray-500">
            <button
                className='bg-pink-500 p-2 justify-self-center self-center rounded-md'
                onClick={generateKeys} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Keyshares'}
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
