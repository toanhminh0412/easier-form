import { useState } from "react";

export default function SingleChoiceGrid({ item }) {
    const [label, setLabel] = useState(item.label);
    const [description, setDescription] = useState(item.description);
    const [cols, setCols] = useState(item.cols);
    const [rows, setRows] = useState(item.rows);

    // Build a table where each cell is a radio button
    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="mt-2">
                <table className="max-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {description}
                            </th>
                            {cols.map((col, index) => (
                                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {rows.map((row, index) => (
                            <tr key={index}>
                                <th scope="row" className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                                    {row}
                                </th>
                                {cols.map((col, index) => (
                                    <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="w-full text-center">
                                            <input
                                                type="radio"
                                                name={`${item.i}-${row}`}
                                                id={`${item.i}-${row}-${col}`}
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            />
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
