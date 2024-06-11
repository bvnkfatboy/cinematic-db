import { DataService } from '@/config/dataService';

export const fetchTvShow = async (page: number) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/tv/popular?language=en-US&page=${page}`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchMovie = async (type: string, page: number) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${page}`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchTrending = async (time: string) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/trending/all/${time}?language=en-US`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchDetail = async (mediaType: string, movieId: number) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/${mediaType}/${movieId}?language=en-US`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchPopular = async (mediaType: string) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/${mediaType}/popular?language=en-US`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchSearch = async (mediaType: string, query: string) => {
  try {
    const { data } = await DataService.get(
      `https://api.themoviedb.org/3/search/${mediaType}?query=${query}&language=en-US&include_adult=true`,
    );
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
