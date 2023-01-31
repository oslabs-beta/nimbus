import React, { useState, useEffect } from 'react';
// import { userContext } from 'react'
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

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
  // const [buttonIsActive, setButtonIsActive] = useState(false);
  // const [buttonState, setButtonState] = useState({
  //   activeObject: null,
  //   objects: functionsList,
  // });
  const [selectedTimeButton, setSelectedTimeButton] = useState('30d');
  const [selectedLogsButton, setSelectedLogsButton] = useState('All logs');
  const [selectedFunctionButton, setSelectedFunctionButton] = useState('');

  const routes = {
    functions: '/dashboard/functions',
    logs: '/dashboard/filteredLogs',
  };

  // Change period
  const changePeriod = (e: any) => {
    if (e.target.value !== period) {
      setPeriod(e.target.value);
    }
  };

  // Change search keyword
  const changeSearch = (e: any) => {
    if (e.target.value === 'allLogs') {
      setSearch('');
    } else if (e.target.value === 'reports') {
      setSearch('REPORT');
    } else if (e.target.value === 'errors') {
      setSearch('error');
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
        },
      });
      // convert response to JS object
      res = await res.json();

      console.log('RES.FUNCTIONS', res.functions);
      // func arr is an array of strings (function names)
      const funcArr = res.functions || ['unable to fetch lambda functions'];
      // change functions to be array with all function names
      setFunctions(funcArr);
      //
      setSelectedFunc(funcArr[0]);
      setSelectedFunctionButton(funcArr[0]);
    } catch (err) {
      console.log('ERROR FROM GET FUNCTIONS', err);
    }
  };

  // Fetch logs for the selectedFunc in a string[] and setLogs
  const getLogs = async () => {
    let res;
    const reqBody = {
      functionName: selectedFunc,
      filterPattern: search,
      period: period,
    };
    console.log(reqBody);
    try {
      res = await fetch(`${routes.logs}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(reqBody),
      });
      // convert response to JS object
      res = await res.json();
      let logsArr = res.filteredLogs || ['Logs not found'];
      setLogs(logsArr);
    } catch (err) {
      console.log('ERROR FROM GET LOGS', err);
    }
  };

  // On component mount: get all lambda functions
  useEffect(() => {
    console.log('first useEffect');
    getFunctions();
    //setSelectedFunctionButton(functions[0]);
  }, []);

  // On state change selectedFunc, period, search: get logs based on selected lambda func and options
  useEffect(() => {
    console.log('second useEffect');
    console.log('PERIOD', period);
    if (selectedFunc !== '') {
      getLogs();
    }
  }, [selectedFunc, period, search]);

  const logsList = logs.map((log, i) => (
    <tr className="w-full">
      {/* <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        stroke-width='1.5'
        stroke='currentColor'
        className='w-4 h-4'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M8.25 4.5l7.5 7.5-7.5 7.5'
        />
      </svg> */}
      <th className="w-[5%]">{i + 1}</th>
      {/* <td className='whitespace-normal'>{log}</td> */}
      <td className='w-[95%]'>{log}</td>
    </tr>
    // overflow-hidden
  ));

  /* <div key={`log-${i}`} className='logs-log-event overflow-x-auto'>
  <table className='table table-compact w-full'>
  <thead>
    <tr>
      <th></th>
      <th>Logs</th>
    </tr>
  </thead>
  <tbody>
    
  </tbody>
</table>
</div> */
  // ['func1', 'func2, 'func3']
  const functionsList = functions.map((funcStr, i) => (
    <option
    // className={selectedFunctionButton === funcStr ? 'btn btn-active' : 'btn'}
    // key={`func-${i}`}
    // onClick={(e) => {
    //   changeSelectedFunc(e);
    //   setSelectedFunctionButton(funcStr);
    // }}
    // value={funcStr}
    >
      {funcStr}
    </option>
  ));

  return (
    <>
      <div className='logs-logs flex flex-col w-full overflow-auto'>
        <div className='logs-filters flex flex-col xl:flex-row justify-center items-center lg:justify-around w-full mx-8 mb-6'>
          <select
            className='select select-primary max-w-fit mb-3 xl:mb-0'
            onChange={changeSelectedFunc}
          >
            {functionsList}
          </select>
          <div className='btn-group mb-3 xl:mb-0'>
            <button
              className={
                selectedTimeButton === '30d' ? 'btn btn-active' : 'btn'
              }
              id='30d'
              value={'30d'}
              onClick={(e) => {
                changePeriod(e);
                setSelectedTimeButton('30d');
              }}
            >
              30D
            </button>
            <button
              className={
                selectedTimeButton === '14d' ? 'btn btn-active' : 'btn'
              }
              id='14d'
              value={'14d'}
              onClick={(e) => {
                changePeriod(e);
                setSelectedTimeButton('14d');
              }}
            >
              14D
            </button>
            <button
              className={selectedTimeButton === '7d' ? 'btn btn-active' : 'btn'}
              id='7d'
              value={'7d'}
              onClick={(e) => {
                changePeriod(e);
                setSelectedTimeButton('7d');
              }}
            >
              7D
            </button>
            <button
              className={selectedTimeButton === '1d' ? 'btn btn-active' : 'btn'}
              id='1d'
              value={'1d'}
              onClick={(e) => {
                changePeriod(e);
                setSelectedTimeButton('1d');
              }}
            >
              1D
            </button>
            <button
              className={
                selectedTimeButton === '1hr' ? 'btn btn-active' : 'btn'
              }
              id='1hr'
              value={'1hr'}
              onClick={(e) => {
                changePeriod(e);
                setSelectedTimeButton('1hr');
              }}
            >
              1H
            </button>
          </div>

          <div className='btn-group mb-3 xl:mb-0'>
            <button
              className={
                selectedLogsButton === 'All logs' ? 'btn btn-active' : 'btn'
              }
              value={'allLogs'}
              onClick={(e) => {
                changeSearch(e);
                setSelectedLogsButton('All logs');
              }}
            >
              All Logs
            </button>
            <button
              className={
                selectedLogsButton === 'Reports' ? 'btn btn-active' : 'btn'
              }
              value={'reports'}
              onClick={(e) => {
                changeSearch(e);
                setSelectedLogsButton('Reports');
              }}
            >
              Reports
            </button>
            <button
              className={
                selectedLogsButton === 'Errors' ? 'btn btn-active' : 'btn'
              }
              value={'errors'}
              onClick={(e) => {
                changeSearch(e);
                setSelectedLogsButton('Errors');
              }}
            >
              Errors
            </button>
          </div>

          <div className='form-control'>
            <div className='input-group'>
              <input
                type='text'
                placeholder='Search…'
                className='input input-bordered'
                onChange={changeSearch}
              />
              <button className='btn btn-square' onClick={getLogs}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-row justify-center gap-8 w-full mx-8 '>
          <div className='logs-log-event overflow-x-auto w-full'>
            <table className='table table-compact w-full'>
              <thead className='w-full'>
                <tr className='w-full'>
                  <th className='bg-primary w-[5%]'></th>
                  <th className='bg-primary w-[95%]'>Logs</th>
                </tr>
              </thead>
              <tbody className='w-full'>{logsList}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logs;
