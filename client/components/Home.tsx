import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Axis, Orient } from 'd3-axis-for-react';

interface subMetrics {
    values: number[] | undefined
    timestamp: Date[] | undefined
  }

const emptyData: subMetrics = {
    values: undefined,
    timestamp: undefined,
}

type RawData = {
  values: number,
  timestamp: Date,
}; 

type d3Data = Array<RawData>;

const Home = () => {
   // Declare dimensions for the graphs
   const width = 600;
   const height = 400;
   const margin = { top: 20, right: 30, bottom: 30, left: 40 };



  const [invocationsData, setInvocations] = useState({});
  const [errorsData, setErrors] = useState({});
  const [throttlesData, setThrottles] = useState({});
  const [durationData, setDurations] = useState({});

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

  const convertToD3Structure = (rawData: any) => {
    const output = [];
    for (let key of rawData.values) {
      const subElement: subMetrics = {
        values: rawData.values[key],
        timestamp: rawData.timestamp[key],
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
  <div>Home

  </div>
  );
};

export default Home;


   