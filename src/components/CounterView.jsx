import { useSelector } from "react-redux";

export default function CounterView() {
  const count = useSelector((state) => state.counter.count);

  return (
    <div className="card">
      <h2>Valor actual del contador</h2>
      <p style={{ fontSize: "22px", fontWeight: "bold" }}>{count}</p>
    </div>
  );
}
