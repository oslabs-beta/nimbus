import React, { useEffect, useState } from 'react';

const Settings = () => {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('AAA');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [arn, setArn] = useState('');
  const [region, setRegion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const routes = {
    userDetails: '/dashboard/userDetails',
  }

  const getUserDetails = async () => {
    let res;
    try {
      res = await fetch(`${routes.userDetails}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/JSON',
          authorization: `BEARER ${localStorage.getItem('accessToken')}`,
          refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
        },
      });
      // convert response to JS object
      res = await res.json();
      setEmail(res.email);
      setFirstName(res.firstName);
      setLastName(res.lastName);
      setArn(res.arn);
      setRegion(res.region);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    
  }, []);

  const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  
  const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };
  
  const updateLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };
  
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  
  const updateConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(e.target.value);
  };
  
  const updateArn = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArn(e.target.value);
  };
  
  const updateRegion = (e: any) => {
    setRegion(e.target.value);
  };

  const regionsOptions = [
    'us-east-2',
    'us-east-1',
    'us-west-1',
    'us-west-2',
    'af-south-1',
    'ap-east-1',
    'ap-south-2',
    'ap-southeast-3',
    'ap-south-1',
    'ap-northeast-3',
    'ap-northeast-2',
    'ap-southeast-1',
    'ap-southeast-2',
    'ap-northeast-1',
    'ca-central-1',
    'eu-central-1',
    'eu-west-1',
    'eu-west-2',
    'eu-south-1',
    'eu-west-3',
    'eu-south-2',
    'eu-north-1',
    'eu-central-2',
    'me-south-1',
    'me-central-1',
    'sa-east-1',
    'us-gov-east-1',
    'us-gov-west-1',
  ];

  const filteredRegionsOptions = regionsOptions.filter(r => r !== region);

  const submitForm = () => {

  }

    return (<div>
    Settings
    <form onSubmit={submitForm}>
      <label htmlFor='email'>Email</label>
      <br></br>
      <input
        type='text'
        id='email'
        name='email'
        onChange={updateEmail}
        value={email}
      ></input>
      <br></br>
      <label htmlFor='firstName'>First name</label>
      <br></br>
      <input
        type='text'
        id='firstName'
        name='firstName'
        onChange={updateFirstName}
        value={firstName}
      ></input>
      <br></br>
      <label htmlFor='lastName'>Last name</label>
      <br></br>
      <input
        type='text'
        id='lastName'
        name='lastName'
        onChange={updateLastName}
        value={lastName}
      ></input>
      <br></br>
      <label htmlFor='password'>Password</label>
      <br></br>
      <input
        type='password'
        id='password'
        name='password'
        onChange={updatePassword}
      ></input>
      <br></br>
      <label htmlFor='confirmation'>Confirm password</label>
      <br></br>
      <input
        type='password'
        id='confirmation'
        name='confirmation'
        onChange={updateConfirmation}
      ></input>
      <br></br>
      <div>
        <label htmlFor='arn'>ARN</label>
        <br></br>
        <input type='text' id='arn' name='arn' onChange={updateArn} value={arn}></input>
        <br></br>
        <select onChange={updateRegion} value={region}>
          <option value=''>{region}</option>
          {filteredRegionsOptions.map((item, idx) => (
            <option key={`region-${idx}`} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Submit form */}
      <br></br>
      <input type='submit' value='Save'></input>
    </form>
    <div className='errorMessage'>{errorMessage}</div>
  </div>)
};

export default Settings;
