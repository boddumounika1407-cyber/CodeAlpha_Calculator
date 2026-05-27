const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {

    try {
        const expression = display.value;
        const result = eval(expression);

        // Add to history
        addToHistory(expression + " = " + result);

        display.value = result;
    } 
    catch {
        display.value = "Error";
    }
}

function addToHistory(item) {

    const li = document.createElement("li");

    li.textContent = item;

    // Click history to reuse calculation
    li.onclick = () => {
        display.value = item.split("=")[0].trim();
    };

    historyList.prepend(li);
}

function clearHistory() {
    historyList.innerHTML = "";
}

// Keyboard Support

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        appendValue(key);
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }
});