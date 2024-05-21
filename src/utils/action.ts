import { DataService } from '@/config/dataService';

export const fetchTvShow = async (page: number) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/tv/popular?language=th-TH&page=${page}`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchMovie = async (type: string, page: number) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/${type}/popular?language=th-TH&page=${page}`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchTrending = async (time: string) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/trending/all/${time}?language=th-TH`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchDetail = async (mediaType: string, movieId: number) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/${mediaType}/${movieId}?language=th-TH`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const fetchPopular = async (mediaType: string) => {
  try {
    const { data } = await DataService.get(`https://api.themoviedb.org/3/${mediaType}/popular?language=th-TH`);
    return data;
  } catch (error) {
    console.log('error', error);
  }
};
