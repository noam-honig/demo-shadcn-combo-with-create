import { useEffect, useState } from 'react'
import { ComboboxDemo } from './components/combobox-demo.tsx'
import { City } from './model/city.ts'
import { repo } from 'remult'
import CreatableSelect from 'react-select/creatable'

function App() {
  const [value, setValue] = useState<City>()
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
      <CreatableSelect
        isClearable
        options={cities.map((city) => ({ value: city, label: city.name }))}
        onChange={(selectedOption) => setValue(selectedOption?.value)}
        value={{ value, label: value?.name }}
        onCreateOption={async (name) => {
          const newCity = await repo(City).insert({ name })
          setCities((cities) => [...(cities ?? []), newCity])
          setValue(newCity)
        }}
      />

      {value && <h3>Selected {value?.name}</h3>}
    </div>
  )
}

export default App
