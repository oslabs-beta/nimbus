import React, { useState, useEffect } from 'react';
// import { userContext } from 'react'

// THINGS TO ADD
// highlight selected buttons

// Types
type Period = '30d' | '14d' | '7d' | '1d' | '1hr';
type Search = String;

const Logs = () => {
  const [functions, setFunctions] = useState([]);
  const [selectedFunc, setSelectedFunc] = useState('');
  const [logs, setLogs] = useState(['Fetching logs...']);
  const [period, setPeriod] = useState<Period>('30d');
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


  const changeSearch = (e: any) => {
    if (e.target.value === 'allLogs') {
      setSearch('');
    } else if (e.target.value === 'reports') {
      setSearch('REPORT');
    } else if (e.target.value === 'errors') {
      setSearch('ERROR')
    } else {
      setSearch(e.target.value);
    }
  };

  const changeSelectedFunc = (e: any) => {
    if (e.target.value !== selectedFunc) {
      setSelectedFunc(e.target.value);
    }
  };

  // Get the names of Lambda functions in a string[], setFunctions to result and setSelectedFunc to first function
  const getFunctions = async () => {
    let res;
    try {
      res = await fetch(`${routes.functions}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
      });
      // convert response to JS object
      res = await res.json();
    

      const funcArr = res.functions || ['unable to fetch lambda functions'];

      setFunctions(funcArr);
      setSelectedFunc(funcArr[0])
    }
    catch(err){
      console.log("ERROR FROM GET FUNCTIONS", err);
    }
  }

  // Fetch logs for the selectedFunc in a string[] and setLogs
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

      let logsArr = res.filteredLogs || ['Logs not found']
      console.log("LOGS ARRAY", logsArr)
      setLogs(logsArr);
    }
    catch(err){
      console.log("ERROR FROM GET LOGS", err);
    }
  }


  // On component mount: get all lambda functions
  useEffect(() => {
    console.log("first useEffct")
    getFunctions();
  }, []);

  // On state change selectedFunc, period, search: get logs based on selected lambda func and options
  useEffect(() => {
    console.log("second useEffct")
    console.log("PERIOD", period)
    if (selectedFunc !== '') {
      getLogs();
    }
    
  }, [selectedFunc, period, search]);


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
              <button id='30d' value={'30d'} onClick={changePeriod}>
                30D
              </button>
              <button id='14d' value={'14d'} onClick={changePeriod}>
                14D
              </button>
              <button id='7d' value={'7d'} onClick={changePeriod}>
                7D
              </button>
              <button id='1d' value={'1d'} onClick={changePeriod}>
                1D
              </button>
              <button id='1hr' value={'1hr'} onClick={changePeriod}>
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
