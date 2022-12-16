function fixNanNumber(value) {
    return isNaN(value) ? 0 : value;
}

export {
    fixNanNumber,
}