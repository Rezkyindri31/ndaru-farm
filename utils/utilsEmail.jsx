export const formatEmail = (value) => {
    // Remove leading and trailing whitespace
    const trimmedValue = value.trim();

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the value matches the email pattern
    if (!emailRegex.test(trimmedValue)) {
        return ""; // Return an empty string if the format is invalid
    }

    return trimmedValue; // Return the formatted email if valid
};
