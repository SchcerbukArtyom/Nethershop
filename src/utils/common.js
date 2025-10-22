export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export const buildUrl = (url, params) => {
    let urlWithParams = url;

    Object.entries(params).forEach(([key, value], i) => {
        const sign = !i ? '?' : '&';
        urlWithParams += `${sign}${key}=${value}`
    })

    return urlWithParams;
}

export const sumBy = (arr, key) => {
    if (!Array.isArray(arr)) return 0;
    if (typeof key === 'string') {
        return arr.reduce((prev, cur) => {
            const value = cur[key];
            return prev + (typeof value === 'number' ? value : 0);
        }, 0);
    } else {
        return arr.reduce((prev, cur) => prev + (typeof cur === 'number' ? cur : 0), 0);
    }
};