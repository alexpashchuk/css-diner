export const normalizeHtml = (string: string): string => {
    const elements = string.split('\n').map((el) => {
        if (el.includes('/>')) {
            const newEl = el.trim();
            const indexStart = newEl.indexOf('<') + 1;
            const indexEnd = newEl.replace('/>', ' />').indexOf(' ');
            const tag = newEl.slice(indexStart, indexEnd);
            return `${newEl.replace('/>', '>')}</${tag}>`;
        }
        return el;
    });
    return elements.join('');
};
