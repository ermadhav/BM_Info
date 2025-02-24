const fieldsContainer = document.getElementById("fields");
let fields = [];

function addField(type) {
    // Save current values before adding new fields
    saveCurrentValues();

    let field;
    if (type === "text") {
        field = { label: "New Field", type, value: "" };
    } else if (type === "checkbox") {
        field = { label: "New Field", type, checked: false };
    } else if (type === "dropdown") {
        field = { label: "New Field", type, options: ["Option 1", "Option 2"], selectedOption: "Option 1" };
    }

    fields.push(field);
    renderFields();
}

function saveCurrentValues() {
    const inputs = document.querySelectorAll(".field-container input, .field-container select");
    inputs.forEach((input, index) => {
        if (fields[index]) {
            if (fields[index].type === "text") {
                fields[index].value = input.value;
            } else if (fields[index].type === "checkbox") {
                fields[index].checked = input.checked;
            } else if (fields[index].type === "dropdown") {
                fields[index].selectedOption = input.value;
            }
        }
    });
}

function renderFields() {
    fieldsContainer.innerHTML = "";
    fields.forEach((field, index) => {
        const div = document.createElement("div");
        div.classList.add("field-container");

        let inputElement = "";
        if (field.type === "text") {
            inputElement = `<input type="text" value="${field.value}" placeholder="Enter Text" onchange="updateValue(${index}, this.value)">`;
        } else if (field.type === "checkbox") {
            inputElement = `<input type="checkbox" ${field.checked ? "checked" : ""} onchange="updateCheckbox(${index}, this.checked)">`;
        } else if (field.type === "dropdown") {
            inputElement = `
                <select onchange="updateDropdown(${index}, this.value)">
                    ${field.options.map(option => `<option value="${option}" ${field.selectedOption === option ? "selected" : ""}>${option}</option>`).join("")}
                </select>
            `;
        }

        div.innerHTML = `
            <button class="remove-btn" onclick="removeField(${index})">X</button>
            ${inputElement}
        `;

        fieldsContainer.appendChild(div);
    });
}

function updateValue(index, value) {
    fields[index].value = value;
}

function updateCheckbox(index, checked) {
    fields[index].checked = checked;
}

function updateDropdown(index, value) {
    fields[index].selectedOption = value;
}

function removeField(index) {
    saveCurrentValues();
    fields.splice(index, 1);
    renderFields();
}

async function saveForm() {
    saveCurrentValues();

    const title = document.getElementById("formTitle").value;
    const form = { title, fields };

    await fetch("http://localhost:5000/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
    });

    alert("Form Saved!");
}
