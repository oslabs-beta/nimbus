import React, { useEffect, useState } from 'react';
import Function from './Function'


const Functions = () => {
  const [funcMetrics, setFuncMetrics] = useState({})
  // Grab each functions metrics when the component mounts
  const grabFuncsMetrics = async() => {
    let response;
    response = await fetch('/dashboard/functions', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/JSON',
        authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
      },
    })
    response = await response.json()
    setFuncMetrics(response.metrics)
  }

  useEffect(() => {
    grabFuncsMetrics()    
  }, [])  

  // Update to generate 4 charts of each metric
  const generateChart = () => {
    console.log('Generating Chart ...')
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Lambda Function</th>
            <th>Invocations</th>
            <th>Errors</th>
            <th>Throttles</th>
            <th>Duration (ms)</th>
          </tr>
        </thead>
        <tbody>
          {/* Update the funcMetric parameter type */}
          {Object.entries(funcMetrics).map((funcMetric:any) => (
            <tr onClick={generateChart}>
              <Function funcName={funcMetric[0]}
                invocations={funcMetric[1].invocations}
                errors={funcMetric[1].errors}
                throttles={funcMetric[1].throttles}
                duration={funcMetric[1].duration}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default Functions;
