import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig} from 'axios';

export class ApiProvider<T> {
  private url: string;
  private http: AxiosInstance;

  constructor(url: string) {
    this.url = url;

    const axiosConfig: AxiosRequestConfig = {
      url,
      baseURL: 'http://localhost:4000/api',
      headers: {}
    };

    const token = localStorage.getItem('jwt');
    if (token) {
      axiosConfig.headers = {'Authorization': `Bearer ${token}`};
    }

    this.http = axios.create(axiosConfig);
  }

  setAuthHeader(token: string) {
    this.http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  clearAuthHeader() {
    this.http.defaults.headers.common.Authorization = '';
  }

  getAll(): AxiosPromise<T> {
    return this.http.get(`${this.url}`);
  }

  get(): AxiosPromise<T> {
    return this.http.get(`${this.url}`);
  }

  getById(id: number): AxiosPromise<T> {
    return this.http.get(`${this.url}/${id}`);
  }

  create(data: T): AxiosPromise<T> {
    return this.http.post(this.url, data);
  }

  update(id: number, data: T): AxiosPromise<T> {
    return this.http.patch(`${this.url}/${id}`, data);
  }

  destroy(id: number): AxiosPromise<T> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
