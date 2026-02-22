---
title: "Adapting from JS to TS"
date: "2025-12-22"
description: "Study notes"
tags: ["typescript", "javascript"]
---

# Adapting from JS to TS

Category: Web Dev
⭐ Skills: TypeScript (https://www.notion.so/TypeScript-20ea79aba59347ddadd5ea55397a99cb?pvs=21)

## **Compilation**

TypeScript code runs on compiler time, in which it’s converted to JavaScript, that runs on execution time.

## Create project

### Frontend

```bash
npm create vite@latest project-name
npm i ts-node-dev -D
```

```tsx
//package.json
{
	"scripts": {
		"dev": "ts-node-dev -- respawn src/index.ts"
	}
}
```

### Backend

```bash
npm init -y
npm i typescript ts-node-dev
npx tsc --init
```

```tsx
//package.json
{
	"scripts": {
		"dev": "ts-node-dev --respawn src/index.ts",
		"build": "npx tsc"
	}
}
```

```tsx
//tsconfig.json
{
	"rootDir": "./src",
	"outDir": "./dist",
}
```

## **Variables and Types**

TypeScript is a strongly typed superset of JavaScript which means it supports data types.

```tsx
let texto = "Lorem ipsum"; // assigned data type
texto.toLocaleLowerCase(); // ✔️
texto = 2; // ❌
```

## Type Inference

```tsx
const a: number = 1;
const b: number = 2;
const c = a + b; // TypeScript infers 'c' as a number
```

## **Type Assertion**

Type assertions allows you to override the type inferred by TypeScript.

```tsx
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

But there are cases where this could be tricky

```tsx
const canvas = document.getElementById("span");

if (canvas !== null) {
  const ctx = (canvas as HTMLCanvasElement).getContext("2d"); // ❌
}
```

To fix this we can use `instanceof` or `typeof` instead of assuming the data type

```tsx
const canvas = document.getElementById("span");

if (canvas instanceof HTMLCanvasElement) {
  const ctx = canvas.getContext("2d"); // ✔️
}
```

## **`any` Type**

**Using `any`** disables data type checking, so the variable can have any type.

```tsx
let obj: any = { x: 0 };
```

## **`void` Type**

**Using `void`** ensures that a function will never return any value.

```tsx
function logMessage(message: string): void {
  console.log(message);
}
```

## **`never` Type**

**Using `never`** ensures that a function will never finish its execution and get to the point where it returns something, because it throws an exception or enters an infinite loop before.

```tsx
function throwError (message: string): never => {
	throw new Error(message);
}
```

## `ReturnType`

`ReturnType` gives you the type of the return value of a function

```tsx
function createAddress() {
  return {
    planet: "Earth",
    city: "Barcelona",
  };
}

type Address = ReturnType<typeof createAddress>;

const myAddress: Address = {
  planet: "Mars",
  city: "Mount Olympus",
};
```

## Arrays

Arrays can be used in TypeScript following a set of conventions.

```tsx
const languages: string[] = [];
languages.push("Javascript"); // ✔️
languages.push(3); // ❌
```

```tsx
const languages: Array<string> = [];
languages.push("TypeScript"); // ✔️
languages.push(3); // ❌
```

```tsx
const languages: (string | number)[] = [];
languages.push("TypeScript"); // ✔️
languages.push(3); // ✔️
```

## Tuples

A **tuple** is a typed array with a pre-defined length and types for each index.

```tsx
type RGB = [number, number, number];

const black: RGB = [0, 0, 0]; // ✔️
const green: RGB = [0, 255, 0]; // ✔️
const pink: RGB = [255, 0, 255, "lol"]; // ❌
```

## **Functions**

TypeScript allows you to define the types of returns values and function parameters.

```tsx
function saludar(name: string): string {
  // ✔️
  console.log(`Hola, ${name}`);
  return name;
}
```

```tsx
function saludar(persona: { name: string }): string {
  // ✔️
  const { name } = persona;
  console.log(`Hola, ${name}`);
  return name;
}
```

```tsx
function saludar(name) {
  console.log(`Hola, ${name}`); // ❌
}
```

```tsx
function saludar(name): number {
  console.log(`Hola, ${name}`); // ❌
}
```

## **Arrow Functions**

```tsx
const sumar = (a: number, b: number): number => {
  // ✔️
  return a + b;
};

const restar: (a: number, b: number) => number = (a, b) => {
  // ✔️
  return a - b;
};
```

## **Enums**

Enums allow you to define a set of named constants.

```tsx
const enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

let move: Direction = Direction.Up;
```

By default, enums assign numeric values starting from 0. But you can specify custom values and this is useful to match them with database values.

```tsx
const enum Direction {
  Up: "up",
  Down: "down",
  Left: "left",
  Right: "right"
}

let move: Direction = Direction.Up;
```

## **Type Aliases**

Type aliases create a new name for a type. They are useful for simplifying complex type definitions.

```tsx
type StringOrNumber = string | number;
let value: StringOrNumber;
value = 42; // ✔️
value = "Hello"; // ✔️
```

## **Interfaces**

Interfaces define the shape of an object. They are similar to type aliases but more suited for defining object structures.

```tsx
interface Person {
  name: string;
  age: number;
}

let user: Person = {
  name: "John",
  age: 30,
};
```

Interfaces can be modified later on and define functions inside them in two different ways.

```tsx
interface CarritoOps {
  add: (product: Producto) => void; // ✔️
  remove: (id: number) => void; // ✔️
}

interface CarritoOps {
  // ✔️
  clear: () => void;
}
```

## **Optional Properties**

Optional properties are defined with a question mark and are not required for the object to be valid.

```tsx
interface Car {
  make: string;
  model: string;
  year?: number; // optional property
}

let myCar: Car = {
  make: "Toyota",
  model: "Corolla",
}; // valid without 'year' ✔️
```

## **Read-only Properties**

Readonly properties can be set once during initialization but cannot be changed afterward.

```tsx
interface Book {
  title: string;
  readonly author: string;
}

let myBook: Book = {
  title: "TypeScript Handbook",
  author: "Unknown",
};

myBook.title = "Advanced TypeScript"; // ✔️
myBook.author = "John Doe"; // ❌
```

## **Template Literal Types**

Template literal types produces a new string literal type by concatenating the content.

```tsx
type id = `${string}-${string}-${string}-${string}-${string}`;
const myId: id = crypto.randomUUID(); // ✔️
const myId: id = "36b8f84d-df4e-4d49-b662-bcde71a8764f"; // ✔️
const myId: id = "123456"; // ❌
```

## **Type Indexing**

Type Indexing allows you to access and use nested types within a complex type definition.

```tsx
type HeroProperties = {
  isActive: boolean;
  address: {
    planet: string;
    city: string;
  };
};

const addressHero: HeroProperties["address"] = {
  city: "Madrid",
  planet: "Earth",
};
```

## **Intersection Types ( & )**

Intersection types combine multiple types into one. This allows an object to have multiple type definitions.

```tsx
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "John",
  privileges: ["create-server"],
  startDate: new Date(),
};
```

## **Union Types ( | )**

Union types allow a variable to be one of several types.

```tsx
let identifier: number | string;
identifier = 123; // ✔️
identifier = "ABC"; // ✔️
identifier = true; // ❌
```

## **Discriminated Unions**

Discriminated unions, also known as tagged unions, are a pattern where each member of a union type has a common, discriminant property.

```tsx
interface Mario {
  company: "Nintendo";
  nombre: string;
  saltar: () => void;
}

