"use client";

import { useState, useEffect } from "react";

export default function MultipleChoicesGrid({ item, value=null, readOnly=false }) {
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (value !== null) {
            setSelected(value);
        } else {
            setSelected(item.rows.map(row => {
                return {
                    row: row.text,
                    cols: []
                }
            }));
        }
    }, [value]);

    const handleChange = (e) => {
        const rowText = e.target.getAttribute("rowvalue");
        const colText = e.target.getAttribute("colvalue");
        setSelected(oldSelected => {
            const newSelected = oldSelected.map(v => {
                if (v.row === rowText) {
                    if (e.target.checked) {
                        return { row: rowText, cols: [...v.cols, colText] };
                    } else {
                        return { row: rowText, cols: v.cols.filter(c => c !== colText) };
                    }
                }
                return v;
            });
            return newSelected;
        });
    }

    // Get all selected cols for each row
    const getRowValues = (rowText) => {
        if (selected === null) return [];
        const rowValObj = selected.find(v => v.row === rowText);
        return rowValObj ? rowValObj.cols : [];
    }

    // A table where each cell is a checkbox
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
                                                type="checkbox"
                                                name={`${item.i}-${row.id}`}
                                                id={`${item.i}-${row.id}-${col.id}`}
                                                rowvalue={row.text}
                                                colvalue={col.text}
                                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                checked={getRowValues(row.text).includes(col.text)}
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
    )
}