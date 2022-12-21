import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [invocationsData, setInvocations] = useState({});
  const [errorsData, setErrors] = useState({});
  const [throttlesData, setThrottles] = useState({});
  const [durationData, setDurations] = useState({});

  const route = '/dashboard/allMetrics'

  // Sends a GET request to the '/dashboard/allMetrics' route
  // Uses ReactHooks in order to change the states based on data received from AWS
  const getMetrics = async () => {
    let res;
    try {
      res = await fetch(route, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
      });
      res = await res.json();
      setInvocations({invocations: res.metrics.invocations,});
      setErrors({errors: res.metrics.errors });
      setThrottles({throttles: res.metrics.throttles });
      setDurations({duration: res.metrics.duration});
    } catch(error) {
      console.log(error);
    }
  }

  // Invokes the getMetrics function
  useEffect(() => {
    getMetrics();
  }, []);



  return (
  <div>Home
    <ul>
      <li></li>
    </ul>
  </div>
  );
};

export default Home;
