"use client";

import { useState, useEffect } from "react";

export default function SingleChoiceGrid({ item, value=null, readOnly=false }) {
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (value !== null) {
            setSelected(value);
        } else {
            // Set all row values to empty
            const newSelected = item.rows.map(row => ({ row: row.text, col: "" }));
            setSelected(newSelected);
        }
    }, [value]);

    // Get the selected col for a row
    const getRowValue = (rowText) => {
        if (selected === null) return null;
        const rowValObj = selected.find(v => v.row === rowText);
        return rowValObj ? rowValObj.col : null;
    }

    const handleChange = (e) => {
        const row = e.target.getAttribute("rowvalue");
        const col = e.target.getAttribute("colvalue");
        setSelected(oldSelected => {
            const newSelected = oldSelected.map(v => {
                if (v.row === row) {
                    return { row, col };
                }
                return v;
            });
            return newSelected;
        });
    }

    if (!selected) {
        return <p>Loading grid ...</p>
    }
    
    // A table where each cell is a radio button
    return (
        <div>
            <label htmlFor={item.i} className="block text-sm font-medium leading-6 text-gray-900">
                {item.label}
            </label>
            <div className="mt-2">
                <table className="max-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {item.description}
                            </th>
                            {item.cols.map(col => (
                                <th key={col.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {col.text}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {item.rows.map(row => (
                            <tr key={row.id}>
                                <th scope="row" className="px-6 py-3 text-left text-sm font-medium text-gray-900">
                                    {row.text}
                                </th>
                                {item.cols.map(col => (
                                    <td key={col.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="w-full text-center">
                                            <input
                                                type="radio"
                                                name={`${item.i}-${row.id}`}
                                                id={`${item.i}-${row.id}-${col.id}`}
                                                rowvalue={row.text}
                                                colvalue={col.text}
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                checked={col.text === getRowValue(row.text)}
                                                disabled={readOnly}
                                                onChange={handleChange}
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
