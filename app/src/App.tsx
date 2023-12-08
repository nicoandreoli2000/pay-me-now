import { useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  const { data } = useQuery({
    queryKey: ["PAYMENTS"],
    queryFn: () =>
      fetch("http://localhost:3000/payments").then((data) =>
        data.json()
      ) as Promise<
        {
          name: string;
          amount: number;
        }[]
      >,
  });

  if (!data) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <ul>
      {data.map((payment) => (
        <li key={payment.name}>
          {payment.name} - {payment.amount}
        </li>
      ))}
    </ul>
  );
}

export default App;
