import React, { useState, useEffect } from 'react';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  selectedApi: string
  apiRelations: any;
};

const ApiRelations: React.FC<Props> = ({ selectedApi, apiRelations }: Props) => {

  // "apiName": "nimbusTest2",
  //           "endpoints": {
  //               "/": [
  //                   {
  //                       "method": "POST",
  //                       "func": "myNextFunc"
  //                   },
  //                   {
  //                       "method": "DELETE",
  //                       "func": "myNewFunc2"
  //                   },
  //                   {
  //                       "method": "GET",
  //                       "func": "myGegeFunc"
  //                   }
  //               ]
  //           }

  const selectedApiRelations = typeof apiRelations[0] !== 'string' && selectedApi ? 
    apiRelations.filter((apiRel:any) => apiRel.apiName === selectedApi) 
    : null;

  console.log("selectedApiRelations", selectedApiRelations)

  const endpoints = selectedApiRelations[0].endpoints || null;
  
  console.log("endpoints", endpoints)
  // const displayRelations = () => {
  //   let rels;
  //   if (!selectedApiRelations) {
  //     rels = null;
  //   }
  //   else {
  //     rels = [];
  //     selectedApiRelations.forEach((el:any) => {
  //       rels.push(<div key={uuidv4()}>el</div>)
  //     })
  //   }
  // }

  // get endpoints 
  // for each key in endpoints
    // create a div

  return (
    <div>
      <div>Apis Relations</div>
      {/* {if endpoints, render api relations, else render null} */}
      {endpoints ? 
      <div>
        <div>Endpoints</div>
        {Object.keys(endpoints).map((key) => {
        return (
          <div key={key}>
            <b>'{key}'</b>
            <ul>
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
        );
      })}
      </div> 
      : 
      null}
    </div>
  );
};

export default ApiRelations;