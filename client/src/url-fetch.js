const baseURL = import.meta.env.VITE_REACT_APP_BACKEND_URL || 'http://localhost:7071';
console.log(`baseURL = ${baseURL}`);

function buildQueryString(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

async function fetchInstance(url, { query = {}, body = null, headers = {}, method = 'GET' } = {}) {
    const queryString = buildQueryString(query);
    const fullUrl = `${baseURL}${url}${queryString ? `?${queryString}` : ''}`;

    console.log(`fetching ${fullUrl} with method ${method}`);
    console.log(`headers:`, headers);
    console.log(`body:`, body);

    const response = await fetch(fullUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: body ? JSON.stringify(body) : null
    });

    if (response.ok || (response.status >= 200 && response.status < 400)) {
        return await response.json();
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

export default fetchInstance;