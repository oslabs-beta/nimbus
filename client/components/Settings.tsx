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
    setErrorMessage('Some information is missing or incorrect!');
  };

  const handleSuccess= () => {
    setSuccessMessage('Your profile details are updated successfully!');
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

    return (
    <>
      <div className='flex flex-col lg:flex-row w-full'>
        <div className="lg:basis-1/2 lg:pl-20 lg:pr-8 px-20">
          <h3 className="text-xl text-secondary text-center font-bold">Profile</h3>
          <form onSubmit={submitProfileForm}>
            <div className="form-control">
              <label htmlFor='firstName' className="label"><span className="label-text">First Name</span></label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                onChange={updateFirstName}
                value={firstName}
                className="input input-bordered"
              ></input>
            </div>
            <div className="form-control">
              <label htmlFor='lastName' className="label"><span className="label-text">Last Name</span></label>
              <input
                type='text'
                id='lastName'
                name='lastName'
                onChange={updateLastName}
                value={lastName}
                className="input input-bordered"
              ></input>
            </div>
            <div className="form-control">
              <label htmlFor='arn' className="label"><span className="label-text">ARN</span></label>
              <input type='text' id='arn' name='arn' onChange={updateArn} value={arn} className="input input-bordered"></input>
            </div>
            <div className='form-control'>
            <label htmlFor='region' className="label"><span className="label-text">Region</span></label>
              <select onChange={updateRegion} value={region} className="select select-secondary w-full">
                <option value={region}>{region}</option>
                {filteredRegionsOptions.map((item, idx) => (
                  <option key={`region-${idx}`} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <input type='submit' value='Save' className="btn btn-primary mt-4"></input>
            </div>
          </form>
        </div>
        
        <div className="lg:basis-1/2 lg:pl-8 lg:pr-20 px-20">
          <h3 className="text-xl text-secondary text-center font-bold">Login Details</h3>
          <form onSubmit={submitPasswordForm} >
            <div className='form-control'>
              <label htmlFor='email' className="label"><span className="label-text">Email</span></label>
              <input
                type='text'
                id='email'
                name='email'
                value={email}
                disabled={true}
                className="input input-bordered disabled:bg-neutral-800 disabled:text-slate-400"
              ></input>
            </div>
            <div className='form-control'>
              <label htmlFor='password' className="label"><span className="label-text">Update Password</span></label>
              <input
              type='password'
              id='password'
              name='password'
              onChange={updatePassword}
              ref={passwordRef}
              className="input input-bordered"
              ></input>
            </div>
            <div className='form-control'>
              <label htmlFor='confirmation' className="label"><span className="label-text">Confirm Password</span></label>
              <input
              type='password'
              id='confirmation'
              name='confirmation'
              onChange={updateConfirmation}
              ref={confirmationRef}
              className="input input-bordered"
              ></input>
            </div>
            <div className='form-control'>
              <input type='submit' value='Save' className="btn btn-primary mt-4"></input>
            </div>
          </form>
        </div>
      </div>
      { (errorMessage !== '' && successMessage === '')
        && 
        <div className="alert alert-error shadow-lg fixed top-0 lg:left-60 mt-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      }
      { successMessage !== ''
        &&
        <div className="alert alert-success shadow-lg fixed top-0 lg:left-60 mt-1">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{successMessage}</span>
          </div>
        </div>
      }
    </>)
    
};

export default Settings;
