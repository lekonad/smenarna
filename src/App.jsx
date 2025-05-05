import { useState , useEffect} from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState(1)
  const [currency, setCurrency] = useState('USD')
  const [rates, setRates] = useState({})
  const [result, setResult] = useState('')

  useEffect(() => {
    fetch('https://api.frankfurter.app/latest')
    .then(res => res.json())
    .then(data => setRates(data.rates))
    .catch(console.error);

  },[])

  const handleConvert = () => {
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&to=${currency}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency];
      setResult(`${amount} EUR = ${rate.toFixed(2)} ${currency}`);

    })
    .catch(console.error)
  }

  return (
    <>
      <div>
        <h1>Prevodnik men</h1>
        <div>
          <input
            type='number'
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder='Castka v OJRECH'
          />
          <select 
            value={currency}
            onChange={e => setCurrency(e.target.value)}
          >
          {Object.keys(rates).map(cur =>
            <option key={cur} value={cur}>{cur}</option>
          )}
          </select>
          <button onClick={handleConvert}>Preved</button>
          <div>
            {result && <div className='result'>{result}</div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
