import React, { useEffect, useState } from "react";

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

const Function = (props: FunctionProps) => {
  
  const [totalInvocations, setTotalInvocations] = useState(0)
  const [totalErrors, setTotalErrors] = useState(0)
  const [totalThrottles, setTotalThrottles] = useState(0)
  const [totalDuration, setTotalDuration] = useState(0)

  useEffect(() => {
    // If our metric array has at least one value, accumulate the values
    if (props.invocations.values[0]) setTotalInvocations(props.invocations.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.errors.values[0]) setTotalErrors(props.errors.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.throttles.values[0]) setTotalThrottles(props.throttles.values.reduce((acc: number, curr: number):number => acc + curr))
    if (props.duration.values[0]) setTotalDuration(Math.ceil(props.duration.values.reduce((acc: number, curr: number):number => acc + curr)))
  })
  
  return (
    <>
      <td>{props.funcName}</td>
      <td>{totalInvocations}</td>
      <td>{totalErrors}</td>
      <td>{totalThrottles}</td>
      <td>{totalDuration}</td>
    </>
  )
}

export default Function