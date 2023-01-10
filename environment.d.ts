declare global {
    namespace NodeJS {
      interface ProcessEnv {
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_KEY: string;
      }
    }
  }

declare module "*.png" {
  export default "" as string;
}
declare module "*.svg" {
  export default "" as string;
}
declare module "*.jpeg" {
  export default "" as string;
}
declare module "*.jpg" {
  export default "" as string;
}


export {}