import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApiMetrics from './ApiMetrics';
import ApiRelations from './ApiRelations';


const Apis = () => {
  const [apiRelations, setApiRelations] = useState(null);
  const [apiMetrics, setApiMetrics] = useState(null);
  const [selectedApi, setSelectedApi] = useState('');
  const [showInfo, setShowInfo] = useState('metrics');

  // Switch between metrics and relations
  const toggleDisplay = (e:any) => {
    if (e.target.value !== showInfo) {
      setShowInfo(e.target.value);
    }
  }
 
  // Change the selected api
  const handleSelectedApi = (e:any) => {
    setSelectedApi(() => e.target.value)
    console.log(selectedApi);
  }

  // Fetch Api relations data and set apiRelation state 
  const getApiRelations = async (signal:any) => {
    let res;
    try {
      res = await fetch('/dashboard/apiRelations', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
        signal
      });
      res = await res.json();
      const apiRel = res.apiRelations || ['unable to fetch api relations'];
      setApiRelations(apiRel);
    }
    catch(err){
      console.log("ERROR FROM GET API RELATIONS", err);
    }
  }

  // Get api metrics and setApiMetrics
  // setSelectedApi to the first api in the metrics object
  const getApiMetrics = async (signal:any) => {
    let res;
    try {
      res = await fetch('/dashboard/apiMetrics', {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
        signal
      });
      res = await res.json();
      let metrics:any;
      if (res.allApiMetrics) {
        metrics = res.allApiMetrics;
        setSelectedApi(Object.keys(metrics)[0])
      } 
      else {
        metrics = ['unable to fetch api metrics'];
      }
      setApiMetrics(metrics);
    }
    catch(err){
      console.log("ERROR FROM GET API METRICS", err);
    }
  }

  // Invoke getApiRelations if apiRelations if falsy
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (!apiRelations) {
      getApiRelations(signal);
      console.log("getApiRelations invoked")
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
    return Object.keys(apiMetrics as any).map((el:any) => {
      console.log("getApiNames", el)
      const currDivId = uuidv4();
      return (
        <button 
          key={currDivId}
          id={currDivId}
          value={el}
          style={{ fontWeight: selectedApi === el ? 'bold' : 'normal' }} 
          onClick={handleSelectedApi}
        >
          {el}
          </button>
      )
    })
  };

  return (
    <div>
      Apis
      <div style={{display:'flex'}}>
        <div style={{display:'flex', flexDirection:'column', flexGrow:'1'}}>
          {apiMetrics ? getApiNames() : 'fetching apis'}
        </div>
        <div style={{display:'flex', flexDirection:'column', gap: '1rem', flexGrow:'3'}}> 
          <div>
            <button value={'metrics'} onClick={toggleDisplay}>Metrics</button>
            <button value={'relations'} onClick={toggleDisplay}>Relations</button>
          </div>
          <div>
            {showInfo === 'metrics' ? <ApiMetrics selectedApi={selectedApi} apiMetrics={apiMetrics}/> 
            : <ApiRelations selectedApi={selectedApi} apiRelations={apiRelations}/>}
          </div>
        </div>
        
      </div>
    </div>

  );
};

export default Apis;
