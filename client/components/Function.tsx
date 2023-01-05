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
    if (props.invocations.values[0]) setTotalInvocations(props.invocations.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.errors.values[0]) setTotalErrors(props.errors.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.throttles.values[0]) setTotalThrottles(props.throttles.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.duration.values[0]) setTotalDuration(Math.ceil(props.duration.values.reduce((acc: number, curr: number):number => acc + curr)))
  })

  const convertToChartJSStructure = (rawData: any) => {
    const output = [];
    for (let key in rawData.values) {
      const subElement: RawData = {
        y: rawData.values[key],
        x: new Date(rawData.timestamp[key]).toLocaleString([], {year: "numeric", month: "numeric", day: "numeric", hour: '2-digit', minute:'2-digit'}),
      };
      output.push(subElement);
    }
    return output;
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
      <tr className="hover:brightness-90" onClick={generateChart}>
        <td className="bg-neutral text-center">{props.funcName}</td>
        <td className="bg-neutral text-center">{totalInvocations}</td>
        <td className="bg-neutral text-center">{totalErrors}</td>
        <td className="bg-neutral text-center">{totalThrottles}</td>
        <td className="bg-neutral text-center">{totalDuration}</td>
      </tr>
      {isClicked && 
        <tr>
          <td className="bg-neutral"></td>
          <td className="bg-neutral">
            <LineChart rawData={invocations} label='Invocations'/>
          </td>
          <td className="bg-neutral">
            <LineChart rawData={errors} label='Errors'/>
          </td>
          <td className="bg-neutral">
            <LineChart rawData={throttles} label='Throttles'/>
          </td>
          <td className="bg-neutral">
            <LineChart rawData={duration} label='Duration'/>
          </td>
        </tr>}
    </>
  )
}

export default Function