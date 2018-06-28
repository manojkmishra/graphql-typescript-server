import * as rp from "request-promise";

export class TestClient 
{ url: string;
  options: { jar: any;  withCredentials: boolean;  json: boolean; };
  constructor(url: string) 
    { this.url = url;
      this.options = {  withCredentials: true,  jar: rp.jar(),  json: true  };  // rp.jar has all the cookies stored
    }
  async register(email: string, password: string) 
   {  return rp.post(this.url, 
          { ...this.options, 
            body: {  query: ` mutation { register(email: "${email}", password: "${password}") { path message } }` }
          });
   }

  async logout() 
   { return rp.post(this.url, {...this.options,  body: {  query: `mutation {  logout  }`  }   }); }

  async me() 
   { return rp.post(this.url, {  ...this.options, body: {  query: `{   me {  id   email  } }`   }    }); }

  async login(email: string, password: string) 
   {    return rp.post(this.url, {  ...this.options,
                                   body: {  query: `mutation { login(email: "${email}", password: "${password}") {  path  message}  }` }
                                });
   }
}