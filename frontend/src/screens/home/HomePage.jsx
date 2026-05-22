import './HomePage.css';
import TopBar from "../../components/TopBar/TopBar.jsx";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";

export default function HomePage() {
    return (
        <div className="home-bg">
            <TopBar />
            <div className="search-position">
                <SearchBar />
            </div>
        </div>
    )
}