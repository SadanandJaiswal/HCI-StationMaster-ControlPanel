const upperLoopLineLeds = [
    { id: "ledSection1", bgColor: "red", width: "15%", leds: [0, 0] },
    { id: "ledSection2", bgColor: "green", width: "30%", leds: [0, 0, 0, 0] },
    { id: "ledSection3", bgColor: "blue", width: "30%", leds: [0, 0, 0, 0] },
    { id: "ledSection5", bgColor: "yellow", width: "25%", leds: [{id:1, bg: "red"},0, 0] },
]

const downLoopLineLeds = [
    { id: "ledSection1", bgColor: "blue", width: "25%", leds: [0, 0, {id: 17, bg: "red"}] },
    { id: "ledSection2", bgColor: "green", width: "25%", leds: [0, 0, 0] },
    { id: "ledSection3", bgColor: "yellow", width: "25%", leds: [0, 0, {id: 18, bg: "red"}] },
    { id: "ledSection5", bgColor: "red", width: "25%", leds: [0, 0, 0] },
]

const upperMainLineLeds = [
    { id: "ledSection1", bgColor: "yellow", width: "6%", leds: [0, 0] },
    { id: "ledSection2", bgColor: "blue", width: "6%", leds: [0, 0] },
    { id: "ledSection3", bgColor: "red", width: "4%", leds: [0] },
    { id: "ledSection4", bgColor: "green", width: "10%", leds: [{id:2, bg: "red"}, 0, 0, 0] },
    { id: "ledSection5", bgColor: "yellow", width: "6%", leds: [0, 0] },
    { id: "ledSection6", bgColor: "red", width: "6%", leds: [0, 0] },
    { id: "ledSection7", bgColor: "blue", width: "10%", leds: [0, 0, 0, 0] },
    { id: "ledSection8", bgColor: "yellow", width: "10%", leds: [0, 0, 0, {id:3, bg: "white"}, 0] },
    { id: "ledSection9", bgColor: "red", width: "10%", leds: [0, 0, {id:4, bg: "red"},0] },
    { id: "ledSection10", bgColor: "green", width: "6%", leds: [0, 0] },
    { id: "ledSection11", bgColor: "blue", width: "8%", leds: [0,0,0] },
    { id: "ledSection12", bgColor: "green", width: "8%", leds: [{id:5, bg: "skyblue"}, 0, {id:6, bg: "white"}, 0] },
    { id: "ledSection13", bgColor: "yellow", width: "8%", leds: [ {id: 7, bg: "red"} ,0, {id: 8, bg: "white"}, 0] },
];

const downMainLineLeds = [
    { id: "ledSection1", bgColor: "green", width: "8%", leds: [0, 0, 0] },
    { id: "ledSection2", bgColor: "yellow", width: "6%", leds: [0, 0] },
    { id: "ledSection3", bgColor: "blue", width: "8%", leds: [0, {id: 9, bg: "white"}, 0, {id: 10, bg:"red"} ] },
    { id: "ledSection4", bgColor: "red", width: "8%", leds: [0, {id:11, bg:"white"}, 0, {id:12, bg:"skyblue"}] },
    { id: "ledSection5", bgColor: "green", width: "6%", leds: [0, 0] },
    { id: "ledSection6", bgColor: "yellow", width: "12%", leds: [0, 0, 0, 0, {id:13, bg: "red"}] },
    { id: "ledSection7", bgColor: "red", width: "8%", leds: [0, 0, {id:14, bg:"white"}] },
    { id: "ledSection8", bgColor: "blue", width: "10%", leds: [0, 0, 0, {id: 15, bg:"skyblue"}] },
    { id: "ledSection9", bgColor: "yellow", width: "6%", leds: [0, 0] },
    { id: "ledSection10", bgColor: "red", width: "8%", leds: [0, 0, 0] },
    { id: "ledSection11", bgColor: "blue", width: "14%", leds: [0, 0, {id: 16, bg: "red"}, 0, 0] },
    { id: "ledSection12", bgColor: "green", width: "4%", leds: [0] },
]

export {upperMainLineLeds, downMainLineLeds, upperLoopLineLeds, downLoopLineLeds};