interface Sonic {
  company: "Sega";
  nombre: string;
  correr: () => void;
}

type Personaje = Mario | Sonic;

function jugar(personaje: Personaje) {
  if (personaje.company === "Nintendo") {
    personaje.saltar(); // ✔️
    return;
  }
}
```

## **Type Guards**

Type guards help in narrowing down the type within a conditional block.

```tsx
interface Mario {
  nombre: string;
  saltar: () => void;
}

interface Sonic {
  nombre: string;
  correr: () => void;
}

type Personaje = Mario | Sonic;

function checkIsSonic(personaje: Personaje): personaje is Sonic {
  return (personaje as Sonic).correr !== undefined;
}
```

## **Generics**

Generics provide a way to create reusable components that work with any data type. It’s like the arguments that are passed into a function except the generic allows you to indicate to the component which data type should it expect. We could use `any` but we would miss the type checking.

```tsx
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString"); // ✔️ returns a string
let output2 = identity<number>(42); // ✅ returns a number
let output1 = identity<number>("xdxdxd"); // ❌
```

```tsx
function firstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

console.log(firstElement<string>(["apple", "banana", "cherry"]));
// ✅ Output: "apple"

console.log(pair<number, string>(42, "answer"));
// ✅ Output: [42, "answer"]

console.log(pair<number, string>(1, 1)); // ❌
```

```tsx
interface ProcessIdentity<T, U> {
  value: T;
  message: U;
  process(): T;
}

