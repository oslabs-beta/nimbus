import React, { useState, useEffect } from 'react';
// import { userContext } from 'react'

// Types
type Period = '30d' | '14d' | '7d' | '1d' | '1hr';
type Search = String;

const filters = ['allLogs', 'reports', 'errors'];

const Logs = () => {
  // use context from userContext
  // States: functions, logs, FILTERS: period (string)
  const [functions, setFunctions] = useState([]);
  const [selectedFunc, setSelectedFunc] = useState('');
  const [logs, setLogs] = useState(['Fetching logs...']);
  const [period, setPeriod] = useState<Period>('30d');
  // const [filter, setFilter] = useState<Filter>('allLogs');
  const [search, setSearch] = useState<Search>('');

  const routes = {
    functions: '/dashboard/functions',
    logs: '/dashboard/filteredLogs'
  }

  // Change options
  const changePeriod = (e: any) => {
    if (e.target.value !== period) {
      setPeriod(e.target.value);
    }
  };

  // const changeFilter = (e: any) => {
  //   setFilter(e.target.value);
  // };

  const changeSearch = (e: any) => {
    setSearch(e.target.value);
    if (filters.includes(e.target.value)) {
      console.log("filter works")
      getLogs();
    }
  };

  const changeSelectedFunc = (e: any) => {
    setSelectedFunc(e.target.value);
  };



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
    const reqBody = {functionName: selectedFunc, filterPattern:search, period:period};
    console.log(reqBody);
    try {
      res = await fetch(`${routes.logs}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
        body: JSON.stringify(reqBody),
      });
      // convert response to JS object
      res = await res.json();
    }
    catch(err){
      console.log(err);
    }

    // let logsArr;
    // if (logs[0] === 'Fetching logs...' && !res.logs) {
    //   logsArr = ['No logs found'];
    // }
    // else if (logs.length === 0 && !res.logs) {
    //   logsArr = ['Fetching logs...'];
    // }
    // else if (res.logs) {
    //   logsArr = res.logs;
    // }
    // console.log("LOGS ARRAY", logsArr);

    // let logsArr = res.logs || ['Fetching logs...']
    let logsArr = res.filteredLogs || ['Logs not found']
    console.log("LOGS ARRAY", logsArr)
    
    setLogs(logsArr);
  }


  // On component mount: get all lambda functions
  useEffect(() => {
    getFunctions();
  }, []);

  // On state change selectedFunc, period, filter: get logs based on selected lambda func and options
  useEffect(() => {
    console.log("PERIOD", period)
    getLogs();
  }, [selectedFunc, period]);


  const logsList = logs.map((log, i) =>
  <div key={`log-${i}`} className='logs-log-event'>{log}</div>
  );

  const functionsList = functions.map((func, i) =>
  <button 
    key={`func-${i}`} 
    onClick={changeSelectedFunc} 
    value={func} className='logs-function-name'
    >
      {func}
    </button>
  );


  return (
    <div>
      <div>Logs</div>
      <div className='logs-container' style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }} className='logs-functions'>
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
              <button value={'1hr'} onClick={changePeriod}>
                1H
              </button>
            </div>

            <div className='logs-options-filters'>
              <button value={'allLogs'} onClick={changeSearch}>
                All logs
              </button>
              <button value={'reports'} onClick={changeSearch}>
                Reports
              </button>
              <button value={'errors'} onClick={changeSearch}>
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
