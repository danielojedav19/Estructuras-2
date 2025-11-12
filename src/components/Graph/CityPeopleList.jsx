import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

export default function CityPeopleList() {
  const { cities, persons } = useSelector(s => s.graph);
  const [cityId, setCityId] = useState("");

  const people = useMemo(
    () => persons.filter(p => p.cityId === cityId),
    [persons, cityId]
  );

  return (
    <div className="vstack">
      <label className="label">Selecciona ciudad</label>
      <select className="input" value={cityId} onChange={(e)=>setCityId(e.target.value)}>
        <option value="">—</option>
        {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      {!cityId && <p style={{opacity:.8}}>Elige una ciudad para ver sus habitantes.</p>}
      {cityId && (
        <ul>
          {people.length === 0 && <li>No hay personas en esta ciudad.</li>}
          {people.map(p => <li key={p.id}>{p.name} — {p.age} años</li>)}
        </ul>
      )}
    </div>
  );
}
