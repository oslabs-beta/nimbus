import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import moment from "moment";
import { FunctionProps, Data, RawData, chartJSData } from "../types";
import { convertToChartJSStructure } from "../types";

// Component to display a single function's metrics
const Function: React.FC<FunctionProps> = (props: FunctionProps) => {
  const [isClicked, setIsClicked] = useState(false)

  const [totalInvocations, setTotalInvocations] = useState(0)
  const [totalErrors, setTotalErrors] = useState(0)
  const [totalThrottles, setTotalThrottles] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  const [invocations, setInvocations] = useState<chartJSData>([])
  const [errors, setErrors] = useState<chartJSData>([])
  const [throttles, setThrottles] = useState<chartJSData>([])
  const [duration, setDuration] = useState<chartJSData>([])


  useEffect(() => {
    // If our metric array has at least one value, accumulate the values
    if (props.invocations.values.length > 0) setTotalInvocations(props.invocations.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.errors.values.length > 0) setTotalErrors(props.errors.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.throttles.values.length > 0) setTotalThrottles(props.throttles.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.duration.values.length > 0) setTotalDuration(Math.ceil(props.duration.values.reduce((acc: number, curr: number):number => acc + curr)/props.duration.values.length))
  }, [])

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