var items = document.querySelectorAll(".item"),
    maxBorderPercent = 80,
    minBorderPercent = 50,
    borderNumArray = [];

function numberGenerator() {
    for (let i = 0; i < items.length; i++) {
        borderNumArray[i] = [];
        for (let j = 0; j < 8; j++) {
            borderNumArray[i][j] = Math.floor(
            Math.random() * (maxBorderPercent - minBorderPercent) + minBorderPercent
            );
        }
    }
}

numberGenerator();

function styleChange(num) {
    items[
        num
    ].style.borderRadius = ` ${borderNumArray[num][0]}% ${borderNumArray[num][1]}% ${borderNumArray[num][2]}% ${borderNumArray[num][3]}% / ${borderNumArray[num][4]}% ${borderNumArray[num][5]}% ${borderNumArray[num][6]}% ${borderNumArray[num][7]}% `;        
}

for (let i = 0; i < items.length; i++) {
    styleChange(i);
}

alert(Math.floor(Math.random()*10))
