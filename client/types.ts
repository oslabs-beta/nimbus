import React, { Dispatch, SetStateAction } from 'react';

// API METRICS COMPONENT
export interface SelectedApiMetrics {
    Latency: { timestamps: Date[], values: number[] },
    Count: { timestamps: Date[], values: number[] },
    '5XXError': { timestamps: Date[], values: number[] },
    '4XXError': { timestamps: Date[], values: number[] }
};

export type Metric = 'Latency' | 'Count' | '5XXError' | '4XXError';

export type Message = 'fetching data...' | 'data not found';

// API RELATIONS
export type Method = {
    func: string,
    method: string,
};

// APIs
export type View = 'metrics' | 'relations';

// Donut Chart
export type DonutChartProps = {
    rawData: {labels?: string[], data?: number[]}
};

// Function (uses chartJSconverter function)

export type FunctionProps = {
    funcName: string
    invocations: Data
    errors: Data
    throttles: Data
    duration: Data
}
  
export type Data = {
    values: Array<number>,
    timestamp: Array<number>
}
  
export type RawData = {
    y: number,
    x: string,
}; 
  
export type d3Data = Array<RawData>;

// Home (uses chartJSconverter function)

export type costProps = {
    memory: number[],
    invocations: number[],
    duration: number[]
};

export type HomeProps = {
    firstName: string;
};

// LineChart 

export type LineChartProps = {
    rawData : Array<RawData>,
    label : string,
};

// LOGIN PROPS

// Register

export interface UserData {
    email: String;
    firstName: String;
    lastName: String;
    password: String;
    confirmation: String;
    arn: String;
    region: String;
};

// Settings

export interface ProfileData {
    firstName: String;
    lastName: String;
    arn: String;
    region: String;
};

export interface PasswordData {
    password: String;
    confirmation: String;
};

export type SettingsProps = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmation: string;
    arn: string;
    region: string;
    setEmail: Dispatch<SetStateAction<string>>;
    setFirstName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setPassword: Dispatch<SetStateAction<string>>;
    setConfirmation: Dispatch<SetStateAction<string>>;
    setArn: Dispatch<SetStateAction<string>>;
    setRegion: Dispatch<SetStateAction<string>>;
};