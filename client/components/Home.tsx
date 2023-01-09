import React, { useState, useEffect, useRef } from 'react';
import LineChart from './LineChart'
import DonutChart from './DonutChart'
import { RawData, chartJSData, costProps, HomeProps } from "../types";
import { convertToChartJSStructure } from "../types";

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  const [invocationsData, setInvocations] = useState<chartJSData>([]);
  const [errorsData, setErrors] = useState<chartJSData>([]);
  const [throttlesData, setThrottles] = useState<chartJSData>([]);
  const [durationData, setDurations] = useState<chartJSData>([]);
  const [cost, setCost] = useState(0)
  const [totalInvocations, setTotalInvocations] = useState(0);
  const [totalErrors, setTotalErrors] = useState(0);
  const [totalThrottles, setTotalThrottles] = useState(0);
  const [averageDuration, setAverageDuration] = useState(0);
  const [invocationsByFunc, setInvocationsByFunc] = useState({})

  const route = {
    allMetrics: '/dashboard/allMetrics',
    funcMetrics: '/dashboard/funcmetrics'
  }

  // Sends a GET request to the '/dashboard/allMetrics' route
  // Uses ReactHooks to change the states based on data received from AWS
  const getMetrics = async () => {
    let res;
    try {
      res = await fetch(route.allMetrics, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
      });
      res = await res.json();
      // Convert the data to a format that Chart JS can use and set the states to the new data
      setInvocations(convertToChartJSStructure({
        values: res.allFuncMetrics.invocations.values, 
        timestamp: res.allFuncMetrics.invocations.timestamp
      }));
      setErrors(convertToChartJSStructure({
        values: res.allFuncMetrics.errors.values, 
        timestamp: res.allFuncMetrics.errors.timestamp
      }));
      setThrottles(convertToChartJSStructure({
        values: res.allFuncMetrics.throttles.values, 
        timestamp: res.allFuncMetrics.throttles.timestamp
      }));
      setDurations(convertToChartJSStructure({
        values: res.allFuncMetrics.duration.values, 
        timestamp: res.allFuncMetrics.duration.timestamp
      }));
      setCost(calculateCost(res.cost));
      if (res.allFuncMetrics.invocations.values.length > 0) {
        setTotalInvocations(res.allFuncMetrics.invocations.values.reduce((a:number, b:number) => a + b, 0));
      }
      if (res.allFuncMetrics.errors.values.length > 0) {
        setTotalErrors(res.allFuncMetrics.errors.values.reduce((a:number, b:number) => a + b, 0));
      }
      if (res.allFuncMetrics.throttles.values.length > 0) {
        setTotalThrottles(res.allFuncMetrics.throttles.values.reduce((a:number, b:number) => a + b, 0));
      }
      if (res.allFuncMetrics.duration.values.length > 0) {
        setAverageDuration(res.allFuncMetrics.duration.values.reduce((a:number, b:number) => a + b, 0) / res.allFuncMetrics.duration.values.length);
      }
      
    } catch(error) {
      console.log(error);
    }
  }
  
  const getFuncMetrics = async () => {
    let res;
    try {
      res = await fetch(route.funcMetrics, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        },
      });
      res = await res.json();
      const labelArr = [];
      const invocationArr = [];
      for (const func in res.eachFuncMetrics) {
        labelArr.push(func);
        const invocations = res.eachFuncMetrics[func].invocations.values;
        if (invocations.length > 0) {
          invocationArr.push(invocations.reduce((a: number, b: number) => a + b, 0));
        } else {
          invocationArr.push(0);
        }
      }
      setInvocationsByFunc({labels: labelArr, data: invocationArr})
    } catch (error) {
      console.log(error);
    }
}
  
  // Calculates the running cost of all functions
  const calculateCost = (costObj: costProps) => {
    let totalCost = 0;
    for (let i = 0; i < costObj.memory.length; i++) {
      totalCost += costObj.memory[i] * 0.0009765625 * costObj.duration[i] * 0.001
    }
    return Math.round(totalCost * 100) / 100
  }

  // Invokes the getMetrics function
  useEffect(() => {
    getMetrics();
    getFuncMetrics();
  }, []);
  
  return (
  <>
    <div className="w-full px-14 pb-8">
      <div className="card shadow-xl w-full bg-gradient-to-r from-primary via-secondary to-accent text-base-300">
        <div className="card-body">
          <p className="text-3xl">Welcome to Your Dashboard, {props.firstName}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col lg:flex-row w-full mb-8 px-14 h-fit">
      <div className='grid grid-cols-2 gap-2 w-full lg:w-2/5 mr-8 h-72 mb-9 lg:mb-0'>
          <div className="card bg-secondary shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Total Invocations</p>
              <div className='w-full text-center text-3xl text-base-300 mb-2'>{totalInvocations.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            </div>
          </div>
          <div className="card bg-neutral shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Total Errors</p>
              <div className='w-full text-center text-3xl text-base-300 mb-2'>{totalErrors.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            </div>
          </div>
          <div className="card bg-neutral shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Total Throttles</p>
              <div className='w-full text-center text-3xl text-base-300 mb-2'>{totalThrottles.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            </div>
          </div>
          <div className="card bg-neutral shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Average Duration</p>
              <div className='w-full text-center text-3xl text-base-300 mb-2'>{averageDuration.toLocaleString(undefined, {maximumFractionDigits:2})}<span className='text-sm'>ms</span></div>
            </div>
          </div>
          <div className="col-span-2 card bg-accent shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Cost</p>
              <div className='w-full text-center text-3xl text-base-300 mb-2 pb-2'>${cost.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            </div>
          </div>
      </div>
      <div className="w-full lg:w-3/5">
        <div className="card w-full bg-neutral shadow-xl">
          <div className="card-body h-72 flex flex-col justify-center">
            <p className='text-sm'>Invocations by Functions</p>
            <DonutChart rawData={invocationsByFunc} />
          </div>
        </div>
      </div>
    </div>
    
    <div className='grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 w-full gap-8 px-14'>
      <div className="card w-full bg-neutral shadow-xl">
        <div className="card-body">
          <LineChart rawData={invocationsData} label='Invocations'/>
        </div>
      </div>
      <div className="card w-full bg-neutral shadow-xl">
        <div className="card-body">
          <LineChart rawData={errorsData} label='Errors'/>
        </div>
      </div>
      <div className="card w-full bg-neutral shadow-xl">
        <div className="card-body">
          <LineChart rawData={throttlesData} label='Throttles'/>
        </div>
      </div>
      <div className="card w-full bg-neutral shadow-xl">
        <div className="card-body">
          <LineChart rawData={durationData} label='Duration'/>
        </div>
      </div>
    </div>
  </>
  );
};

export default Home;



   