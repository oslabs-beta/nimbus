import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApiMetrics from './ApiMetrics';
import ApiRelations from './ApiRelations';
import { View } from "../types";

const Apis = () => {
  const [apiRelations, setApiRelations] = useState(null);
  const [apiMetrics, setApiMetrics] = useState(null);
  const [selectedApi, setSelectedApi] = useState<string>('');
  const [showInfo, setShowInfo] = useState<View>('metrics');

  // Switch between metrics and relations
  const toggleDisplay = useCallback((e:any) => {
    if (e.target.value !== showInfo) {
      setShowInfo(e.target.value);
    }
  }, [showInfo]);
 
  // Change the selected api
  const handleSelectedApi = useCallback((e:any) => {
    setSelectedApi(() => e.target.value)
  }, [selectedApi]);

  // Fetch Api relations data and set apiRelation state 
  const getApiRelations = async (signal:AbortSignal) => {
    let res;
    try {
      res = await fetch('/dashboard/apiRelations', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        },
        signal
      });
      res = await res.json();
      const apiRel = res.apiRelations || undefined;
      setApiRelations(apiRel);
    }
    catch(err){
      console.log("Error occurred grabbing API Relations: ", err);
    }
  }

  // Get api metrics and setApiMetrics
  // setSelectedApi to the first api in the metrics object
  const getApiMetrics = async (signal:AbortSignal) => {
    let res;
    try {
      res = await fetch('/dashboard/apiMetrics', {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        },
        signal
      });
      res = await res.json();
      let metrics:any;
      if (res.allApiMetrics) {
        metrics = res.allApiMetrics;
        setSelectedApi(Object.keys(metrics)[0])
      } 
      setApiMetrics(metrics);
    }
    catch(err){
      console.log("Error occurred grabbing API Metrics: ", err);
    }
  }

  // Invoke getApiRelations if apiRelations if falsy
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!apiRelations) {
      getApiRelations(signal);
    }
    
    return () => {
      controller.abort();
    }
  }, []);

  // Invoke getApiMetrics if apiMetrics if falsy
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    
    if (!apiMetrics) {
      getApiMetrics(signal);
    }
    return () => {
      controller.abort();
    }
  }, []);

  // Get API names and create and array of button elements
  const getApiNames = () => {
    return Object.keys(apiMetrics as any).map((el:string) => {
      return (
        <li key={uuidv4()}>
          <button
            value={el}
            className={selectedApi === el ? 'active' : ''}
            onClick={handleSelectedApi}
          >
            {el}
          </button>
        </li>
      )
    })
  };

  return (
    <div className='w-full'>
      <div className='flex flex-row'>
        <ul className='menu mt-4 lg:mt-0 bg-base-100 w-3/12 p-6 rounded-box'>
          <li key={'menu-title'} className='menu-title'>
            <span className='text-lg'>API list</span>
          </li>
          {apiMetrics ? getApiNames() : ''}
        </ul>
        <div className='flex flex-col w-9/12 justify-center gap-y-6'> 
          <div className='flex flex-row w-full justify-center gap-x-4'>
            <button 
              className={`btn ${showInfo === 'metrics' ? 'btn-active' : ''} btn-ghost`} 
              value={'metrics'} 
              onClick={toggleDisplay}
            >Metrics</button>
            <button 
              className={`btn ${showInfo === 'metrics' ? '' : 'btn-active'} btn-ghost`} 
              value={'relations'} 
              onClick={toggleDisplay}
            >Relations</button>
          </div>
          <div className='flex justify-center'>
            {showInfo === 'metrics' ? <ApiMetrics selectedApi={selectedApi} apiMetrics={apiMetrics}/> 
            : <ApiRelations selectedApi={selectedApi} apiRelations={apiRelations}/>}
          </div>
        </div>
        
      </div>
    </div>

  );
};

export default Apis;
