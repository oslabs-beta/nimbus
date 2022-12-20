import React, { useState, useEffect } from 'react';
// import { userContext } from 'react'

// Types
type Period = '30d' | '14d' | '7d' | '1d' | '1h';
type Filter = 'allLogs' | 'reports' | 'errors';
type Search = String;

const Logs = () => {
  // use context from userContext
  // States: functions, logs, FILTERS: period (string)
  const [functions, setFunctions] = useState([]);
  const [selectedFunc, setSelectedFunc] = useState('');
  const [logs, setLogs] = useState([]);
  const [period, setPeriod] = useState<Period>('30d');
  const [filter, setFilter] = useState<Filter>('allLogs');
  const [search, setSearch] = useState<Search>('');

  const routes = {
    functions: '/dashboard/functions',
    logs: '/dashboard/allLogs'
  }

  // Change options
  const changePeriod = (e: any) => {
    setPeriod(e.target.value);
    console.log(period);
  };

  const changeFilter = (e: any) => {
    setFilter(e.target.value);
    console.log(filter);
  };

  const changeSearch = (e: any) => {
    setSearch(e.target.value);
    console.log(search);
  };

  // Get data: function names or logs (depending on the input)
  // const getData = async (route:string) => {
  //   // response is a JSON Object that contains either an array of logs or array of functions depending on the route
  //   let res;
  //   try {
  //     res = await fetch(`${route}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'Application/JSON',
  //         authorization: `BEARER ${localStorage.getItem('accessToken')}`,
  //         refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
  //       },
  //       body: JSON.stringify({}),
  //     });
  //     // convert response to JS object
  //     res = await res.json();
  //   }
  //   catch(err){
  //     console.log(err);
  //   }
  //   // console.log(`${route}`, resArr);
    
  //   switch(route) {
  //     case routes.functions:
  //       setFunctions(res.functions);
  //       setSelectedFunc(res.functions[0])
  //       break;
  //     case routes.logs:
  //       setLogs(res.logs);
  //       break;
  //     default:
  //       console.log(`${route}`, res);
  //   }
  // };


  const getFunctions = async () => {
    let res;
    try {
      res = await fetch(`${routes.functions}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
        body: JSON.stringify({}),
      });
      // convert response to JS object
      res = await res.json();
    }
    catch(err){
      console.log(err);
    }
    const funcArr = res.functions || ['unable to fetch lambda functions'];

    setFunctions(funcArr);
    setSelectedFunc(funcArr[0])
  }

  const getLogs = async () => {
    let res;
    try {
      res = await fetch(`${routes.logs}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
        body: JSON.stringify({selectedFunc}),
      });
      // convert response to JS object
      res = await res.json();
    }
    catch(err){
      console.log(err);
    }

    const logsArr = res.logs || ['unable to fetch logs'];

    setLogs(res.logs);
  }


  // const getData = async (route:string) => {
  //   // response is a JSON Object that contains either an array of logs or array of functions depending on the route
  //   let resArr = [];
  //   try {
  //     const res = await fetch(`${route}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'Application/JSON',
  //         authorization: `BEARER ${localStorage.getItem('accessToken')}`,
  //         refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
  //       },
  //       body: JSON.stringify({}),
  //     });
  //     // convert response to JS object
  //     const resObj = await res.json();
  //   }
  //   catch {
  //     resArr.push('unable to fetch data');
  //   }
  //   console.log(`${route}`, resArr);
    
  //   switch(route) {
  //     case routes.functions:
  //       setFunctions(resArr);
  //       setSelectedFunc(resArr[0])
  //       break;
  //     case routes.logs:
  //       setLogs(resArr);
  //       break;
  //     default:
  //       console.log(`${route}`, resArr);
  //   }
  // };

  // On component mount: get all lambda functions
  useEffect(() => {
    getFunctions();
  }, []);

  // On state change selectedFunc, period, filter: get logs based on selected lambda func and options
  useEffect(() => {
    getLogs();
  }, [selectedFunc, period, filter]);


  const logsList = logs.map((log) =>
  <div className='logs-log-event'>{log}</div>
  );

  const functionsList = functions.map((func) =>
  <div className='logs-function-name'>{func}</div>
  );


  return (
    <div>
      <div>Logs</div>
      <div className='logs-container' style={{ display: 'flex', gap: '2rem' }}>
        <div className='logs-functions'>
          functions
          {functionsList}
        </div>
        <div className='logs-logs'>
          <div className='logs-filters'>
            <div
              className='logs-options-period'
              style={{ display: 'flex', gap: '1rem' }}
            >
              <button value={'30d'} onClick={changePeriod}>
                30D
              </button>
              <button value={'14d'} onClick={changePeriod}>
                14D
              </button>
              <button value={'7d'} onClick={changePeriod}>
                7D
              </button>
              <button value={'1d'} onClick={changePeriod}>
                1D
              </button>
              <button value={'1h'} onClick={changePeriod}>
                1H
              </button>
            </div>

            <div className='logs-options-filters'>
              <button value={'allLogs'} onClick={changeFilter}>
                All logs
              </button>
              <button value={'reports'} onClick={changeFilter}>
                Reports
              </button>
              <button value={'errors'} onClick={changeFilter}>
                Errors
              </button>
            </div>
            <div className='logs-options-search'>
              <input onChange={changeSearch}></input>
              <button onClick={getLogs}>Search</button>
            </div>
          </div>
          logs
          {logsList}
        </div>
      </div>
    </div>
  );
};

export default Logs;
