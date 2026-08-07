---
title: "TSX: TypeScript + React"
date: "2026-08-07"
description: "Practical TypeScript and React notes covering project setup, linting, props, state, forms, reducers, refs, and data fetching."
tags: ["typescript", "react", "tsx", "web-dev"]
---

# TSX: TypeScript + React

Category: Web Dev  
⭐ Skills: [TypeScript](https://app.notion.com/p/TypeScript-20ea79aba59347ddadd5ea55397a99cb?pvs=21)

<aside>
💡

> For TypeScript specific notes check these

[Adapting from JS to TS | Notion](https://nady4.notion.site/Adapting-from-JS-to-TS-dcc31797b463472c859ac100d031b4dc)

</aside>

## Create project

```bash
npm create vite@latest project-name
npm i ts-node-dev -D
```

```tsx
//package.json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/index.ts"
  }
}
```

## Add linter

```bash
# initialize the linter with
npx eslint --init
# or
npm init @eslint/config@latest
```

```jsx
// eslint.config.js

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: ["react"],
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.recommended,
];
```

## `React.FC`

- `React.FC` (short for `React.FunctionComponent`) is a type that defines a function which is expected to be a valid React component.

```tsx
const App: React.FC = () => {
  // ✔️
  return <h1>Todo List App</h1>;
};
```

- TypeScript will infer it correctly if it is not specified.

```tsx
const App = () => {
  // ✔️
  return <h1>Todo List App</h1>;
};
```

## Adding Types to Props

To enable type checking for the props, we first need to declare types for them.

- You can inline the props type declaration.

```tsx
const App = ({ message }: { message: string }) => {
  return <div>{message}</div>;
};
```

- Or first define the expected props types.

```tsx
type AppProps = {
  message: string;
};

// If exporting, use `interface` so that consumers can extend it.
interface AppProps {
  message: string;
}
```

- And then add the props type as an argument.

```tsx
const App = ({ message }: AppProps): React.JSX.Element => {
  return <div>{message}</div>;
};
```

> `JSX.Element` is the result of rendering a `React.FC`, not a component in itself.

- The return type is inferred, so this syntax is preferred ✅

```tsx
const App = ({ message }: AppProps) => {
  return <div>{message}</div>;
};
```

- We can also add type checking like this. Since React 18+, this does not add a `children` property.

```tsx
const App: React.FC<AppProps> = ({ message }) => {
  return <div>{message}</div>;
};
```

## useState

- Type checking gives us real-time error messages in the development environment when, for example, an expected number is actually a string.

```tsx
function App() {
  const [num, setNum] = useState(5); // number inferred

  const changeNumber = () => {
    setNum("2"); // ❌
  };

  return (
    <div className="App">
      {num}
      <button onClick={changeNumber}>Change number</button>
    </div>
  );
}

export default App;
```

```tsx
function App() {
  const [num, setNum] = useState<number | string>(5);

  const changeNumber = () => {
    setNum("2"); // ✔️
  };

  return (
    <div className="App">
      {num}
      <button onClick={changeNumber}>Change number</button>
    </div>
  );
}

export default App;
```

## List of Components

- In TypeScript, we need to specify the shape of the arrays.

```tsx
function App() {
  const [subs, setSubs] = useState([]); // ❌

  return (
    <div className="App">
      <h1>subs</h1>
      <ul>
        {subs.map((sub) => {
          return (
            <li key={sub.nick}>
              <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
              <h4>
                {sub.nick} <small>{sub.subMonths}</small>
              </h4>
              <p>{sub.description?.substring(0, 100)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

- For this, we first need to create the type of the items that the array will have in it.

```tsx
interface Sub {
  nick: string;
  avatar: string;
  subMonths: number;
  description?: string;
}

function App() {
  const [subs, setSubs] = useState<Array<Sub>>([]); // ✔️

  return (
    <div className="App">
      <h1>subs</h1>
      <ul>
        {subs.map((sub) => {
          return (
            <li key={sub.nick}>
              <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
              <h4>
                {sub.nick} <small>{sub.subMonths}</small>
              </h4>
              <p>{sub.description?.substring(0, 100)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

## Abstracting

- We can abstract the App state like this.

```tsx
interface Sub {
  nick: string;
  avatar: string;
  subMonths: number;
  description?: string;
}

interface AppState {
  subs: Array<Sub>;
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]); // ✔️

  return (
    <div className="App">
      <h1>subs</h1>
      <ul>
        {subs.map((sub) => {
          return (
            <li key={sub.nick}>
              <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
              <h4>
                {sub.nick} <small>{sub.subMonths}</small>
              </h4>
              <p>{sub.description?.substring(0, 100)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
```

- We could also abstract the list of items into a new component, pass it the props, and then import it into the App component.

```tsx
// List.tsx

interface Sub {
  nick: string;
  avatar: string;
  subMonths: number;
  description?: string;
}

interface Props {
  subs: Array<Sub>;
}

export default function List({ subs }: Props) {
  // ✔️
  return (
    <ul>
      {subs.map((sub) => {
        return (
          <li key={sub.nick}>
            <img src={sub.avatar} alt={`Avatar for ${sub.nick}`} />
            <h4>
              {sub.nick} <small>{sub.subMonths}</small>
            </h4>
            <p>{sub.description?.substring(0, 100)}</p>
          </li>
        );
      })}
    </ul>
  );
}
```

```tsx
// App.tsx

import List from "./List";

interface Sub {
  nick: string;
  avatar: string;
  subMonths: number;
  description?: string;
}

interface AppState {
  subs: Array<Sub>;
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]); // ✔️

  return (
    <div className="App">
      <h1>subs</h1>
      <List subs={subs} />
    </div>
  );
}
```

- The interfaces should actually be in a `types.d.ts` file so we can avoid code repetition and import them in both `App.tsx` and `List.tsx`.

```tsx
// types.d.ts
export interface Sub {
  nick: string;
  subMonths: number;
  avatar: string;
  description: string;
}
```

## Forms

- To abstract the Form state, it is recommended to separate the business logic types from the component types. Instead of reusing the `Sub` interface, we will create one for the form.

```tsx
import { Sub } from "../types";

interface FormState {
  inputValues: Sub;
}

const Form = () => {
  const [inputValues, setInputValues] = useState<FormState["inputValues"]>({
    nick: "",
    subMonths: 0,
    avatar: "",
    description: "",
  });
  // form state setup
};
```

- `React.ChangeEvent<HTMLInputElement>` represents an event that occurs when the value of an HTML `<input>` element changes in a React application.

```tsx
// form change handler
const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
  setInputValues({
    ...inputValues,
    [evt.target.name]: evt.target.value,
  });
};

return (
  <div>
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={inputValues.nick}
        type="text"
        name="nick"
        placeholder="nick"
      />
      <button>Save new sub!</button>
    </form>
  </div>
);
```

- Adding props to the Form component and passing them from the App component.

```tsx
// App.tsx

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState["newSubsNumber"]>(0);

  useEffect(() => {
    setSubs(INITIAL_STATE);
  }, []);

  return (
    <div className="App">
      <h1>midu subs</h1>
      <List subs={subs} />
      <Form onNewSub={setSubs} />
    </div>
  );
}

export default App;
```

```tsx
// Form.tsx

interface FormProps {
  onNewSub: React.Dispatch<React.SetStateAction<Sub[]>>;
}

const Form = ({ onNewSub }: FormProps) => {
  const [inputValues, setInputValues] = useState<FormState["inputValues"]>({
    nick: "",
    subMonths: 0,
    avatar: "",
    description: "",
  });
};

const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
  evt.preventDefault();
  onNewSub((subs) => [...subs, inputValues]);
};
```

- It is better to make a new function to handle the state change instead of passing the setter directly through props.

```tsx
// App.tsx
function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([]);
  const [newSubsNumber, setNewSubsNumber] =
    useState<AppState["newSubsNumber"]>(0);

  useEffect(() => {
    setSubs(INITIAL_STATE);
  }, []);

  const handleNewSub = (newSub: Sub): void => {
    setSubs((subs) => [...subs, newSub]);
  };

  return (
    <div className="App">
      <h1>midu subs</h1>
      <List subs={subs} />
      <Form onNewSub={handleNewSub} />
    </div>
  );
}

export default App;
```

```tsx
interface FormState {
  inputValues: Sub;
}

interface FormProps {
  onNewSub: (newSub: Sub) => void;
}

const Form = ({ onNewSub }: FormProps) => {
  const [inputValues, setInputValues] = useState<FormState["inputValues"]>({
    nick: "",
    subMonths: 0,
    avatar: "",
    description: "",
  });

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onNewSub(inputValues);
  };
};
```

## useRef

- To utilize the `useRef` hook, we need to indicate through generics which data type it will be used with.

```tsx
import { useRef } from "react";

const divRef = useRef<HTMLDivElement>(null);

<div className="App" ref={divRef}></div>;
```

## useReducer

```tsx
type FormReducerAction =
  | {
      type: "change_value";
      payload: {
        inputName: string;
        inputValue: string;
      };
    }
  | {
      type: "clear";
    };

const formReducer = (
  state: FormState["inputValues"],
  action: FormReducerAction,
) => {
  switch (action.type) {
    case "change_value": {
      const { inputName, inputValue } = action.payload;
      return {
        ...state,
        [inputName]: inputValue,
      };
    }
    case "clear":
      return INITIAL_STATE;
    default:
      return state;
  }
};

const Form = ({ onNewSub }: FormProps) => {
  const [inputValues, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onNewSub(inputValues);
    handleClear();
  };

  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = evt.target;

    dispatch({
      type: "change_value",
      payload: {
        inputName: name,
        inputValue: value,
      },
    });
  };

  const handleClear = () => {
    dispatch({ type: "clear" });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={inputValues.name}
          type="text"
          name="name"
        />
        <button onClick={handleSubmit} type="submit">
          Clear
        </button>
      </form>
    </div>
  );
};
```

## Fetching

- To fetch an API, we need to specify the type of the data that its promise returns.

```tsx
useEffect(() => {
  const fetchSubs = (): Promise<SubsResponseFromApi> => {
    return fetch("http://localhost:3001/subs").then((res) => res.json());
  };

  fetchSubs().then(setSubs);
}, []);
```

- We can also use `axios` and specify the return data type in its `get` method.

```tsx
useEffect(() => {
  const fetchSubs = () => {
    return axios
      .get<SubsResponseFromApi>("http://localhost:3001/subs")
      .then((response) => response.data);
  };

  fetchSubs().then(setSubs);
}, []);
```

---

## Resources

[GitHub - typescript-cheatsheets/react: Cheatsheets for experienced React developers getting started with TypeScript](https://github.com/typescript-cheatsheets/react)

[TypeScript + React notes](https://www.youtube.com/watch?v=15VKbky2gB4)