class processIdentity<X, Y> implements ProcessIdentity<X, Y> {
  value: X;
  message: Y;

  constructor(value: X, message: Y) {
    this.value = value;
    this.message = message;
  }

  process(): X {
    return this.value;
  }
}

const process = new processIdentity("Hola", "Mundo"); // ✔️
const process = new processIdentity("Hola", 123); // ❌
```

```tsx
type ValidTypes = string | number;

function identity<T extends ValidTypes, U>(value: T, message: U): T {
  let result: T = value + value; // ❌
  return result;
}

identity<number, string>(1, "hola");
```

```tsx
type ValidTypes = string | number;

function identity<T extends ValidTypes, U>(value: T, message: U) {
  let result: ValidTypes = "";

  //Type Guards
  if (typeof value === "number") {
    result = value + value; // suma
  } else if (typeof value === "string") {
    result = value + value; // concatenación
  }

  console.log(message);
  return result;
}

identity<number, string>(1, "hola"); //  ✔️
```

## **Conditional Types**

Conditional types provide a way to choose one type or another based on a condition.

```tsx
type MessageOf<T> = T extends { message: string } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>; // string
type DogMessageContents = MessageOf<Dog>; // never
```

## **Decorators**

Decorators are a special kind of declaration that can be attached to a class, method, accessor, property, or parameter.

```tsx
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

Decorators can be used for methods, accessors, properties, and parameters.

```tsx
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Returned from ${propertyKey} with`, result);
    return result;
  };

  return descriptor;
}

class Calculator {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

const calculator = new Calculator();
calculator.add(2, 3); // Logs method calls and results
```

## **Mapped Types**

Mapped types allow you to create new types by transforming existing types.

```tsx
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Todo {
  title: string;
  description: string;
}

const todo: Readonly<Todo> = {
  title: "Learn TypeScript",
  description: "Understand advanced concepts",
};

todo.title = "Learn JavaScript"; // ❌
```

## **Utility Types**

TypeScript provides several utility types to facilitate common type transformations.

```tsx
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type PartialTodo = Partial<Todo>;
type ReadonlyTodo = Readonly<Todo>;
type PickTitle = Pick<Todo, "title">;

let todo: PartialTodo = {
  title: "Learn TypeScript",
};
```

## `.mts` Files

According to TS specifications you can’t use `await`, `import` or `export` inside a `.ts` file. But you can use them with `.mts` files.

```tsx
//getData.ts

const fetchData = async () => {
  const response = await fetch("https://api.com/data"); // ❌
  const data = await response.json();
  return data;
};
```

```tsx
//getData.mts

const fetchData = async () => {
  const response = await fetch("https://api.com/data"); // ✔️
  const data = await response.json();
  return data;
};
```

## `.d.ts` Files

`.d.ts` files are used to provide type definitions and don’t accept regular code.

```tsx
interface Hero {
  // ❌
  name: string;
  age: number;
  power: string;
}
```

```tsx
export interface Hero {
  // ✔️
  name: string;
  age: number;
  power: string;
}
```

---

## Resources

[TS Playground - An online editor for exploring TypeScript and JavaScript](https://www.typescriptlang.org/play/)

[https://www.youtube.com/watch?v=fUgxxhI_bvc&list=PLIJCiAhgWROgnRxgBYK24T3FL7voPo13X&index=6&pp=gAQBiAQB](https://www.youtube.com/watch?v=fUgxxhI_bvc&list=PLIJCiAhgWROgnRxgBYK24T3FL7voPo13X&index=6&pp=gAQBiAQB)

[https://www.youtube.com/watch?v=L1ZSk-vPVKI&list=PLIJCiAhgWROgnRxgBYK24T3FL7voPo13X&index=7&pp=gAQBiAQB](https://www.youtube.com/watch?v=L1ZSk-vPVKI&list=PLIJCiAhgWROgnRxgBYK24T3FL7voPo13X&index=7&pp=gAQBiAQB)

[https://www.youtube.com/watch?v=g16brokfrQw](https://www.youtube.com/watch?v=g16brokfrQw)
