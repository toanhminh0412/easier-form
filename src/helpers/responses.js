"use client";

import { firebaseStorage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { compressImageSize } from "./files";
import AGGridResponseFile from "@/components/responses/aggrid/AGGridResponseFile";
import AGGridResponseWebsite from "@/components/responses/aggrid/AGGridResponseWebsite";
import AGGridPasswordRenderer from "@/components/responses/aggrid/AGGridPasswordRenderer";

const NO_RESPONSE_TYPES = [
    "heading",
    "paragraph",
    "image",
    "separator",
]

/* Read a form's response
    * 
    * @param {String} form - A form object
    * @returns {Object} - A response's data object
*/
const readResponseData = async (form) => {
    const responseData = [];
    for (const item of form.layout.lg) {
        console.log(item);
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
                value=""
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
                const uploadedFiles = document.getElementById(item.i).files;
                if (uploadedFiles.length === 0) {
                    responseData.push({ id: item.i, label: label, type: item.type, value: null });
                    continue;
                }

                // Upload file to Firebase Storage
                value = uploadedFiles[0];
                let file = value;
                if (file.type.startsWith("image/")) {
                    file = await compressImageSize(value, 1);
                }

                // File cannot be larger than 10MB
                if (file.size > 10 * 1024 * 1024) {
                    throw new Error(`${label}: File size cannot exceed 10MB`);
                }

                const storageRef = ref(firebaseStorage, `responses/${form._id}/files/${value.name}`);
                await uploadBytes(storageRef, file);

                // Get download URL
                const fileUrl = await getDownloadURL(storageRef);
                value = { name: value.name, url: fileUrl, size: file.size };

                responseData.push({ id: item.i, label: label, type: item.type, value: value });
                continue;
            default:
                continue;
        }
    }
    return responseData;
}

// Convert a response item's value into string
const convertValueToString = (item) => {
    if (item.type === "image-upload" || item.type === "pdf-file-upload") {
        return item.value;
    } else if (item.type === "checkbox" || item.type === "toggle") {
        return item.value ? "Yes" : "No";
    } else if (item.type === "multiple-choices") {
        return item.value.join(", ");
    } else if (item.type === "single-choice-grid") {
        return item.value.map(choice => `${choice.row}: ${choice.col}`).join(", ");
    } else if (item.type === "multiple-choices-grid") {
        return item.value.map(choice => `${choice.row}: ${choice.cols.join(", ")}`).join(", ");
    } else if (item.type === "website") {
        return item.value;
    } else {
        return String(item.value);
    }   
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
        let col = { headerName: "", field: "" };
        
        // Render files
        if (item.type === "image-upload" || item.type === "pdf-file-upload") {
            col.cellRenderer = AGGridResponseFile;
        }
        // Render websites
        else if (item.type === "website") {
            col.cellRenderer = AGGridResponseWebsite;
        }
        // Render password
        else if (item.type === "password") {
            col.cellRenderer = AGGridPasswordRenderer;
        }

        if (item.label) {
            col.headerName = item.label;
            col.field = item.i;
            cols.push(col);
        } else if (item.description) {
            col.headerName = item.description;
            col.field = item.i;
            cols.push(col);
        } else if (item.placeholder) {
            col.headerName = item.placeholder;
            col.field = item.i;
            cols.push(col);
        } else if (!NO_RESPONSE_TYPES.includes(item.type)) {
            col.headerName = "Blank";
            col.field = item.i;
            cols.push(col);
        }
    }

    // Set all row data
    for (const response of responses) {
        const row = {};
        for (const item of response.data) {
            // if (item.type === "image-upload" || item.type === "pdf-file-upload") {
            //     row[item.id] = item.value;
            // } else if (item.type === "checkbox" || item.type === "toggle") {
            //     row[item.id] = item.value ? "Yes" : "No";
            // } else if (item.type === "multiple-choices") {
            //     row[item.id] = item.value.join(", ");
            // } else if (item.type === "single-choice-grid") {
            //     row[item.id] = item.value.map(choice => `${choice.row}: ${choice.col}`).join(", ");
            // } else if (item.type === "multiple-choices-grid") {
            //     row[item.id] = item.value.map(choice => `${choice.row}: ${choice.cols.join(", ")}`).join(", ");
            // } else if (item.type === "website") {
            //     row[item.id] = item.value;
            // } else {
            //     row[item.id] = String(item.value);
            // }
            row[item.id] = convertValueToString(item);
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
        } else if (!NO_RESPONSE_TYPES.includes(item.type)) {
            header.push("Blank");
        }
    }
    csv.push(header.join(","));
    for (const response of responses) {
        const row = [];
        for (const item of response.data) {
            let value = convertValueToString(item);
            value = escapeCSVValue(value);
            row.push(value);
        }
        csv.push(row.join(","));
    }
    return csv.join("\n");
}

/* Convert responses to Excel following format of json-as-xlsx
    * 
    * @param {Object} form - A form object
    * @param {Array} responses - An array of responses
    * @returns {Object} - An Excel object
*/
const convertResponsesToExcel = (form, responses) => {
    const sheet = `${form.title} Responses`;
    const columns = [];
    const content = [];
    let index = 1;

    for (const item of form.layout.lg) {
        if (item.label) {
            columns.push({ label: item.label, value: item.i });
        } else if (item.description) {
            columns.push({ label: item.description, value: item.i });
        } else if (item.placeholder) {
            columns.push({ label: item.placeholder, value: item.i });
        } else if (!NO_RESPONSE_TYPES.includes(item.type)) {
            columns.push({ label: `Blank ${index}`, value: item.i });
            index++;
        }
    }

    for (const response of responses) {
        const row = {};
        for (const item of response.data) {
            row[item.id] = convertValueToString(item);
        }
        content.push(row);
    }

    return { sheet, columns, content };
}

export {readResponseData, convertResponsesToAgGridTable, convertResponsesToCsv, convertResponsesToExcel};