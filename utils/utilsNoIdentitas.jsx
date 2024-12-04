export const formatNoIdentitas = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    return cleanedValue.substring(0, 16);
};
