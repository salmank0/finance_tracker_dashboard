import { Listbox } from "@headlessui/react";

export default function Select({ label, options, selectedOption, onChange }) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <Listbox value={selectedOption} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full px-4 py-2 border rounded-md bg-background text-foreground border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
            {selectedOption
              ? options.find((opt) => opt.value === selectedOption).label
              : "Select..."}
          </Listbox.Button>
          <Listbox.Options className="absolute w-full mt-1 bg-background border border-gray-300 rounded-md shadow-lg">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white"
              >
                {option.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
