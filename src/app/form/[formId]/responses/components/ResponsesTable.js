import { useMemo } from 'react';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { convertResponsesToAgGridTable } from '@/helpers/responses';

export default function ResponsesTable({ form, responses }) {
    const { rows, cols } = convertResponsesToAgGridTable(form, responses);

    // Apply settings across all columns
    const defaultColDef = useMemo(() => ({
        filter: true, // Enable filtering on all columns,
        editable: true // Enable editing on all columns
    }))

    return (
    // wrapping container with theme & size
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 500 }} // the grid will fill the size of the parent container
        >
        <AgGridReact
            defaultColDef={defaultColDef}
            rowData={rows}
            columnDefs={cols}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
        />
        </div>
    )
}