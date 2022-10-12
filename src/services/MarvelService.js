class MarvelService {

    // no change variables
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=eb03c9fffbbe36368c9ec0aa6013a804';
    _offset = 210;

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`)
        }

        return await res.json();
    };

    getAllCharacters = async (offset = this._offset) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        // массив с лишними данными :
        // return res.data.results;
        return res.data.results.map(this._transformDataCharacter);
    }



    getOneCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformDataCharacter(res.data.results[0]);

    }

    //отфильтрованный обьект уже для стейта
    _transformDataCharacter = (char) => {
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
}

export default MarvelService;





