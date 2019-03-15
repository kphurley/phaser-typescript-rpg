import axios, {AxiosInstance, AxiosPromise} from 'axios';

export interface Session {
  jwt: string;
  user_id: number;
}

// This is a special case because we're accepting custom input
class SessionProvider {
  private url: string;
  private http: AxiosInstance;

  constructor(url: string) {
    this.url = url;
    this.http = axios.create({url, baseURL: 'http://localhost:4000/api'});
  }

  create(data: {email: string, password: string}): AxiosPromise<Session> {
    return this.http.post(this.url, data);
  }
}

export const sessionApi = new SessionProvider('/sessions');