
export function IsCorrectNumber(num: string) {
    if (num === "") return "";
    if (isNaN(+num)
        || +num < 1
        || +num > 20) {
        return "Liczba wariantow nie moze byc wieksza od 20 i mniejsza od 1"
    }
}