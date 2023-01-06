import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";

type FunctionProps = {
  funcName: string
  invocations: Data
  errors: Data
  throttles: Data
  duration: Data
}

type Data = {
  values: Array<number>,
  timestamp: Array<number>
}

type RawData = {
  y: number,
  x: string,
}; 

type d3Data = Array<RawData>;

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

  const convertToChartJSStructure = (rawData: Data) => {
    const output = [];
    for (let key in rawData.values) {
      const subElement: RawData = {
        y: rawData.values[key],
        x: new Date(rawData.timestamp[key]).toLocaleString([], {year: "2-digit", month: "numeric", day: "numeric"}),
      };
      output.push(subElement);
    }
    return output.reverse();
  };

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