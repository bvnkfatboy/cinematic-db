import axios from 'axios';

const authHeader = () => ({
  Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzc5OTgzYzFlNjQ3ZTk4ODk3YjdhZWJiOGEzOGE4NiIsInN1YiI6IjY2M2UzMmUzODQyZjg2NzZkMmE0OTE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.808yyuBschl2mU_Wjf0asONzKJuxrYOtYPIJ9LOc-dw`,
});

const client = axios.create({
  baseURL: process.env.API,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzc5OTgzYzFlNjQ3ZTk4ODk3YjdhZWJiOGEzOGE4NiIsInN1YiI6IjY2M2UzMmUzODQyZjg2NzZkMmE0OTE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.808yyuBschl2mU_Wjf0asONzKJuxrYOtYPIJ9LOc-dw`,
    'Content-Type': 'application/json',
    isCancelApi: false,
  },
});

class DataService {
  static get(path = '') {
    return client({
      method: 'GET',
      url: path,
      headers: { ...authHeader() },
    });
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static del(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'DELETE',
      url: path,
      data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data: JSON.stringify(data),
      headers: { ...authHeader() },
    });
  }

  static put(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'PUT',
      url: path,
      data: data,
      headers: { ...authHeader(), ...optionalHeader },
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
const abortController: { [key: string]: AbortController } = {};
client.interceptors.request.use((config) => {
  if (config.headers.isCancelApi) {
    abortController[config.url!]?.abort();
  }
  if (!abortController[config.url!] || abortController[config.url!].signal.aborted) {
    abortController[config.url!] = new AbortController();
  }
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig = config;
  const { headers }: any = config;
  requestConfig.signal = abortController[config.url!].signal;
  requestConfig.headers = {
    ...headers,
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzc5OTgzYzFlNjQ3ZTk4ODk3YjdhZWJiOGEzOGE4NiIsInN1YiI6IjY2M2UzMmUzODQyZjg2NzZkMmE0OTE0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.808yyuBschl2mU_Wjf0asONzKJuxrYOtYPIJ9LOc-dw`,
  };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => {
    delete abortController[response.config.url!];
    return response;
  },
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    let { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        // do something here
      } else {
        // return originalRequest;
      }
    } else {
      response = { message: 'ไม่สามารถเชื่อมต่อกับ Server ได้' };
    }
    return Promise.reject(response);
  },
);

export { DataService };
