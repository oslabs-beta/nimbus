import React, { Dispatch, SetStateAction } from 'react';

export interface SelectedApiMetrics {
    Latency: { timestamps: Date[], values: number[] },
    Count: { timestamps: Date[], values: number[] },
    '5XXError': { timestamps: Date[], values: number[] },
    '4XXError': { timestamps: Date[], values: number[] }
};

export type ApiMetricsProps = {
    selectedApi: string
    apiMetrics: any;
}; 

export type Metric = 'Latency' | 'Count' | '5XXError' | '4XXError';

export type Message = 'fetching data...' | 'data not found';

export type ApiRelationsProps = {
    selectedApi: string
    apiRelations: Array<{apiName: string, endpoints: {[key: string]: Method[]}}> | null | undefined;
};

export type Method = {
    func: string,
    method: string,
};

export type View = 'metrics' | 'relations';

export type DonutChartProps = {
    rawData: {labels?: string[], data?: number[]}
};

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
  
export type chartJSData = Array<RawData>;

export type costProps = {
    memory: number[],
    invocations: number[],
    duration: number[]
};

export type HomeProps = {
    firstName: string;
};

export interface HeadBarProps {
    toggleTheme: () => void;
    theme: String;
};

export type LineChartProps = {
    rawData : Array<RawData>,
    label : string,
};

export interface AuthProps {
    swapAuthView: () => void
    handleUserLogin: () => void
};

export interface UserAuthProps {
    handleUserLogin: () => void;
    toggleTheme: () => void;
};

export interface FetchHeader {
    headers: {
      'Content-Type': string;
      authorization: {
        accessToken: string;
        refreshToken: string;
      };
    };
};

export interface UserData {
    email: String;
    firstName: String;
    lastName: String;
    password: String;
    confirmation: String;
    arn: String;
    region: String;
};

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

// Function is used in Home&Function components
// Converted RawData into a structure that is compatible with ChartJS
export const convertToChartJSStructure = (rawData: Data) => {
    const output = [];
    
    for (let i = rawData.values.length - 1; i >= 0; i--) {
      const subElement: RawData = {
        y: rawData.values[i],
        x: new Date(rawData.timestamp[i]).toLocaleString([], {year: "2-digit", month: "numeric", day: "numeric"})
      }
      output.push(subElement);
      // Get the date of the current iteration
      let date = new Date(rawData.timestamp[i])
      // If the next day is less than the next date in our iteration push a value of 0 and the next day into our object
      if ((date.getTime() + 1) < (new Date (rawData.timestamp[i - 1])).getTime()) {
        date.setDate(date.getDate() + 1)
        while (date.getTime() < (new Date (rawData.timestamp[i - 1])).getTime()) {
          const subElement: RawData = {
            y: 0,
            x: new Date(date).toLocaleString([], {year: "2-digit", month: "numeric", day: "numeric"})
          }
          output.push(subElement);
          date.setDate(date.getDate() + 1)
        }
      }
    }
    return output;
  };

