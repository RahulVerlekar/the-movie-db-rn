import { BaseNetworkRepo } from "./BaseNetworkRepo";
import { UpcomingMoviesResponse } from "../models/UpcomingMoviesResponse";
import { Genre, GenreListResponse } from "../models/GenreListResponse";
import { MovieDetailsResponse } from "../models/MovieDetailsResponse";

export class MovieAPIClient extends BaseNetworkRepo {
    constructor(baseURL: string = 'https://api.themoviedb.org/3') {
      super(baseURL);
    }

    async getUpcomingMovies(): Promise<UpcomingMoviesResponse> {
        const response = await this.get<UpcomingMoviesResponse>(`/movie/upcoming`);
        return response;
    }

    async getGenreList(): Promise<Genre[]> {
        const response = await this.get<GenreListResponse>(`/genre/movie/list`);
        return response.genres;
    }

    async getMovieForGenre(genreId: number): Promise<UpcomingMoviesResponse> {
        const response = await this.get<UpcomingMoviesResponse>(`/discover/movie?with_genres=${genreId}`);
        return response;
    }

    async getMovieDetails(movieId: number): Promise<MovieDetailsResponse> {
        const response = await this.get<MovieDetailsResponse>(`/movie/${movieId}`);
        return response;
    }

    async searchMovie(query: string): Promise<UpcomingMoviesResponse> {
        const response = await this.get<UpcomingMoviesResponse>(`/search/movie?query=${query}`);
        return response;
    }
}