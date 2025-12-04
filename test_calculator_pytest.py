import subprocess
import textwrap
import pytest
from pathlib import Path

HERE = Path(__file__).resolve().parent
CALC_JS = HERE / "calculator.js"  # файл должен существовать (npx tsc)

def run_node(js_code: str) -> str:
    code = textwrap.dedent(js_code).strip()
    return subprocess.check_output(["node", "-e", code], text=True).strip()

def js_header() -> str:
    # Подгружаем модуль через dynamic import() и создаём объект Calculator
    # Важно: путь должен быть file://...
    return f"""
        const mod = await import('{CALC_JS.as_uri()}');
        const Calculator = mod.Calculator ?? (mod.default && mod.default.Calculator);
        if (!Calculator) {{
          throw new Error("Calculator не найден в модуле. Проверь export в calculator.ts");
        }}
        const c = new Calculator();
    """

@pytest.mark.parametrize("x,y,expected", [
    (1, 2, 3),
    (-5, 10, 5),
    (0.5, 0.5, 1.0),
])
def test_add(x, y, expected):
    js = f"""
        (async () => {{
          {js_header()}
          console.log(c.add({x}, {y}));
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert float(run_node(js)) == expected

@pytest.mark.parametrize("x,y,expected", [
    (5, 3, 2),
    (0, 10, -10),
    (-5, -5, 0),
])
def test_subtract(x, y, expected):
    js = f"""
        (async () => {{
          {js_header()}
          console.log(c.subtract({x}, {y}));
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert float(run_node(js)) == expected

@pytest.mark.parametrize("x,y,expected", [
    (2, 3, 6),
    (10, 0, 0),
    (-4, 2, -8),
])
def test_multiply(x, y, expected):
    js = f"""
        (async () => {{
          {js_header()}
          console.log(c.multiply({x}, {y}));
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert float(run_node(js)) == expected

@pytest.mark.parametrize("x,y,expected", [
    (6, 3, 2),
    (10, 2, 5),
    (-8, -2, 4),
])
def test_divide_ok(x, y, expected):
    js = f"""
        (async () => {{
          {js_header()}
          console.log(c.divide({x}, {y}));
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert float(run_node(js)) == expected

def test_divide_by_zero_exception():
    js = f"""
        (async () => {{
          {js_header()}
          try {{
            c.divide(10, 0);
            console.log("NO_ERROR");
          }} catch (e) {{
            console.log(e.message);
          }}
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert run_node(js) == "На ноль делить нельзя."

@pytest.mark.parametrize("x,y,expected", [
    (2, 3, 8),
    (4, 0.5, 2),
    (10, 1, 10),
])
def test_power(x, y, expected):
    js = f"""
        (async () => {{
          {js_header()}
          console.log(c.power({x}, {y}));
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert float(run_node(js)) == expected

@pytest.mark.parametrize("x,expected", [
    (4, 2),
    (0, 0),
    (9, 3),
])
def test_root_ok(x, expected):
    js = f"""
        (async () => {{
          {js_header()}
          console.log(c.root({x}));
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert float(run_node(js)) == expected

def test_root_negative_exception():
    js = f"""
        (async () => {{
          {js_header()}
          try {{
            c.root(-9);
            console.log("NO_ERROR");
          }} catch (e) {{
            console.log(e.message);
          }}
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert run_node(js) == "Корень из отрицательного недопустим."

@pytest.mark.parametrize("n,expected", [
    (2, True),
    (3, True),
    (4, False),
    (5, True),
    (1, False),
    (0, False),
    (-7, False),
    (49, False),
    (97, True),
    (2.5, False),
])
def test_is_prime_number(n, expected):
    js = f"""
        (async () => {{
          {js_header()}
          console.log(c.is_prime_number({n}) ? "true" : "false");
        }})().catch(e => {{
          console.error(e);
          process.exit(1);
        }});
    """
    assert (run_node(js) == "true") == expected
