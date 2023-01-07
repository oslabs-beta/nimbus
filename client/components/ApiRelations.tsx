import React, { useState, useEffect } from 'react';

type Method = {
  func: string,
  method: string,
}

type Props = {
  selectedApi: string
  apiRelations: Array<{apiName: string, endpoints: {[key: string]: Method[]}}> | null | undefined;
};

type Message = 'fetching data...' | 'data not found';

// Display the relations for the selected API: routes, methods, and functions.
const ApiRelations: React.FC<Props> = ({ selectedApi, apiRelations }: Props) => {
  const [message, setMessage] = useState<Message>('fetching data...')

  // If data not found, set message
  if (apiRelations === undefined || selectedApi === '') {
    if (message !== 'data not found') {
      setMessage('data not found');
    }
  }

  // Grab data for the selected API; if not found set to null
  const selectedApiRelations = apiRelations 
                              && selectedApi 
                              ? 
                              apiRelations.filter((apiRel:any) => apiRel.apiName === selectedApi) 
                              : null;


  // Get endpoints data
  const endpoints = selectedApiRelations && selectedApiRelations.length > 0 ? selectedApiRelations[0].endpoints : null;
  
  console.log("endpoints", endpoints)
 
  // If endpoints is truthy, render api relations, else render message
  return (
    <div>
      {endpoints ? 
      <div className='flex flex-col gap-y-4'>
        {Object.keys(endpoints).map((key) => {
        return (
          <div className='card w-96 bg-neutral shadow-xl' key={key}>
            <div className="card-body">
            <h2 className="card-title text-pink-300 text-lg font-bold">{key}</h2>
            <ul className=''>
            {(endpoints)[key].map((method:Method) => {
              return (
                <li key={method.func} className='my-2'>
                    <div className='bg-secondary py-2 px-4 rounded-lg border-0'>
                  <div>
                    {method.method} 
                    <svg  className="inline" style={{width:'1.5rem', fill: 'rgb(250 232 255)', margin: '0rem .5rem'}} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize large"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    &#x3BB; : {method.func}
                  </div> 
                  </div>
                  
                </li>
              );
            })}
            </ul>
            </div>
          </div>
        );
      })}
      </div> 
      : 
      message}
    </div>
  );
};

export default ApiRelations;