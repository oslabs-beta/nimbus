import React, { useState } from 'react';
import { UserData, AuthProps } from "../types";

type FormErrors = {email:boolean; firstName:boolean; lastName:boolean; password:boolean; confirmation:boolean; arn:boolean};

const Register: React.FC<AuthProps> = ({swapAuthView, handleUserLogin }: AuthProps) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [arn, setArn] = useState('');
  const [region, setRegion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({email: false, firstName: false, lastName: false, password: false, confirmation: false, arn: false});

  // Update state when user types email, password etc.
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

  // Hnadle wrong user input
  const handleError = () => {
    setErrorMessage('Some information is missing or incorrect');
  };

  // Update errors object
  const updateErrors = (errors: Array<string>): void => {
    const errorObj:any = {email:false, firstName:false, lastName:false, password:false, confirmation:false, arn:false}
    
    errors.forEach((el) => {
      errorObj[el] = true;
    });
    setErrors(errorObj);
  };

  // Send user credentials to server and receive access and refresh tokens
  const submitForm = (e: any) => {
    e.preventDefault();

    const userData: UserData = {
      email,
      firstName,
      lastName,
      password,
      confirmation,
      arn,
      region,
    };
    console.log('user data from front end ', userData);

    fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/JSON' },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('email form login:', result);
        if (result.errMessage) {
          handleError();
          updateErrors(result.errors);
        } else {
          console.log('user info:', result);
          handleUserLogin();
          // Save access token to local storage
          localStorage.setItem('accessToken', result.accessToken);
        }
      });
  };

  // List of AWS regions
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

  return (
    <div>
      <form onSubmit={submitForm}>
        <div className="hero-content items-stretch flex-col lg:flex-row px-12 py-12">
          <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <div className='card-body'>
              <h3 className="text-center font-bold text-primary text-xl mb-1">Register</h3>
              <div className="form-control">
                <label htmlFor='email' className="label"><span className="label-text">Email</span></label>
                <input
                  type='text'
                  id='email'
                  name='email'
                  onChange={updateEmail}
                  className={errors.email ? "input input-bordered input-error" : "input input-bordered"}
                ></input>
              </div>
              <div className="form-control">
                <label htmlFor='firstName' className="label"><span className="label-text">First Name</span></label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  onChange={updateFirstName}
                  className={errors.firstName ? "input input-bordered input-error" : "input input-bordered"}
                ></input>
              </div>
              <div className="form-control">
                <label htmlFor='lastName' className="label"><span className="label-text">Last Name</span></label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  onChange={updateLastName}
                  className={errors.lastName ? "input input-bordered input-error" : "input input-bordered"}
                ></input>
              </div>
              <div className="form-control">
              <label htmlFor='password' className="label"><span className="label-text">Password</span></label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  onChange={updatePassword}
                  className={errors.password ? "input input-bordered input-error" : "input input-bordered"}
                ></input>
              </div>
              <div className="form-control">
                <label htmlFor='confirmation' className="label"><span className="label-text">Confirm Password</span></label>
                <input
                  type='password'
                  id='confirmation'
                  name='confirmation'
                  onChange={updateConfirmation}
                  className={errors.confirmation ? "input input-bordered input-error" : "input input-bordered"}
                ></input>
              </div>
            </div>
          </div>
          <div className='card flex-shrink-0 w-full max-w-md lg:max-w-xl shadow-2xl bg-base-100'>
            <div className='card-body'>
              <div className=''>
                <h3 className="text-center font-bold text-primary text-xl mb-3">Connect Your AWS Account</h3>
                <p className="mb-2">
                    Please follow the steps below to set up the connection to your AWS
                    account. Click{' '}
                    <a
                      target='_blank'
                      href='https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://cf-templates-htl66jverox0-us-east-1.s3.amazonaws.com/2023-01-03T001457.540Zd6i-nimbus-new.yaml&stackName=Nimbus-Stack'
                      className='text-accent underline underline-offset-2 hover:text-secondary'
                    >
                      HERE
                    </a>{' '}
                    to start the process.
                </p>
                <ul className='list-decimal px-5'>
                  <li className="text-sm">
                    Log into your AWS account.
                  </li>
                  <li className="text-sm">
                    You will be directed to a Create Stack page with a pre-populated Nimbus stack template and details.
                  </li>
                  <li className="text-sm">
                    At the bottom of the page, please make sure you check “I acknowledge that AWS CloudFormation might create IAM resources with custom names.”
                  </li>
                  <li className="text-sm">
                    Click “Create Stack” to generate a Nimbus stack under your AWS CloudFormation.
                  </li>
                  <li className="text-sm">
                    When the stack creation completes, navigate to the “Outputs” tab and copy the Nimbus ARN value (e.g. arn:aws:iam::00000000000:role/NimbusDelegationRole).
                  </li>
                  <li className="text-sm">
                    Paste the ARN value onto the corresponding sign-up field.
                  </li>
                </ul>
              </div>
              <div className="form-control">
                <label htmlFor='arn' className='label'><span className="label-text">ARN</span></label>
                <input type='text' id='arn' name='arn' onChange={updateArn} className={errors.arn ? "input input-bordered input-secondary input-error" : "input input-bordered input-secondary "}></input>
              </div>
              <div className="form-control">
                <select onChange={updateRegion} value={region} className="select select-secondary w-full">
                  <option value=''>Select AWS region</option>
                  {regionsOptions.map((item, idx) => (
                    <option key={`region-${idx}`} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
              <input type='submit' value='Submit' className="btn btn-primary"></input>
              </div>
              <button onClick={swapAuthView} className="underline underline-offset-2 text-base-300">Switch to Login</button>
            </div>
          </div>
          { (errorMessage !== '')
            && 
            <div className="alert alert-error shadow-lg fixed bottom-0 mt-1">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{errorMessage}</span>
              </div>
            </div>
          }
        </div>
      </form>  
    </div>


  );
};

export default Register;
