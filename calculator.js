// calculator.ts
export class Calculator {
    add(x, y) {
        return x + y;
    }
    subtract(x, y) {
        return x - y;
    }
    multiply(x, y) {
        return x * y;
    }
    divide(x, y) {
        if (y === 0)
            throw new Error("На ноль делить нельзя.");
        return x / y;
    }
    power(x, y) {
        return Math.pow(x, y);
    }
    root(x) {
        if (x < 0)
            throw new Error("Корень из отрицательного недопустим.");
        return Math.sqrt(x);
    }
    is_prime_number(n) {
        if (!Number.isInteger(n) || n < 2)
            return false;
        if (n === 2)
            return true;
        if (n % 2 === 0)
            return false;
        for (let i = 3; i * i <= n; i += 2) {
            if (n % i === 0)
                return false;
        }
        return true;
    }
}
