import "./SearchBar.css";
import { BiSearch } from "react-icons/bi";

export default function SearchBar() {

    return (
        <div className="search-container">
            <input type="text" placeholder="Buscar tarefa..." className="search-input"></input>
            <BiSearch size={24} className="search-icon"></BiSearch>
        </div>
    )
}