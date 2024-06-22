import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

import { convertResponsesToAgGridTable } from '@/helpers/form';

export default function ResponsesTable({ form, responses }) {
    const { rows, cols } = convertResponsesToAgGridTable(form, responses);
    console.log(rows);
    console.log(cols);

    return (
    // wrapping container with theme & size
        <div
            className="ag-theme-quartz" // applying the grid theme
            style={{ height: 500 }} // the grid will fill the size of the parent container
        >
        <AgGridReact
            rowData={rows}
            columnDefs={cols}
        />
        </div>
    )
}