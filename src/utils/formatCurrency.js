function formatCurrentcyIDR(money) {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR' }
    ).format(money);
}

function formatCurrency(money) {
    return new Intl.NumberFormat().format(money);
}

export {
    formatCurrentcyIDR,
    formatCurrency,
};