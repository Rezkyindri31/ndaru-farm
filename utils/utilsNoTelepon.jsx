export const formatNoTelepon = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    if (cleanedValue.length === 0) {
        return "";
    } else if (cleanedValue.length === 1 && cleanedValue[0] !== "0") {
        return "";
    }
    if (!cleanedValue.startsWith("0")) {
        return "";
    }
    return cleanedValue.substring(0, 16);
};
