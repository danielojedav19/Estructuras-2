export default function SearchBar({onFilter}){
    const handleChange = (e) => {
        onFilter(e.target.value);
    };
    return(
        <input
        type="text"
        placeholder="Buscar por titulo.."
        onChange={handleChange}
        />
    );
}