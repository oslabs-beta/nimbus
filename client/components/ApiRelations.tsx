import React, { useState, useEffect } from 'react';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  selectedApi: string
  apiRelations: any;
};

const ApiRelations: React.FC<Props> = ({ selectedApi, apiRelations }: Props) => {
  const [message, setMessage] = useState('fetching data...')

  // If data not found, set message
  if (Array.isArray(apiRelations) && typeof apiRelations[0] === 'string') {
    setMessage('data not found');
  }

  // Grab data for the selected API
  const selectedApiRelations = apiRelations 
                              && selectedApi 
                              ? 
                              apiRelations.filter((apiRel:any) => apiRel.apiName === selectedApi) 
                              : null;

  console.log("selectedApiRelations", selectedApiRelations)

  // Get endpoints data
  const endpoints = selectedApiRelations && selectedApiRelations.length > 0 ? selectedApiRelations[0].endpoints : null;
  
  console.log("endpoints", endpoints)
 
  return (
    <div>
      {/* <div>Apis Relations</div> */}
      {/* {if endpoints, render api relations, else render null} */}
      {endpoints ? 
      <div className='flex flex-col gap-y-4'>
        {/* <div>Endpoints</div> */}
        {Object.keys(endpoints).map((key) => {
        return (
          <div className='card w-96 bg-gray-800 shadow-xl' key={key}>
            <div className="card-body">
            <h2 className="card-title text-accent text-lg font-bold">{key}</h2>
            <ul className='list-disc'>
            {endpoints[key].map((item:any) => {
              return (
                <li key={item.method}>
                  <div>Method: {item.method}</div> 
                  <div>Function: {item.func}</div>
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