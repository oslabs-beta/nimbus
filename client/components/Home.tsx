import React, { useState, useEffect, useRef } from 'react';
import LineChart from './LineChart'
import DonutChart from './DonutChart'

type RawData = {
  y: number,
  x: string,
}; 

type costProps = {
  memory: number[],
  invocations: number[],
  duration: number[]
}

type d3Data = Array<RawData>;

type HomeProps = {
  firstName: string;
}

const Home = (props: HomeProps) => {
  const [invocationsData, setInvocations] = useState<d3Data>([]);
  const [errorsData, setErrors] = useState<d3Data>([]);
  const [throttlesData, setThrottles] = useState<d3Data>([]);
  const [durationData, setDurations] = useState<d3Data>([]);
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
  // Uses ReactHooks in order to change the states based on data received from AWS
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
      setInvocations(convertToD3Structure({
        values: res.allFuncMetrics.invocations.values, 
        timestamp: res.allFuncMetrics.invocations.timestamp
      }));
      setErrors(convertToD3Structure({
        values: res.allFuncMetrics.errors.values, 
        timestamp: res.allFuncMetrics.errors.timestamp
      }));
      setThrottles(convertToD3Structure({
        values: res.allFuncMetrics.throttles.values, 
        timestamp: res.allFuncMetrics.throttles.timestamp
      }));
      setDurations(convertToD3Structure({
        values: res.allFuncMetrics.duration.values, 
        timestamp: res.allFuncMetrics.duration.timestamp
      }));
      setCost(calculateCost(res.cost));
      setTotalInvocations(res.allFuncMetrics.invocations.values.reduce((a:number, b:number) => a + b, 0));
      setTotalErrors(res.allFuncMetrics.errors.values.reduce((a:number, b:number) => a + b, 0));
      setTotalThrottles(res.allFuncMetrics.throttles.values.reduce((a:number, b:number) => a + b, 0));
      setAverageDuration(res.allFuncMetrics.duration.values.reduce((a:number, b:number) => a + b, 0) / res.allFuncMetrics.duration.values.length);
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
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
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
      <div className="card shadow-2xl w-full bg-gradient-to-r from-primary via-secondary to-accent">
        <div className="card-body">
          <p className="text-3xl">Welcome to Your Dashboard, {props.firstName}</p>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col lg:flex-row w-full mb-8 px-14 h-fit">
      <div className='grid grid-cols-2 gap-2 w-full lg:w-2/5 mr-8 lg:h-72 pb-8 lg:p-0'>
          <div className="card bg-secondary shadow-2xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Total Invocations</p>
              <div className='w-full text-center text-3xl text-base-100 mb-2'>{totalInvocations.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            </div>
          </div>
          <div className="card bg-secondary shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Total Errors</p>
              <div className='w-full text-center text-3xl text-base-100 mb-2'>{totalErrors.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            </div>
          </div>
          <div className="card bg-secondary shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Total Throttles</p>
              <div className='w-full text-center text-3xl text-base-100 mb-2'>{totalThrottles.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            </div>
          </div>
          <div className="card bg-secondary shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Average Duration</p>
              <div className='w-full text-center text-3xl text-base-100 mb-2'>{averageDuration.toLocaleString(undefined, {maximumFractionDigits:2})}<span className='text-sm'>ms</span></div>
            </div>
          </div>
          <div className="col-span-2 card bg-accent shadow-xl">
            <div className="card-body p-2">
              <p className='text-sm ml-1'>Cost</p>
              <div className='w-full text-center text-3xl text-base-100 mb-2'>${cost.toLocaleString(undefined, {maximumFractionDigits:2})}</div>
            </div>
          </div>
      </div>
      <div className="w-full lg:w-3/5">
        <div className="card w-full bg-gray-800 shadow-xl">
          <div className="card-body lg:h-72 flex flex-col justify-center">
            <p className='text-sm'>Invocations by Functions</p>
            <DonutChart rawData={invocationsByFunc} />
          </div>
        </div>
      </div>
    </div>
    
    <div className='grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:grid-rows-2 w-full gap-8 px-14'>
      <div className="card w-full bg-gray-800 shadow-xl">
        <div className="card-body">
          <LineChart rawData={invocationsData} label='Invocations'/>
        </div>
      </div>
      <div className="card w-full bg-gray-800 shadow-xl">
        <div className="card-body">
          <LineChart rawData={errorsData} label='Errors'/>
        </div>
      </div>
      <div className="card w-full bg-gray-800 shadow-xl">
        <div className="card-body">
          <LineChart rawData={throttlesData} label='Throttles'/>
        </div>
      </div>
      <div className="card w-full bg-gray-800 shadow-xl">
        <div className="card-body">
          <LineChart rawData={durationData} label='Duration'/>
        </div>
      </div>
    </div>
  </>
  
  );
};

export default Home;



   