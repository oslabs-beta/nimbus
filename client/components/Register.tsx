import React, { useState } from 'react';

interface Props {
  swapAuthView: () => void;
  handleUserLogin: () => void;
}

interface UserData {
  email: String;
  firstName: String;
  lastName: String;
  password: String;
  confirmation: String;
  arn: String;
  region: String;
}

const Register: React.FC<Props> = ({
  swapAuthView,
  handleUserLogin,
}: Props) => {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [arn, setArn] = useState('');
  const [region, setRegion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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

  const highlightInput = (errors: Array<String>): void => {
    errors.forEach((el) => {
      const input = document.querySelector<HTMLElement>(`#${el}`);
      if (input) {
        input.style.borderColor = 'red';
      }
    });
  };

  // Handle form sumbission
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
          highlightInput(result.errors);
        } else {
          console.log('user info:', result);
          handleUserLogin();
          localStorage.setItem('accessToken', result.accessToken);
          localStorage.setItem('refreshToken', result.refreshToken);
        }
      });
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

  return (
    <div>
      Register
      <form onSubmit={submitForm}>
        <label htmlFor='email'>Email</label>
        <br></br>
        <input
          type='text'
          id='email'
          name='email'
          onChange={updateEmail}
        ></input>
        <br></br>
        <label htmlFor='firstName'>First name</label>
        <br></br>
        <input
          type='text'
          id='firstName'
          name='firstName'
          onChange={updateFirstName}
        ></input>
        <br></br>
        <label htmlFor='lastName'>Last name</label>
        <br></br>
        <input
          type='text'
          id='lastName'
          name='lastName'
          onChange={updateLastName}
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
          <div>
            <b>Connect Your AWS Account</b>
            <br></br>
            Please follow the steps below to set up the connection to your AWS
            account. Click{' '}
            <a
              target='_blank'
              href='https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/review?templateURL=https://cf-templates-fo1de99kotoi-us-east-1.s3.amazonaws.com/2022347I7Q-nimbus.yaml&stackName=NimbusStack'
            >
              HERE
            </a>{' '}
            to start the process. Log into your AWS account.
            <br></br>
            You will be directed to a Create Stack page with a pre-populated
            Nimbus stack template and details.
            <br></br>
            At the bottom of the page, please make sure you check “I acknowledge
            that AWS CloudFormation might create IAM resources with custom
            names.”
            <br></br>
            Click “Create Stack” to generate a Nimbus stack under your AWS
            CloudFormation.
            <br></br>
            When the stack creation completes, navigate to the “Outputs” tab and
            copy the Nimbus ARN value (e.g.
            arn:aws:iam::00000000000:role/NimbusDelegationRole).
            <br></br>
            Paste the ARN value onto the corresponding sign-up field.
          </div>
          <label htmlFor='arn'>ARN</label>
          <br></br>
          <input type='text' id='arn' name='arn' onChange={updateArn}></input>
          <br></br>
          <select onChange={updateRegion} value={region}>
            <option value=''>Select AWS region</option>
            {regionsOptions.map((item, idx) => (
              <option key={`region-${idx}`} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Submit form */}
        <br></br>
        <input type='submit' value='Submit'></input>
      </form>
      <div className='errorMessage'>{errorMessage}</div>
      <button onClick={swapAuthView}>Login</button>
    </div>
  );
};

export default Register;
