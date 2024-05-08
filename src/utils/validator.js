export function emailValidator(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}


export function codeValidator(code) {
    code = code.toUpperCase();
    const regex = /^[A-Z0-9]+$/;
    return regex.test(code) && !/\s/.test(code);
}