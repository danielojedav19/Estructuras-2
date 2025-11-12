import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPerson } from "../../store/slices/graphSlice";
import { persistGraph } from "../../store/thunks/graphThunks";

export default function PersonForm() {
  const cities = useSelector(s => s.graph.cities);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [cityId, setCityId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const n = name.trim();
    const a = parseInt(age, 10);
    if (!n || !a || a <= 0 || !cityId) return;
    dispatch(addPerson({ name: n, age: a, cityId }));
    dispatch(persistGraph());
    setName(""); setAge(""); setCityId("");
  };

  return (
    <form onSubmit={onSubmit} className="vstack">
      <div className="small-grid">
        <div className="vstack">
          <label className="label">Nombre</label>
          <input className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Alice" />
        </div>
        <div className="vstack">
          <label className="label">Edad</label>
          <input className="input" type="number" min="1" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="20" />
        </div>
      </div>
      <label className="label">Ciudad</label>
      <select className="input" value={cityId} onChange={(e)=>setCityId(e.target.value)}>
        <option value="">Selecciona...</option>
        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <button className="button" type="submit" disabled={!cities.length}>Crear persona</button>
    </form>
  );
}
