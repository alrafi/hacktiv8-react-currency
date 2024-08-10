import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    getData();
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  const getData = async () => {
    const res = await fetch(
      "https://api.currencyfreaks.com/v2.0/rates/latest?base=usd&symbols=idr,cad,jpy,chf,eur&apikey=865f955d09514865bd2db60283385b0c"
    );
    const _data = await res.json();
    const _rates = Object.entries(_data.rates);
    setData(_rates);

    // we buy + 0.02%
    // we sell - 0.02%
  };
  return (
    <div className="px-16 py-8 bg-[#ef6d38] text-white">
      <p className="text-3xl mb-16">Hacktiv8 - React Currency</p>

      <p className="">Waktu sekarang: {date.toLocaleTimeString()}</p>
      <p className="">Base: USD</p>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-lg text-white uppercase font-medium">
            <tr className=" border-b ">
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                We Buy
              </th>
              <th scope="col" className="px-6 py-3">
                Exchange Rate
              </th>
              <th scope="col" className="px-6 py-3">
                We Sell
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((rate) => {
              return (
                <tr key={rate[0]} className="border-b border-[#f7bd9d]">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap "
                  >
                    {rate[0]}
                  </th>
                  <td className="px-6 py-4">{parseFloat(rate[1]) * 1.02}</td>
                  <td className="px-6 py-4">{rate[1]}</td>
                  <td className="px-6 py-4">{parseFloat(rate[1]) * 0.98}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
