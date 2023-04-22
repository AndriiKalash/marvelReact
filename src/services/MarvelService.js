import { useHttp } from '../hooks/http.hook'


const useMarvelService = () => {

    const { request, loading, error, clearError, process, setProcess } = useHttp();
    // no change variables
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=eb03c9fffbbe36368c9ec0aa6013a804';

    const getAllCharacters = async (offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformDataCharacter);
    }

    const getAllComics = async (offset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformDataComics);
    }

    const getOneCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformDataCharacter(res.data.results[0]);
    }

    const getOneCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformDataCharacter)
    }

    const getOneComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformDataComics(res.data.results[0]);
    }

    //отфильтрованный обьект уже для стейта
    const _transformDataCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 243)}...` : 'description not found',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformDataComics = (obj) => {
        return {
            id: obj.id,
            name: obj.title,
            thumbnail: obj.thumbnail.path + '.' + obj.thumbnail.extension,
            lang: obj.textObjects.language || 'en-us',
            description: obj.description || 'There is no description',
            pages: obj.pageCount ? `${obj.pageCount} p.` : 'No information about the number of pages',
            price: obj.prices[0].price ? `${obj.prices[0].price}$` : 'not available'
        }
    }

    return {
        loading,
        error,
        process,
        setProcess,
        getAllCharacters,
        getOneCharacter,
        getOneCharacterByName,
        getAllComics,
        getOneComics,
        clearError
    }
}

export default useMarvelService;






