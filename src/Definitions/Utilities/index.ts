export function commaSeperatedPrice(num: any) {
    let x = num.split(",").join("");
    let afterPoint = "";
    if (x.indexOf(".") > 0) {
        const givenAfterPoint = x.substring(x.indexOf(".") + 1, x.length);
        if (parseInt(givenAfterPoint, 10) > 0)
            afterPoint = `.${givenAfterPoint}`;
    }
    x = Math.floor(x);
    x = x.toString();
    let lastThree = x.substring(x.length - 3);
    const otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== "") lastThree = `,${lastThree}`;
    const res =
        otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") +
        lastThree +
        afterPoint;
    return res;
}
