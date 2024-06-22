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
                responseData.push({ id: item.i, label: item.label, type: item.type, value: value });
                continue;
            case "checkbox":
            case "toggle":
                value = document.getElementById(item.i).checked;
                responseData.push({ id: item.i, label: item.label, type: item.type, value: value });
                continue;
            case "radio":
                const selectedInput = document.querySelector(`input[name="${item.i}"]:checked`);
                if (selectedInput) {
                    value = selectedInput.value;
                }
                responseData.push({ id: item.i, label: item.label, type: item.type, value: value });
                continue;
            case "multiple-choices":
                value = [];
                for (const option of item.options) {
                    if (document.getElementById(`${item.i}-${option.id}`).checked) {
                        value.push(option.value);
                    }
                }
                responseData.push({ id: item.i, label: item.label, type: item.type, value: value });
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
                responseData.push({ id: item.i, label: item.label, type: item.type, value: value });
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
                responseData.push({ id: item.i, label: item.label, type: item.type, value: value });
                continue;
            case "pdf-file-upload":
            case "image-upload":
                // Get file source
                value = document.getElementById(item.i).files[0];
                responseData.push({ id: item.i, label: item.label, type: item.type, value: value });
                continue;
            default:
                continue;
        }
    }
    return responseData;
}

export {readResponseData};