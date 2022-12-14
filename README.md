<h1 align="center">
  <br>
    <img src ="./assets/nimbus-logo-color.png" align="center" width="300"/>
  <br>
  AWS Lambda Performance Tool
  <br>
</h1>

## NOTES ########################

This application is currently in development. Expected release date will be on January 12, 2023.


### About Nimbus
Serverless architecture is a hot topic in the software engineering world. The serverless framework abstracts infrastructure away from developers and allows them to shift focus towards business logic. 

Amazon Web Services has been named as a Leader in the 2022 Magic Quadrant for Cloud Infrastructure and Platform Services (CIPS) for the 12th consecutive year. In 2014, AWS pioneered the enhanced cloud infrastructure sector by launching the Lambda service. Lambda was the first FaaS offering by a large public cloud vender. 

AWS Lambda is a secure, on-demand, event-driven, compute service that scales as needed and allows users to be billed only for what is used. 

Nimbus is an open source performance monitoring tool for AWS Lambda applications. Nimbus allows developers to view metrics of their application as a whole as well as the benchmarks of each individual function. Nimbus offers a graphic user interface for customers to filter, search, and sort through the logs of Lambda functions. Additionally, Nimbus provides an estimation of the cost incurred from your invocations to help you stay aware of your spending. In short, Nimbus is a valuable tool that simplifies the process of monitoring your AWS Lambda functions.

### Installation
* download the desktop application here

### Demo
- Visit the landing page and download the app for your operating system. Install it on your computer to get started.

- Create an account by entering your information and linking it to your AWS account following the instructions provided on the Register page.


<img src ="./assets/NimbusGIFs/register-LQ.gif" alt="login gif" width="800" height="450"/>


- If you already have an account, simply log in.

<img src ="./assets/NimbusGIFs/login-to-home-LQ.gif" alt="login gif" width="800" height="450"/>

On the home page, you'll find a lot of information about the health of your AWS application, especially as it relates to lambda functions. This includes important metrics like the number of calls, errors, throttles, costs, and runtimes.

- Head over to the Functions tab to see metrics broken down by individual functions, including invocations, errors, throttles, and durations.

<img src ="./assets/NimbusGIFs/functions-light-LQ.gif" alt="functions gif" width="800" height="450"/>

- The Logs tab is where you can find all your lambda function logs and filter them by time period, reports only, errors only, or any keyword.

<img src ="./assets/NimbusGIFs/logs-LQ.gif" alt="logs gif" width="800" height="450"/>

- The APIs tab lets you view common API metrics, endpoints, and the lambda functions they're connected to.

<img src ="./assets/NimbusGIFs/apis-light-LQ.gif" alt="apis gif" width="800" height="450"/>

- In the Settings tab, you can update your personal information (including AWS Cloudformation Stack ARN and region) or change your login details.

<img src ="./assets/NimbusGIFs/settings-LQ.gif" alt="settings gif" width="800" height="450"/>


### Technologies Used

<!-- FRONT END -->
<a href="#"><img src="./assets/electron-logo-color.png" alt="Electron" title="Electron" align="center" height="30" /></a> <br>
<a href="#"><img src="./assets/react-logo-color.png" alt="React" title="React" align="center" height="30" /></a> <br>
<p><img src="./assets/chartjs-logo-color.svg" alt="ChartJS" title="ChartJS" align="center" height="30" /> Chart JS </p>
<a href="#"><img src="./assets/daisyui-logo-color.svg" alt="DaisyUI" title="DaisyUI" align="center" height="30" /></a> <br>
<a href="#"><img src="./assets/tailwind-logo-color.png" alt="Tailwind" title="Tailwind" align="center" height="30"/></a> <br>
<a href="#"><img src="./assets/ts-logo-long-blue.png" alt="Typescript" title="Typescript" align="center" height="30" /></a> <br>

<!-- BACK END -->
<a href="#"><img src="./assets/express-logo-color.png" alt="Express" title="Express" align="center" height="30" /></a> <br>
<a href="#"><img src="./assets/node-logo-color.png" alt="Node.js" title="Node.js" align="center" height="30" /></a> <br>
<a href="#"><img src="./assets/mongodb-logo-color.png" alt="MongoDB" title="MongoDB" align="center" height="30" /></a> <br>
<a href="#"><img src="./assets/docker-logo-color.png" alt="Docker" title="Docker" align="center" height="30" /></a> <br>
<a href="#"><img src="./assets/jest-logo-color.png" alt="Jest" title="Jest" align="center" height="30" /></a> <br>
<a href="#"><img src="./assets/webpack-logo-color.png" alt="Webpack" title="Webpack" align="center" height="30" /></a> <br>
<a href="#"><img src="./assets/aws-logo-color.png" alt="AWS" title="AWS" align="center" height="30" /></a> <br>


### How To Contribute 
Nimbus is an open-source product supported by the tech accelerator OS Labs. We welcome and appreciate contributions from the community. If you are interested in contributing to the development of our AWS serverless component monitoring and visualization tool, here are a few ways to get started:

1. <b> Fork the repository: </b> Go to the <a href="https://github.com/oslabs-beta/nimbus"> main repository </a> on GitHub and click the ???Fork??? button to create a copy of the code under your own account. This will allow you to make changes to the code without affecting the original repository.
2. <b> Set up your development environment: </b> Follow the instructions in the README file to set up your local development environment. This will typically involve installing dependencies, setting up a local development server, and configuring any necessary secrets or API keys.
3. <b> Choose an issue to work on: </b> Browse the <a href="https://github.com/oslabs-beta/nimbus/issues"> open issues </a> in the repository and pick one that interests you. Alternatively, you can also propose your own changes by opening a new issue and describing the feature or improvement you would like to see.
4. <b> Create a branch: </b> Once you have chosen an issue to work on, create a new branch in your fork of the repository. Name the branch something descriptive, such as ???add-feature-x??? or ???fix-bug-y???. This will allow you to work on your changes without affecting the main branch of the repository.
5. <b>  Make your changes: </b> Make the necessary changes to the code in your branch. Be sure to follow the repository???s style guidelines and best practices, and make sure to test your changes thoroughly before submitting them.
6. <b> Commit and push your changes: </b> Once you are satisfied with your changes, commit them to your branch and push them to your fork of the repository.
7. <b> Open a pull request: </b> Go to the main repository on GitHub and click the ???Compare & pull request??? button. Describe the changes you have made and why they are necessary. Then, submit the pull request for review.

A member of the repository???s maintainer team will review your pull request and either merge it into the codebase or provide feedback for changes that need to be made. Thank you for considering contributing to our project!


### License
Distributed under the MIT License

### Meet The Team
* Madeline Doctor - <a href="https://www.linkedin.com/in/madeline-doctor/" target="_blank"> LinkedIn </a> | <a href="https://github.com/madelinedoctor1"> GitHub </a>

* Arturo Kim -  <a href="https://www.linkedin.com/in/arturokim/" target="_blank"> LinkedIn </a> | 
<a href="https://github.com/arturokim"> GitHub </a>

* Georges Maroun -  <a href="https://www.linkedin.com/in/georges-m/" target="_blank"> LinkedIn </a> | <a href="https://github.com/george-maroun"> GitHub </a>

* Arthur Su -  <a href="https://www.linkedin.com/in/arthursu/" target="_blank"> LinkedIn </a> | 
<a href="https://github.com/suster22"> GitHub </a>

* Zhaowei Sun -  <a href="https://www.linkedin.com/in/zhaowei-sun/" target="_blank"> LinkedIn </a> | 
<a href="https://github.com/zhaowei-sun"> GitHub </a>


