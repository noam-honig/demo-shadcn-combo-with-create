import { useEffect, useState } from 'react'
import { ComboboxDemo } from './components/combobox-demo.tsx'
import { City } from './model/city.ts'
import { repo } from 'remult'

function App() {
  const [value, setValue] = useState('')
  const [cities, setCities] = useState<City[]>([])
  useEffect(() => {
    repo(City).find().then(setCities)
  }, [])
  return (
    <div className="flex space-x-2 p-4">
      <ComboboxDemo
        options={cities}
        value={value}
        setValue={setValue}
        caption={'city'}
        onAdd={async (name) => {
          const city = await repo(City).insert({ name })
          setCities((cities) => [...(cities ?? []), city])
          return city
        }}
      />
    </div>
  )
}

export default App
