import React, { useState, useEffect } from 'react';
import { getAutomaticTypeDirectiveNames } from 'typescript';
import { v4 as uuidv4 } from 'uuid';

const Apis = () => {
  const [apiRelations, setApiRelations] = useState(null);
  const [selectedApi, setSelectedApi] = useState('');
  const [showMetrics, setShowMetrics] = useState(true);

  const toggleDisplay = () => {
    setShowMetrics(prev => !prev);
  }


  const getApiRelations = async () => {
    let res;
    try {
      res = await fetch('/dashboard/apiRelations', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
      });
      res = await res.json();
    
      // console.log("RES.FUNCTIONS", res.functions);
      const apiRel = res.functions || ['unable to fetch api relations'];
      setApiRelations(apiRel.apiRelations);

    }
    catch(err){
      console.log("ERROR FROM GET API RELATIONS", err);
    }
  }

  useEffect(() => {
    if (!apiRelations) {
      getApiRelations();
    }
  }, []);

  const getApiElements = () => {
    return (apiRelations as any).map((el:any) => {
      const currDivId = uuidv4();
      return (
        <div 
          key={currDivId}
          id={currDivId}
          style={{ fontWeight: selectedApi === el.apiName ? 'bold' : 'normal' }} 
          onClick={handleSelectedApi}
        >
          {el.apiName}
          </div>
      )
    })
  };

  const apiElements = apiRelations? getApiElements() : null;

  const handleSelectedApi = (e:any) => {
    setSelectedApi(() => e.target.value)
  }



  return (
    <div>
      Apis
      <div style={{display:'flex'}}>
        <div style={{display:'flex', flexDirection:'column', flexGrow:'1'}}>
          {apiElements}
        </div>
        <div style={{display:'flex', flexDirection:'column', gap: '1rem', flexGrow:'3'}}> 
          <div>
            <button onClick={toggleDisplay}>Metrics</button>
            <button onClick={toggleDisplay}>Relations</button>
          </div>
          <div>
            {showMetrics ? <ApiMetrics/> : <ApiRelations/>}
          </div>
        </div>
        
      </div>
    </div>

  );
};

export default Apis;
