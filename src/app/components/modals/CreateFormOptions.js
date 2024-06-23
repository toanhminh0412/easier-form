import { useState } from 'react'
import { Radio, RadioGroup } from '@headlessui/react'

const options = [
    { 
        id: 'scratch',
        name: 'Create from scratch',
        description: 'Start from scratch, use your creativity and build your own personal and customized form. Publish for others to use as you wish!',
    },
    {
        id: 'template',
        name: 'Use prebuilt templates (Coming soon!)',
        description: 'Use one of our prebuilt professional form templates customized to your specific need so you can start collecting answers with as little effort as possible!',
        disabled: true
    },
    {
        id: 'json',
        name: 'Import a JSON file',
        description: "Import a JSON file that you've exported from another form to create the exact same form."
    }
]

// Remove falsey values from class names
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CreateFormOptions({ selectedOption, setSelectedOption }) {
    // const [selected, setSelected] = useState(options[0])

  return (
        <fieldset aria-label="Server size">
            <RadioGroup value={selectedOption} onChange={setSelectedOption} className="space-y-4">
                {options.map((option) => (
                <Radio
                    key={option.id}
                    value={option.id}
                    aria-label={option.name}
                    aria-description={option.description}
                    data-checked={option.id === selectedOption}
                    autoFocus={option.id === selectedOption}
                    disabled={option.disabled}
                    className={({ focus, disabled }) =>
                    classNames(
                        focus ? 'border-white ring-2 ring-white' : '',
                        !focus ? 'border-primary' : '',
                        'relative block cursor-pointer rounded-lg border bg-primary px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between',
                        disabled ? 'opacity-50 cursor-not-allowed' : '',
                    )
                    }
                >
                    {({ checked, focus }) => (
                    <>
                        <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                                <span className="font-medium text-white">{option.name}</span>
                                <span className="text-gray-300 mt-2">
                                    {option.description}
                                </span>
                            </span>
                        </span>
                        <span
                        className={classNames(
                            checked ? 'border-white' : 'border-transparent',
                            focus ? 'border' : 'border-2',
                            'pointer-events-none absolute -inset-px rounded-lg',
                        )}
                        aria-hidden="true"
                        />
                    </>
                    )}
                </Radio>
                ))}
            </RadioGroup>
        </fieldset>
    )
}
