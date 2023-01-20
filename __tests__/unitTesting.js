const { convertToChartJSStructure } = require('../client/types.js');

// The frontend is receiving data in this format:
const input = {
    values: [ 15, 4 ],
    timestamp: [ '2023-01-10T02:55:00.000Z', '2023-01-09T02:55:00.000Z' ]
};

/* In order for ChartJS to graph out data, it has to be an array of objects 
 with x and y coordinates in date chronological order
 const output = [
     {y: 4, x: '1/9/23'},
     {y: 15, x: '1/10/23'},
*/

describe("Data formatting to be ChartJS compatible", () => {
    it("should return the same array size", () => {
        expect(convertToChartJSStructure(input).length).toEqual(2);
    });
    it("should map the cooresponding values to their timestamps", () => {
        expect(convertToChartJSStructure(input)[0]['y']).toEqual(4);
        expect(convertToChartJSStructure(input)[0]['x']).toEqual('1/9/23');
    });
});