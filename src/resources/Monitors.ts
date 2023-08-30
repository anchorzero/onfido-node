import { AxiosInstance } from "axios";
import { Method, Resource } from "../Resource";

export type Monitor = {
  id: string;
  applicantId: string;
  reportName: string;
  createdAt: string;
  deletedAt?: string | null;
  sandbox: boolean;
  tags: Array<string>;
};

export type MonitorRequest = {   
  applicantId: string;
  reportName: string;
  tags?: Array<string>;
}

export type MonitorListRequest = {
  applicantId?: string;
  includeDeleted?: boolean;
}

export class Monitors extends Resource<MonitorRequest> {
  constructor(axiosInstance: AxiosInstance) {
    super("watchlist_monitors", axiosInstance);
  }

  public create(monitorRequest: MonitorRequest): Promise<Monitor> {
    return this.request({ method: Method.POST, body: monitorRequest });
  }

  public find(id: string): Promise<Monitor> {
    return this.request({ method: Method.GET, path: id });
  }

  public async list(queryParams?: MonitorListRequest): Promise<Monitor[]> {
    const { monitors } = await this.request({
      method: Method.GET,
      query: queryParams,
    });
    return monitors;
  }

  public async delete(id: string): Promise<void> {
    await this.request({ method: Method.DELETE, path: id });
  }
}
