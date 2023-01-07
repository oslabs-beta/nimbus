import React, { useState, useEffect } from 'react';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  selectedApi: string
  apiRelations: any;
};

type Message = 'fetching data...' | 'data not found';

const ApiRelations: React.FC<Props> = ({ selectedApi, apiRelations }: Props) => {
  const [message, setMessage] = useState<Message>('fetching data...')

  // If data not found, set message
  if (Array.isArray(apiRelations) && typeof apiRelations[0] === 'string') {
    if (message !== 'data not found') {
      setMessage('data not found');
    }
  }

  // Grab data for the selected API
  const selectedApiRelations = apiRelations 
                              && selectedApi 
                              ? 
                              apiRelations.filter((apiRel:any) => apiRel.apiName === selectedApi) 
                              : null;


  // Get endpoints data
  const endpoints = selectedApiRelations && selectedApiRelations.length > 0 ? selectedApiRelations[0].endpoints : null;
  
  console.log("endpoints", endpoints)
 
  return (
    <div>
      {/* {if endpoints is truthy, render api relations, else render null} */}
      {endpoints ? 
      <div className='flex flex-col gap-y-4'>
        {Object.keys(endpoints).map((key) => {
        return (
          <div className='card w-96 bg-neutral shadow-xl' key={key}>
            <div className="card-body">
            <h2 className="card-title text-pink-300 text-lg font-bold">{key}</h2>
            <ul className=''>
            {endpoints[key].map((item:any) => {
              return (
                <li key={item.method} className='my-2'>
                    <div className='bg-secondary py-2 px-4 rounded-lg border-0'>
                  <div>
                    Method: {item.method} 
                    <svg  className="inline" style={{width:'1.5rem', fill: '#9ca3af', margin: '0rem .5rem'}} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize large"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                    Function: {item.func}
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