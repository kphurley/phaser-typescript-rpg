import axios, {AxiosInstance, AxiosPromise} from 'axios';

export class ApiProvider<T> {
  private url: string;
  private http: AxiosInstance;

  constructor(url: string) {
    this.url = url;
    this.http = axios.create({
      url,
      baseURL: 'http://localhost:4000/api',
      headers: {'Content-Type': 'application/json'}
    });
  }

  login(token: string) {
    this.http.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  logout() {
    this.http.defaults.headers.common.Authorization = '';
  }

  getAll(): AxiosPromise<T> {
    return this.http.get(`${this.url}`);
  }

  get(id: number): AxiosPromise<T> {
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
