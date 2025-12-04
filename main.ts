// main.ts
import { Calculator } from "./calculator";

type TwoArgOp = (x: number, y: number) => number;
type OneArgOp = (x: number) => number;

const calc = new Calculator();

// UI-операции (оставляем ваши названия sum/diff/prod/quot/exp/root)
const operations: Record<string, TwoArgOp | OneArgOp> = {
  sum: (x, y) => calc.add(x, y),
  diff: (x, y) => calc.subtract(x, y),
  prod: (x, y) => calc.multiply(x, y),
  quot: (x, y) => calc.divide(x, y),
  exp: (x, y) => calc.power(x, y),
  root: (x) => calc.root(x),
};

const performCalculation = (): void => {
  const val1 = parseFloat((document.getElementById("num1") as HTMLInputElement).value);
  const val2 = parseFloat((document.getElementById("num2") as HTMLInputElement).value);
  const operation = (document.getElementById("operationType") as HTMLSelectElement).value;
  const output = document.getElementById("output") as HTMLDivElement;

  try {
    let result: number;

    if (operation === "root") {
      result = (operations.root as OneArgOp)(val1);
    } else {
      const op = operations[operation] as TwoArgOp | undefined;
      if (!op) throw new Error("Неизвестная операция.");
      result = (op as TwoArgOp)(val1, val2);
    }

    output.textContent = `Результат: ${result}`;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    output.textContent = `Ошибка: ${msg}`;
  }
};

window.addEventListener("load", () => {
  const btn = document.getElementById("runCalc") as HTMLButtonElement | null;
  if (!btn) return;
  btn.addEventListener("click", performCalculation);
});
