import { BaseNetworkRepo } from "./BaseNetworkRepo";
import { UpcomingMoviesResponse } from "../models/UpcomingMoviesResponse";

export class MovieAPIClient extends BaseNetworkRepo {
    constructor(baseURL: string = 'https://api.themoviedb.org/3') {
      super(baseURL);
    }

    async getUpcomingMovies(): Promise<UpcomingMoviesResponse> {
        const response = await this.get<UpcomingMoviesResponse>(`/movie/upcoming`);
        return response;
    }
}