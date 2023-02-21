"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToChartJSStructure = void 0;
;
;
;
;
;
;
;
;
// Function is used in Home&Function components
// Converted RawData into a structure that is compatible with ChartJS
const convertToChartJSStructure = (rawData) => {
    const output = [];
    for (let i = rawData.values.length - 1; i >= 0; i--) {
        const subElement = {
            y: rawData.values[i],
            x: new Date(rawData.timestamp[i]).toLocaleString([], { year: "2-digit", month: "numeric", day: "numeric" })
        };
        output.push(subElement);
        // Get the date of the current iteration
        let date = new Date(rawData.timestamp[i]);
        // If the next day is less than the next date in our iteration push a value of 0 and the next day into our object
        if ((date.getTime() + 1) < (new Date(rawData.timestamp[i - 1])).getTime()) {
            date.setDate(date.getDate() + 1);
            while (date.getTime() < (new Date(rawData.timestamp[i - 1])).getTime()) {
                const subElement = {
                    y: 0,
                    x: new Date(date).toLocaleString([], { year: "2-digit", month: "numeric", day: "numeric" })
                };
                output.push(subElement);
                date.setDate(date.getDate() + 1);
            }
        }
    }
    return output;
};
exports.convertToChartJSStructure = convertToChartJSStructure;
