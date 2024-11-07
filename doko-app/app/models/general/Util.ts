export function formatString(input: string): string {
    return input
        .toLowerCase()                             // Convert the entire string to lowercase
        .split('_')                                // Split the string at underscores
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' ');                                // Join the words with spaces
}