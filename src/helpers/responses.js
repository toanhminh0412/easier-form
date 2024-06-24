"use client";

/* Read a form's response
    * 
    * @param {String} form - A form object
    * @returns {Object} - A response's data object
*/

const readResponseData = (form) => {
    const responseData = [];
    for (const item of form.layout.lg) {
        let value = null;
        const label = item.label ? item.label : item.description ? item.description : item.placeholder;
        switch (item.type) {
            case "short-text":
            case "long-text":
            case "number":
            case "password":
            case "email":
            case "phone":
            case "address":
            case "zip-code":
            case "website":
            case "date":
            case "time":
            case "date-time":
            case "dropdown":
                value = document.getElementById(item.i).value;
                responseData.push({ id: item.i, label: label, type: item.type, value: value });
                continue;
            case "checkbox":
            case "toggle":
                value = document.getElementById(item.i).checked;
                responseData.push({ id: item.i, label: label, type: item.type, value: value });
                continue;
            case "radio":
                const selectedInput = document.querySelector(`input[name="${item.i}"]:checked`);
                if (selectedInput) {
                    value = selectedInput.value;
                }
                responseData.push({ id: item.i, label: label, type: item.type, value: value });
                continue;
            case "multiple-choices":
                value = [];
                for (const option of item.options) {
                    if (document.getElementById(`${item.i}-${option.id}`).checked) {
                        value.push(option.value);
                    }
                }
                responseData.push({ id: item.i, label: label, type: item.type, value: value });
                continue;
            case "single-choice-grid":
                value = [];
                for (const row of item.rows) {
                    const selectedInput = document.querySelector(`input[name="${item.i}-${row.id}"]:checked`);
                    if (selectedInput) {
                        const colId = selectedInput.id.split("-").pop();
                        const colText = item.cols.find(col => col.id == colId).text;
                        value.push({ row: row.text, col: colText });
                    }
                }
                responseData.push({ id: item.i, label: label, type: item.type, value: value });
                continue;
            case "multiple-choices-grid":
                value = [];
                for (const row of item.rows) {
                    const cols = [];
                    for (const col of item.cols) {
                        if (document.getElementById(`${item.i}-${row.id}-${col.id}`).checked) {
                            cols.push(col.text);
                        }
                    }
                    value.push({ row: row.text, cols: cols });
                }
                responseData.push({ id: item.i, label: label, type: item.type, value: value });
                continue;
            case "pdf-file-upload":
            case "image-upload":
                // Get file source
                value = document.getElementById(item.i).files[0];
                responseData.push({ id: item.i, label: label, type: item.type, value: value });
                continue;
            default:
                continue;
        }
    }
    return responseData;
}

/* Convert responses to an AGGrid table
    * 
    * @param {Object} form - A form object
    * @param {Array} responses - An array of responses
    * @returns {Object} - A table object {rows: Array, cols: Array}
*/
const convertResponsesToAgGridTable = (form, responses) => {
    const cols = [];
    const rows = [];

    // Set all form fields as columns
    for (const item of form.layout.lg) {
        const col = { headerName: "", field: "" };
        if (item.label) {
            col.headerName = item.label;
            col.field = item.label;
            cols.push(col);
        } else if (item.description) {
            col.headerName = item.description;
            col.field = item.description;
            cols.push(col);
        } else if (item.placeholder) {
            col.headerName = item.placeholder;
            col.field = item.placeholder;
            cols.push(col);
        }
    }

    // Set all row data
    for (const response of responses) {
        const row = {};
        for (const item of response.data) {
            row[item.label] = String(item.value);
        }

        rows.push(row);
    }
    return { rows, cols };
}

// Helper function to escape values
// that contain commas, quotes, or newlines
const escapeCSVValue = (value) => {
    if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
};

/* Convert responses to CSV
    * 
    * @param {Object} form - A form object
    * @param {Array} responses - An array of responses
    * @returns {String} - A CSV string
*/
const convertResponsesToCsv = (form, responses) => {
    const csv = [];
    const header = [];
    for (const item of form.layout.lg) {
        if (item.label) {
            header.push(item.label);
        } else if (item.description) {
            header.push(item.description);
        } else if (item.placeholder) {
            header.push(item.placeholder);
        }
    }
    csv.push(header.join(","));
    for (const response of responses) {
        const row = [];
        for (const item of response.data) {
            const value = escapeCSVValue(item.value);
            row.push(value);
        }
        csv.push(row.join(","));
    }
    return csv.join("\n");
}

export {readResponseData, convertResponsesToAgGridTable, convertResponsesToCsv};