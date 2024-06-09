import axios, { AxiosInstance } from 'axios';

// the amount of entities the API returns
export const GET_MANY_SIZE = 20;
class ApiService<TDto, TExtendedDto, TCreateDto, TUpdateDto, TFilters> {
    private axiosInstance: AxiosInstance;
    private endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.axiosInstance = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
            withCredentials: true
        });
    }

    private jsonToUrlQueryParams = (obj: any) => {
        let result = "?";
        const entries = Object.entries(obj);

        for (let index = 0; index < entries.length; index++) {
            const [key, value] = entries[index];
            if (value === undefined) {
                continue;
            }

            if (Array.isArray(value)) {
                const a = value as unknown as Array<any>;
                a.forEach((e) => {
                    result = result.concat(`&${key}=${e}`);
                });
            } else {
                result = result.concat(`&${key}=${value}`);
            }
        }

        return result;
    }

    public getMany = async (cursor?: number, filters?: TFilters): Promise<TDto[]> => {
        const path = this.jsonToUrlQueryParams({ cursor: cursor, ...filters });
        const response = await this.axiosInstance.get<TDto[]>(`${this.endpoint}/${path}`);
        return response.data;
    }

    public get = async (id: number): Promise<TExtendedDto> => {
        const response = await this.axiosInstance.get<TExtendedDto>(`${this.endpoint}/${id}`);
        return response.data;
    }

    public create = async (data: TCreateDto): Promise<TDto> => {
        const response = await this.axiosInstance.post<TDto>(this.endpoint, data);
        return response.data;
    }

    public update = async (id: number, data: TUpdateDto): Promise<TDto> => {
        const response = await this.axiosInstance.put<TDto>(`${this.endpoint}/${id}`, data);
        return response.data;
    }

    public delete = async (id: number): Promise<TDto> => {
        const response = await this.axiosInstance.delete<TDto>(`${this.endpoint}/${id}`);
        return response.data;
    }
}

export default ApiService;