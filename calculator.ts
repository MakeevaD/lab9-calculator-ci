// calculator.ts
export class Calculator {
  add(x: number, y: number): number {
    return x + y;
  }

  subtract(x: number, y: number): number {
    return x - y;
  }

  multiply(x: number, y: number): number {
    return x * y;
  }

  divide(x: number, y: number): number {
    if (y === 0) throw new Error("На ноль делить нельзя.");
    return x / y;
  }

  power(x: number, y: number): number {
    return Math.pow(x, y);
  }

  root(x: number): number {
    if (x < 0) throw new Error("Корень из отрицательного недопустим.");
    return Math.sqrt(x);
  }

  is_prime_number(n: number): boolean {
    if (!Number.isInteger(n) || n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;

    for (let i = 3; i * i <= n; i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }
}
