import PropTypes from 'prop-types';

const CharCard = ({ name, thumbnail, id, onCharacterId, selectCharId }) => {


    return (
        <li
            onClick={() => onCharacterId(id)}
            tabIndex={0}
            onKeyPress={(e) => (e.key === "Enter") ? onCharacterId(id) : null}
            className={selectCharId === id ? "char__item char__item_selected" : "char__item"}>
            <img
                style={thumbnail.includes('not_available') ? { objectFit: "contain" } : { objectFit: "cover" }}
                src={thumbnail}
                alt="abyss" />
            <div className="char__name">{name}</div>
        </li>
    )
}

// check prop types
CharCard.propTypes = {
    onCharacterId: PropTypes.func
};
export default CharCard;


