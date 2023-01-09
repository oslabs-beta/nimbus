import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import moment from "moment";
import { FunctionProps, Data, RawData, d3Data } from "../types";


// Component to display a single function's metrics
const Function = (props: FunctionProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const [totalInvocations, setTotalInvocations] = useState(0)
  const [totalErrors, setTotalErrors] = useState(0)
  const [totalThrottles, setTotalThrottles] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  const [invocations, setInvocations] = useState<d3Data>([])
  const [errors, setErrors] = useState<d3Data>([])
  const [throttles, setThrottles] = useState<d3Data>([])
  const [duration, setDuration] = useState<d3Data>([])


  useEffect(() => {
    // If our metric array has at least one value, accumulate the values
    if (props.invocations.values.length > 0) setTotalInvocations(props.invocations.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.errors.values.length > 0) setTotalErrors(props.errors.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.throttles.values.length > 0) setTotalThrottles(props.throttles.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.duration.values.length > 0) setTotalDuration(Math.ceil(props.duration.values.reduce((acc: number, curr: number):number => acc + curr)/props.duration.values.length))
  }, [])

  // Create a function to convert our raw data into a format that ChartJS can use
  const convertToChartJSStructure = (rawData: Data) => {
    const output = [];
    
    for (let i = rawData.values.length - 1; i >= 0; i--) {
      const subElement: RawData = {
        y: rawData.values[i],
        x: new Date(rawData.timestamp[i]).toLocaleString([], {year: "2-digit", month: "numeric", day: "numeric"})
      }
      output.push(subElement);
      // Get the date of the current iteration
      let date = new Date(rawData.timestamp[i])
      // If the next day is less than the next date in our iteration push a value of 0 and the next day into our object
      if ((date.getTime() + 1) < (new Date (rawData.timestamp[i - 1])).getTime()) {
        date.setDate(date.getDate() + 1)
        while (date.getTime() < (new Date (rawData.timestamp[i - 1])).getTime()) {
          const subElement: RawData = {
            y: 0,
            x: new Date(date).toLocaleString([], {year: "2-digit", month: "numeric", day: "numeric"})
          }
          output.push(subElement);
          date.setDate(date.getDate() + 1)
        }
      }
    }
    return output;
  };

  // Generate the chart when the user clicks on the row
  const generateChart = () => {
    if (!isClicked) {
      setInvocations(convertToChartJSStructure(props.invocations))
      setErrors(convertToChartJSStructure(props.errors))
      setThrottles(convertToChartJSStructure(props.throttles))
      setDuration(convertToChartJSStructure(props.duration))  
      setIsClicked(true);
    } else {
      setIsClicked(false);
    }
  }
  
  return (
    <>
      <tr className="hover:brightness-90 w-[100%]"onClick={generateChart}>
        <td className="bg-neutral text-center w-[20%]">{props.funcName}</td>
        <td className="bg-neutral text-center w-[20%]">{totalInvocations}</td>
        <td className="bg-neutral text-center w-[20%]">{totalErrors}</td>
        <td className="bg-neutral text-center w-[20%]">{totalThrottles}</td>
        <td className="bg-neutral text-center w-[20%]">{totalDuration}</td>
      </tr>
      {isClicked && 
        <tr className="w-[100%]">
          <td className="bg-neutral w-[20%]"></td>
          <td className="bg-neutral w-[20%]">
            <LineChart rawData={invocations} label='Invocations'/>
          </td>
          <td className="bg-neutral w-[20%]">
            <LineChart rawData={errors} label='Errors'/>
          </td>
          <td className="bg-neutral w-[20%]">
            <LineChart rawData={throttles} label='Throttles'/>
          </td>
          <td className="bg-neutral w-[20%]">
            <LineChart rawData={duration} label='Duration'/>
          </td>
        </tr>}
    </>
  )
}

export default Function