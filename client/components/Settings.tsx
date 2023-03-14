import React, { useEffect, useState, useRef } from 'react';
import { ProfileData, PasswordData, SettingsProps } from "../types";

const Settings: React.FC<SettingsProps> = (props: SettingsProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Create refs for password and confirmation
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const confirmationRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  // Store routes in object
  const routes = {
    updateProfile: '/dashboard/settings/updateProfile',
    updatePassword: '/dashboard/settings/updatePassword'
  }
  
  // Update state on change
  const updateFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFirstName(e.target.value);
  };
  
  const updateLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setLastName(e.target.value);
  };
  
  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setPassword(e.target.value);
  };
  
  const updateConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setConfirmation(e.target.value);
  };
  
  const updateArn = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setArn(e.target.value);
  };
  
  const updateRegion = (e: any) => {
    props.setRegion(e.target.value);
  };

  // Reset password fields
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

  const filteredRegionsOptions = regionsOptions.filter(r => r !== props.region);

  // Set error and success messages
  const handleError = () => {
    setErrorMessage('Some information is missing or incorrect!');
  };

  const handleSuccess= () => {
    setSuccessMessage('Your profile details are updated successfully!');
  };

  const handlePasswordSuccess= () => {
    setSuccessMessage('Password updated successfully');
  };

  // Highlight erroneusly filled fields in red
  const highlightInput = (errors: Array<String>): void => {
    errors.forEach((el) => {
      const input = document.querySelector<HTMLElement>(`#${el}`);
      if (input) {
        input.style.borderColor = 'red';
      }
    });
  };

  // Update profile
  const submitProfileForm = (e: any) => {
    e.preventDefault();
    const updatedProfileData: ProfileData = {
      firstName: props.firstName,
      lastName: props.lastName,
      arn: props.arn,
      region: props.region,
    };
    fetch(routes.updateProfile, {
      method: 'POST',
      headers: { 
        'Content-Type': 'Application/JSON' ,
        authorization: `BEARER ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(updatedProfileData),
    }).then(res => res.json())
      .then((result) => {
        if (result.errMessage) {
          handleError();
          highlightInput(result.errors);
        } else {
          handleSuccess();
          props.setFirstName(result.firstName);
          props.setLastName(result.lastName);
          props.setArn(result.arn);
          props.setRegion(result.region);
        }
      })
  }
  
  // Update password
  const submitPasswordForm = (e: any) => {
    e.preventDefault();
    const updatedPasswordData: PasswordData = {
      password: props.password,
      confirmation: props.confirmation
    };
    fetch(routes.updatePassword, {
      method: 'POST',
      headers: { 
        'Content-Type': 'Application/JSON' ,
        authorization: `BEARER ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify(updatedPasswordData),
    }).then(res => res.json())
      .then((result) => {
        if (result.errMessage) {
          handleError();
          highlightInput(result.errors);
        } else if (result.successMessage) {
          handlePasswordSuccess();
          props.setPassword('');
          props.setConfirmation('');
          resetPasswords();
        }
      })
  }

    return (
    <>
      <div className='flex flex-col lg:flex-row w-full mb-24'>
        <div className="lg:basis-1/2 lg:pl-20 lg:pr-8 px-20 mb-8">
          <h3 className="text-xl text-base-300 text-center font-bold">Profile</h3>
          <form onSubmit={submitProfileForm}>
            <div className="form-control">
              <label htmlFor='firstName' className="label"><span className="label-text">First Name</span></label>
              <input
                type='text'
                id='firstName'
                name='firstName'
                onChange={updateFirstName}
                value={props.firstName}
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
                value={props.lastName}
                className="input input-bordered"
              ></input>
            </div>
            <div className="form-control">
              <label htmlFor='arn' className="label"><span className="label-text">ARN</span></label>
              <input type='text' id='arn' name='arn' onChange={updateArn} value={props.arn} className="input input-bordered"></input>
            </div>
            <div className='form-control'>
            <label htmlFor='region' className="label"><span className="label-text">Region</span></label>
              <select onChange={updateRegion} value={props.region} className="select select-secondary w-full">
                <option value={props.region}>{props.region}</option>
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
          <h3 className="text-xl text-base-300 text-center font-bold">Login Details</h3>
          <form onSubmit={submitPasswordForm} >
            <div className='form-control'>
              <label htmlFor='email' className="label"><span className="label-text">Email</span></label>
              <input
                type='text'
                id='email'
                name='email'
                value={props.email}
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
      { successMessage !== ''
        &&
        <div className="alert alert-success shadow-lg fixed bottom-0 mt-1 self-start w-full">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{successMessage}</span>
          </div>
        </div>
      }
      { (errorMessage !== '' && successMessage === '')
        && 
        <div className="alert alert-error shadow-lg fixed bottom-0 mt-1 self-start w-full">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMessage}</span>
          </div>
        </div>
      }
    </>)
    
};

export default Settings;
