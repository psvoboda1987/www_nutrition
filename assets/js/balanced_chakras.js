$.fn.maphilight.defaults = {
    fill: true,
    fillColor: '555555',
    fillOpacity: 0.2,
    stroke: true,
    strokeColor: 'ff7777',
    strokeOpacity: 1,
    strokeWidth: 1,
    fade: true,
    alwaysOn: true,
    neverOn: false,
    groupBy: false,
    wrapClass: true,
    shadow: false,
    shadowX: 0,
    shadowY: 0,
    shadowRadius: 6,
    shadowColor: '000000',
    shadowOpacity: 0.8,
    shadowPosition: 'outside',
    shadowFrom: false
}
$('.map').maphilight();

let data = {
    "1A": "prožívat lásku a sex společně, ne odděleně",
    "1B": "žít tady a teď, bez stížností a sebelítosti, hledět si sebe",
    "2A": "přijmout sám sebe, vyladit poměr mezi aktivitou a pocity",
    "2B": "otevřít se čisté spolupráci, brát lidi bez kritiky",
    "3A": "správná míra sebedůvěry, neřešit názory druhých pokud dělám vše správně",
    "3B": "prosadit se ale nemanipulovat druhé",
    "4A": "řešit duchovní význam událostí",
    "4B": "spolupracovat s lidmi férově",
    "5A": "být upřímný sám k sobě, přijmout své chyby",
    "5B": "slušně, klidně a pravdivě komunikovat s druhými",
    "6A": "vnímat duchovní náznaky, najít svojí chybu a napravit ji",
    "6B": "najít uplatnění duchovní inspirace",
    "7A": "vyladit životní styl a stravu",
    "7B": "pokora, skromnost"
}
let textEl = document.getElementById('text')
let areas = document.querySelectorAll('.area')
for (const area of areas) {
    ['mouseover', 'click'].forEach(event => {
        area.addEventListener(event, (e) => {
            textEl.innerHTML = `<h3>${area.title}</h3>
                    <p>${data[area.title]}</p>`
        })
    })
}