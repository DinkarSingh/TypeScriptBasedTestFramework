const shared = {
    CSZoningNameForToolBox: 'Dont_Delete',
  };
  
  const production = {
    // CSEmail: getProdCredentials().AUTO_PROD_UNAME,
    // CSPassword: getProdCredentials().AUTO_PROD_PASS,
    JellycoreEmail: 'd.karanvanshi',
    JellycorePassword: '123',
  };
  
  const preprod = {
    JellycoreEmail: 'd.karanvanshi',
    JellycorePassword: '123',
  };
  
  const generateConfig = () => {
    const environment = process.env.ENV === 'prod' ? production : preprod;
  
    return {
      ...shared,
      ...environment
    };
  };
  export const jellyCoreConfig = generateConfig();
  
  /**
   * Get production credentials from local file/external file
   */
  function getProdCredentials() {
  
    // Check if login credentials exists on environment vars
    if(process.env.ENV !== 'prod'){
      return {
        AUTO_PROD_UNAME: undefined,
        AUTO_PROD_PASS: undefined
      }
    } else if (process.env.CREDS_USR === undefined && process.env.CREDS_PSW === undefined) {
  
      // Check if local path file exist on environment vars
      if (process.env.CREDS_LOCAL_PATH === undefined) {
  
        throw new Error(`Local path is undefined`);
      } else {
  
        const localFile = require('fs');
        //import fs from 'fs';
  
        // Check if file exist
        if (localFile.existsSync(process.env.CREDS_LOCAL_PATH)) {
  
          // Read the file
          const credsObj = require(process.env.CREDS_LOCAL_PATH);
  
          return credsObj;
        } else {
          throw new Error(`Local file is not exist`);
        }
      }
    } else {
      // Get login credentials from environment vars
      const credsObj = {
        AUTO_PROD_UNAME: process.env.CREDS_USR,
        AUTO_PROD_PASS: process.env.CREDS_PSW
      }
  
      return credsObj;
    }
  }
  