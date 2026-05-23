import "./SearchBar.css";
import { BiSearch } from "react-icons/bi";

export default function SearchBar({ search, handleChangeSearch }) {

    return (
        <div className="search-container">
            <input type="text" placeholder="Buscar tarefa..." className="search-input" value={search} onChange={handleChangeSearch} />
            <BiSearch size={24} className="search-icon" />
        </div>
    )
}