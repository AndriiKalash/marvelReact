import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {

    const { request, loading, error, clearError } = useHttp();

    // no change variables
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=eb03c9fffbbe36368c9ec0aa6013a804';
    const _offset = 210;

    // getResource = async (url) => {
    //     let res = await fetch(url);
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status ${res.status}`)
    //     }

    //     return await res.json();
    // };

    const getAllCharacters = async (offset = _offset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        // массив с лишними данными :
        // return res.data.results;
        return res.data.results.map(_transformDataCharacter);
    }



    const getOneCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformDataCharacter(res.data.results[0]);

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

    return { loading, error, getAllCharacters, getOneCharacter, clearError }
}

export default useMarvelService;





