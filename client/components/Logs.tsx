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

  // get function names
  const getFunctions = async () => {
    // const accessToken = localStorage.getItem('accessToken');
    // const refreshToken = localStorage.getItem('refreshToken');

    const res = await fetch('/dashboard/functions', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
        authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
      },
      body: JSON.stringify({}),
    });

    const funcArr = await res.json();
    console.log('FUNC ARRAY', funcArr);
    // setFunctions(funcArr)
  };

  // useEffect
  useEffect(() => {
    getFunctions();
  }, []);
  // get logs based on the function that's clicked

  // Get function

  // Get logs
  const getLogs = () => {
    // const logs = fetch('/POST');
  };

  return (
    <div>
      <div>Logs</div>
      <div className='logs-container' style={{ display: 'flex', gap: '2rem' }}>
        <div className='logs-functions'>
          {/* {functions} */}
          functions
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
          {/* {functions} */}
          logs
        </div>
      </div>
    </div>
  );
};

export default Logs;
