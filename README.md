# ExpLang

A generic React component to create playgrounds to explore any programming language.

## Usage

```typescript
import { Playground, ButtonActions, Samples } from 'explang';

// create as many actions as needed, they will be turned into buttons in the top bar
// here we create two buttons to run and disassemble a piece of code
// an action can return : string | PromiseLike<string> | Iterable<string> | AsyncIterable<string>
const actions: ButtonActions = {
  async *Run(code: string) {
    yield 'running...';
    const res = await compile(code);

    if (res.isSuccess) {
      yield await run(res.output);
    } else {
      yield `Error: ${res.error}`;
    }
  },
  Disassemble: async code => await disassemble(code),
};

const samples: Samples = {
  'Fibonacci': `fn fib(n: usize) { ... }`,
  'Factorial': `fn fact(n: usize) { ... }`,
};

export const App = () => (
  <Playground
    actions={actions}
    samples={samples}
    // available modes : https://github.com/thlorenz/brace/tree/master/mode
    aceMode='rust'
  />
);
```

## Screenshot

![res/yolang-playground.png](res/yolang-playground.png)