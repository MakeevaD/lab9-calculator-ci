// main.ts
import { Calculator } from "./calculator";
const calc = new Calculator();
// UI-операции (оставляем ваши названия sum/diff/prod/quot/exp/root)
const operations = {
    sum: (x, y) => calc.add(x, y),
    diff: (x, y) => calc.subtract(x, y),
    prod: (x, y) => calc.multiply(x, y),
    quot: (x, y) => calc.divide(x, y),
    exp: (x, y) => calc.power(x, y),
    root: (x) => calc.root(x),
};
const performCalculation = () => {
    const val1 = parseFloat(document.getElementById("num1").value);
    const val2 = parseFloat(document.getElementById("num2").value);
    const operation = document.getElementById("operationType").value;
    const output = document.getElementById("output");
    try {
        let result;
        if (operation === "root") {
            result = operations.root(val1);
        }
        else {
            const op = operations[operation];
            if (!op)
                throw new Error("Неизвестная операция.");
            result = op(val1, val2);
        }
        output.textContent = `Результат: ${result}`;
    }
    catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        output.textContent = `Ошибка: ${msg}`;
    }
};
window.addEventListener("load", () => {
    const btn = document.getElementById("runCalc");
    if (!btn)
        return;
    btn.addEventListener("click", performCalculation);
});
