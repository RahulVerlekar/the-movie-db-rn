export interface GenreListResponse {
    page: number;
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}
