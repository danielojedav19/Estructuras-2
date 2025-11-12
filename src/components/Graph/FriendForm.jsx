import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../../store/slices/graphSlice";
import { persistGraph } from "../../store/thunks/graphThunks";

export default function FriendForm() {
  const persons = useSelector(s => s.graph.persons);
  const dispatch = useDispatch();
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!a || !b || a === b) return;
    dispatch(addFriend({ a, b }));
    dispatch(persistGraph());
    setA(""); setB("");
  };

  if (!persons.length) {
    return <p style={{opacity:.8}}>Agrega personas para poder crear amistades.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="vstack">
      <div className="small-grid">
        <div className="vstack">
          <label className="label">Persona A</label>
          <select className="input" value={a} onChange={(e)=>setA(e.target.value)}>
            <option value="">Selecciona...</option>
            {persons.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="vstack">
          <label className="label">Persona B</label>
          <select className="input" value={b} onChange={(e)=>setB(e.target.value)}>
            <option value="">Selecciona...</option>
            {persons.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>
      <button className="button" type="submit" disabled={!a || !b || a===b}>Crear amistad</button>
    </form>
  );
}
