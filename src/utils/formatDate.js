function formatDateNow() {
    const today = Date.now();
    return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: '2-digit' }).format(today);
}
export {
    formatDateNow,
};