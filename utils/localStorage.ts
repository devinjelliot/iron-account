// Utility to store data in LocalStorage
export function storeData(key: any, data: any) {
    try {
        const jsonData = JSON.stringify(data);
        localStorage.setItem(key, jsonData);
    } catch (error) {
        console.error('Error storing data in LocalStorage', error);
    }
}

// Utility to retrieve data from LocalStorage
export function retrieveData(key: any) {
    try {
        const jsonData = localStorage.getItem(key);
        return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error('Error retrieving data from LocalStorage', error);
        return null;
    }
}

// Utility to retrieve and then remove data from LocalStorage
export function retrieveAndRemoveData(key: any) {
    try {
        const jsonData = localStorage.getItem(key);
        localStorage.removeItem(key); // Remove the data after retrieving it
        return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error('Error retrieving data from LocalStorage', error);
        return null;
    }
}
