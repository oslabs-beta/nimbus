import React, { useEffect, useState, useRef } from 'react';


interface ProfileData {
  firstName: String;
  lastName: String;
  arn: String;
  region: String;
}

interface PasswordData {
  password: String;
  confirmation: String;
}

const Settings = () => {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('AAA');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [arn, setArn] = useState('');
  const [region, setRegion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const confirmationRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const routes = {
    userDetails: '/dashboard/userDetails',
    updateProfile: '/dashboard/updateProfile',
    updatePassword: '/dashboard/updatePassword'
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
    getUserDetails();
  }, []);
  
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

  const resetPasswords = () => {
    passwordRef.current.value = "";
    confirmationRef.current.value = "";
  }

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

  const handleError = () => {
    setErrorMessage('Some information is missing or incorrect');
  };

  const handleSuccess= () => {
    setSuccessMessage('Your profile details are updated successfully');
  };

  const handlePasswordSuccess= () => {
    setSuccessMessage('Password updated successfully');
  };

  const highlightInput = (errors: Array<String>): void => {
    errors.forEach((el) => {
      const input = document.querySelector<HTMLElement>(`#${el}`);
      if (input) {
        input.style.borderColor = 'red';
      }
    });
  };

  const submitProfileForm = (e: any) => {
    e.preventDefault();
    const updatedProfileData: ProfileData = {
      firstName,
      lastName,
      arn,
      region,
    };
    fetch(routes.updateProfile, {
      method: 'POST',
      headers: { 
        'Content-Type': 'Application/JSON' ,
        authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
      },
      body: JSON.stringify(updatedProfileData),
    }).then(res => res.json())
      .then((result) => {
        console.log('email form login:', result);
        if (result.errMessage) {
          handleError();
          highlightInput(result.errors);
        } else {
          console.log('user info:', result);
          handleSuccess();
          setFirstName(result.firstName);
          setLastName(result.lastName);
          setArn(result.arn);
          setRegion(result.region);
        }
      })
  }

  const submitPasswordForm = (e: any) => {
    e.preventDefault();
    const updatedPasswordData: PasswordData = {
      password,
      confirmation
    };
    fetch(routes.updatePassword, {
      method: 'POST',
      headers: { 
        'Content-Type': 'Application/JSON' ,
        authorization: `BEARER ${localStorage.getItem('accessToken')}`,
        refresh: `BEARER ${localStorage.getItem('refreshToken')}`,
      },
      body: JSON.stringify(updatedPasswordData),
    }).then(res => res.json())
      .then((result) => {
        console.log('email form login:', result);
        if (result.errMessage) {
          handleError();
          highlightInput(result.errors);
        } else if (result.successMessage) {
          handlePasswordSuccess();
          setPassword('');
          setConfirmation('');
          resetPasswords();
        }
      })
  }

    return (<div>
    Settings
    <h3>Profile</h3>
    <form onSubmit={submitProfileForm}>
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
      <div>
        <label htmlFor='arn'>ARN</label>
        <br></br>
        <input type='text' id='arn' name='arn' onChange={updateArn} value={arn}></input>
        <br></br>
        <select onChange={updateRegion} value={region}>
          <option value={region}>{region}</option>
          {filteredRegionsOptions.map((item, idx) => (
            <option key={`region-${idx}`} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <br></br>
      <input type='submit' value='Save'></input>
    </form>
    <h3>Login Details</h3>
    <form onSubmit={submitPasswordForm} >
      <label htmlFor='email'>Email</label>
      <br></br>
      <input
        type='text'
        id='email'
        name='email'
        value={email}
        disabled={true}
      ></input>
      <br></br>
      <label htmlFor='password'>Update Password</label>
      <br></br>
      <input
        type='password'
        id='password'
        name='password'
        onChange={updatePassword}
        ref={passwordRef}
      ></input>
      <br></br>
      <label htmlFor='confirmation'>Confirm Password</label>
      <br></br>
      <input
        type='password'
        id='confirmation'
        name='confirmation'
        onChange={updateConfirmation}
        ref={confirmationRef}
      ></input>
      <br></br>

      {/* Submit form */}
      <br></br>
      <input type='submit' value='Save'></input>
    </form>
    <div className='errorMessage'>{errorMessage}</div>
    <div className='errorMessage'>{successMessage}</div>
  </div>)
};

export default Settings;
