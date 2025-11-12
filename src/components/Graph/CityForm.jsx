import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCity } from "../../store/slices/graphSlice";
import { persistGraph } from "../../store/thunks/graphThunks";

export default function CityForm() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const n = name.trim();
    if (!n) return;
    dispatch(addCity(n));
    dispatch(persistGraph());
    setName("");
  };

  return (
    <form onSubmit={onSubmit} className="vstack">
      <label className="label">Nombre de la ciudad</label>
      <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Cali" />
      <button className="button" type="submit">Crear ciudad</button>
    </form>
  );
}
