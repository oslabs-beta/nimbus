import React, { useState, useEffect, useRef } from 'react';
import LineChart from './LineChart'

type RawData = {
  y: number,
  x: string,
}; 

type d3Data = Array<RawData>;

const Home = () => {
  const [invocationsData, setInvocations] = useState<d3Data>([]);
  const [errorsData, setErrors] = useState<d3Data>([]);
  const [throttlesData, setThrottles] = useState<d3Data>([]);
  const [durationData, setDurations] = useState<d3Data>([]);

  const route = '/dashboard/allMetrics'

  // Sends a GET request to the '/dashboard/allMetrics' route
  // Uses ReactHooks in order to change the states based on data received from AWS
  const getMetrics = async () => {
    let res;
    try {
      res = await fetch(route, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
      });
      res = await res.json();
      setInvocations(convertToD3Structure({
        values: res.metrics.invocations.values, 
        timestamp: res.metrics.invocations.timestamp
    }));
      setErrors(convertToD3Structure({
        values: res.metrics.errors.values, 
        timestamp: res.metrics.errors.timestamp
    }));
      setThrottles(convertToD3Structure({
        values: res.metrics.throttles.values, 
        timestamp: res.metrics.throttles.timestamp
    }));
      setDurations(convertToD3Structure({
        values: res.metrics.duration.values, 
        timestamp: res.metrics.duration.timestamp
    }));
    
    } catch(error) {
      console.log(error);
    }
  }

  // The data retrieved from the back end is converted to an array of objects to be compatible with D3
  const convertToD3Structure = (rawData: any) => {
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
  
  // Invokes the getMetrics function
  useEffect(() => {
    getMetrics();
  }, []);

  
  return (
  <div> Home
    <LineChart rawData={invocationsData} label='Invocations'/>
    <LineChart rawData={errorsData} label='Errors'/>
    <LineChart rawData={throttlesData} label='Throttles'/>
    <LineChart rawData={durationData} label='Duration'/>
  </div>
  );
};

export default Home;


   