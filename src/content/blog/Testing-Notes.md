---
title: "Testing Notes"
category: professional
date: "2026-08-07"
description: "Testing notes covering TDD, Vitest, React Testing Library, Jest, backend tests, and Cypress end-to-end workflows."
tags: ["testing", "vitest", "jest", "cypress", "web-dev"]
---

## Test Driven Development (TDD)

**Test-driven development** (**TDD**) is a way of writing code that involves writing an automated unit-level test case that fails, then writing just enough code to make the test pass, then refactoring both the test code and the production code, then repeating with another new test case.

![image.png](/blog-assets/testing-notes/image.png)

### Laws

1. Don’t write production code until you’ve written a failing unit test.
2. Don’t write more of a unit tests than is sufficient to fail.
3. Don’t write more production code than is sufficient to make the failing unit test pass.

## Vitest

- Configuration

```bash
npm i -D vitest
npm i -D @vitest/ui

npm i -D happy-dom
npm i -D standard
```

```tsx
// package.json
//...
  "scripts": {
    "test": "vitest --ui",
    "coverage": "vitest run --coverage",
    "dev": "vite"
  }
 }
```

```tsx
// vite.config.ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom"
  }
});
```

```tsx
// ts.config.json
//...
{
  "compilerOptions": {
	  "types": ["vitest/globals"],
	}
}
```

- Testing a simple function

```tsx
// tests/fizzbuzz.test.js
import { describe, it, expect } from "vitest";
import { fizzBuzz } from "../src/fizzbuzz";

describe("fizzBuzz", () => {
  it("should throw an error if no argument is provided", () => {
    expect(() => fizzBuzz("")).toThrowError(
      // this calls the function
      /The argument must be a number/
    );
  });

  it("should return 1 if the argument is 1", () => {
    expect(fizzBuzz(1)).toBe("1"); // this passes the function as argument
  });

  it("should return Fizz if the argument is multiple of 3", (): void => {
    expect(fizzBuzz(3)).toBe("Fizz");
    expect(fizzBuzz(6)).toBe("Fizz");
    expect(fizzBuzz(9)).toBe("Fizz");
  });

  it("should return Buzz if the argument is multiple of 5", (): void => {
    expect(fizzBuzz(5)).toBe("Buzz");
    expect(fizzBuzz(10)).toBe("Buzz");
  });

  it("should return FizzBuzz if the argument is multiple of both 3 and 5", (): void => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
    expect(fizzBuzz(30)).toBe("FizzBuzz");
  });
});
```

```tsx
// src/fizzbuzz.ts

export const fizzBuzz = (num: number): string => {
  if (typeof num !== "number") {
    throw new Error("The argument must be a number");
  }

  const multiplies = { 3: "Fizz", 5: "Buzz" };
  let output = "";

  Object.entries(multiplies).forEach(([key, value]): void => {
    if (num % Number(key) === 0) output += value;
  });

  return output || num.toString();
};
```

## React Testing Library

- Configuration

```bash
npm i -D @testing-library/react
npm i -D @testing-library/jest-dom
```

- Using it with Vitest

```tsx
// test/calculator.test.tsx
import { afterEach, describe, expect, it } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";

describe("Calculator", (): void => {
  afterEach(cleanup); // avoids calling cleanup (which cleans the DOM) on each test

  it("should render", (): void => {
    render(<Calculator />);
  });

  it("should render title", (): void => {
    render(<Calculator />);
    screen.getByText("Calculator"); // only visible after render
  });

  it("should update user input after clicking a number", (): void => {
    render(<Calculator />);
    const oneButton = screen.getByText("1");
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.click(oneButton);
    expect(input.value).toBe("1");
  });
//...
```

```tsx
// tests/accordion.test.tsx
describe("Accordion", (): void => {
  beforeEach(() => { // avoids calling render on each test
    render(<Accordion title="Hello" content="World" />);
  });
  afterEach(cleanup);

  test("should render", () => {
    expect(<Accordion title="Hello" content="World" />).toBeDefined();
  });

  test("should not show the content at the start", () => {
    expect(screen.queryByText(/World/i)).toBeNull();
  });

  test("should show the content when open", () => {
    fireEvent.click(screen.getByText(/Open/i));
    expect(screen.getByText(/World/i)).toBeDefined();
  });

  test("should hide the content when close", () => {
    fireEvent.click(screen.getByText(/Open/i));
    fireEvent.click(screen.getByText(/Close/i));
    expect(screen.queryByText(/World/i)).toBeNull();
  });
//...
```

- Using it with Jest

```tsx
// tests/notes.test.js
test('clicking the button calls event handler once', () => {
	const mockHandler = jest.fn()
	const component = render(<Note note={note} toggleImportance{mockHandler} />)
	const button = component.getByText('make not important')
	fireEvent.click(button)
	expect(mockHandler).toHaveBeenCalledTimes(1)
})

test('after clicking its children must be shown', () => {
  const button = component.getByText(buttonLabel)
  fireEvent.click(button)
  const el = component.getByText('testDivContent')
  expect(el.parentNode).not.toHaveStyle('display: none')
})
```

## Jest

- Configuration

```bash
npm i jest -D
npm i supertest -D
```

```tsx
// package.json
//...
	"scripts": {
	    "test": "NODE_ENV=test jest --verbose --silent",
	    "test:watch": "npm run test -- --watch"
	},
	"eslintConfig": {
		"env": {
			"jest": true
		}
	},
	"jest": {
		"testEnvironment": "node"
	}
}
```

- Testing a backend with Jest

```tsx
// index.js
const app = express();

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const api = supertest(app);
```

```tsx
// tests/notes.test.ts
const supertest = require("supertest");
const Note = require("../models/Note");
const initialNotes = require("../utils/notes");
const { server, api } = require("../index.js");

// we create a mock database before each test
beforeEach(async () => {
  await Note.deleteMany({});
  for (const note of initialNotes) {
    const noteObject = new Note(note);
    await noteObject.save();
  }
});

//and close the connections after
afterAll(() => {
  mongoose.connection.close();
  server.close();
});

describe("GET /api/notes", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("there are two notes", async () => {
    const res = await api.get("/api/notes");
    expect(res.body).toHaveLength(initialNotes.length);
  });

  test("the first note has expected title", async () => {
    const res = await api.get("/api/notes");
    const titles = res.body.map((note) => note.title);
    expect(titles).toContain("First note title");
  });
});

describe("POST /api/notes", () => {
  test("a valid note can be added", async () => {
    const newNote = {
      title: "New Note",
      content: "testing"
    };

    await api
      .post("/api/notes")
      .send(newNote)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const res = await api.get("/api/notes");
    const contents = res.body.map((note) => note.content);

    expect(contents).toContain(newNote.content);
  });

  test("note without content is cant be added", async () => {
    const newNote = {
      title: "Invalid Note"
    };

    await api.post("/api/notes").send(newNote).expect(400);

    const res = await api.get("/api/notes");

    expect(res.body).toHaveLength(initialNotes.length);
  });
});

describe("DELETE /api/notes", () => {
  test("existing note can be deleted", async () => {
    let res = await api.get("/api/notes");
    const id = res.body[0].id;

    await api.delete(`/api/notes/${id}`).expect(204);

    res = await api.get("/api/notes");
    const titles = res.body.map((note) => note.title);

    expect(res.body).toHaveLength(initialNotes.length - 1);
    expect(titles).not.toContain("First note title");
  });

  test("invalid note cant be deleted", async () => {
    await api.delete(`/api/notes/invalidID`).expect(400);

    res = await api.get("/api/notes");
    expect(res.body).toHaveLength(initialNotes.length);
  });
});

describe("PUT /api/notes/:id", () => {
  test("an existing note can be updated", async () => {
    let res = await api.get("/api/notes");
    const noteToUpdate = res.body[0];

    const updatedNote = {
      title: "Updated Title",
      content: "Updated content"
    };

    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(updatedNote)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    res = await api.get("/api/notes");
    const updatedNoteInDb = res.body.find(
      (note) => note.id === noteToUpdate.id
    );

    expect(updatedNoteInDb.title).toBe(updatedNote.title);
    expect(updatedNoteInDb.content).toBe(updatedNote.content);
  });

  test("cant update a note with invalid data", async () => {
    let res = await api.get("/api/notes");
    const noteToUpdate = res.body[0];

    const invalidUpdate = {
      title: "",
      content: ""
    };

    await api
      .put(`/api/notes/${noteToUpdate.id}`)
      .send(invalidUpdate)
      .expect(400);

    res = await api.get("/api/notes");
    const noteAfterUpdate = res.body.find(
      (note) => note.id === noteToUpdate.id
    );

    expect(noteAfterUpdate.title).toBe(noteToUpdate.title);
    expect(noteAfterUpdate.content).toBe(noteToUpdate.content);
  });

  test("invalid note cant be updated", async () => {
    const newNote = {
      title: "Invalid Note",
      content: "This note does not exist"
    };

    await api.put(`/api/notes/invalidID`).send(newNote).expect(404);
  });
});
```

- Another example with a different approach

```tsx
import request from "supertest";
import app from "../src/app";

describe("GET /tasks", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond an array", async () => {
    const response = await request(app).get("/tasks").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /tasks", () => {
  describe("given a title and description", () => {
    const newTask = {
      title: "some title",
      description: "some description"
    };

    // should respond with a 200 code
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.statusCode).toBe(200);
    });

    // should respond a json as a content type
    test("should have a Content-Type: application/json header", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    // shoud respond with a json object containing the new task with an id
    test("should respond with an task ID", async () => {
      const response = await request(app).post("/tasks").send(newTask);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("when the title and description is missing", () => {
    // should respond with a 400 code
    test("shoud respond with a 400 status code", async () => {
      const fields = [
        { title: "some title" },
        { description: "some description" }
      ];

      for (const body of fields) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(400);
      }
    });
  });
});
```

## Cypress

- Configuration

```bash
npm i -D cypress
npm i -D eslint-plugin-cypress
```

```tsx
// frontend: package.json
//...
	"eslintConfig": {
		"env": {
			"cypress/globals": true
		}
		"plugins": {
			"cypress"
		}
	},
	"scripts": {
		"cypress:open": "cypress open",
	  "test:e2e": "cypress run",
	}
}
```

```tsx
// backend: package.json
//...
	"scripts": {
		"start:test": "NODE_ENV=test node index.js"
	}
}
```

- We create a backend endpoint that resets the database so we can test it from the frontend

```tsx
// backend: routers/testing.js
const testingRouter = require('express').Router()

testingRouter.post('/reset', async (req, res) => {
	await Note.deleteMany({})
	await User.deleteMany({})
	res.status(204).end()
})

if(process.env.NODE_ENV === 'test'}){
	app.use('/api/testing', testingRouter)
}
```

- But first we create custom commands for the API requests so they can be called with `cy.login` and `cy.addNote`

```tsx
// frontend: crypress/support/commands.js
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password
  }).then((res) => {
    localStorage.setItem("user", JSON.stringify(res.body));
  });
  cy.visit("http://localhost:3000"); // we should revisit the page after login
});

Cypress.Commands.add("addNote", ({ content, important }) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3001/api/notes",
    body: { content, important },
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
    }
  });
  cy.visit("http://localhost:3000"); // if not the new note won't be there
});
```

- Now we can test the backend like a real user

```tsx
// frontend: cypress/integration/note_app.spec.js
describe("Note App", () => {
  const user = {
    name: "Nadya", // me uwu
    username: "nady4",
    password: "asd1234"
  };

  // we call the mock database endpoint
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("can open frontpage", () => {
    cy.contains("Notes");
  });

  // this tests the login form but the login itself should be tested with cy.login()
  it("can submit login form", () => {
    cy.get("#login-form").find('input[name="username"]').type(user.username);
    cy.get("#login-form").find('input[name="password"]').type(user.password);
    cy.get("#login-form").find('button[type="submit"]').click();
    cy.contains("Create a new note");
  });

  it("can login", () => {
    cy.login(user.username, user.password);
    cy.contains("Create a new note"); // only visible after successful login
  });

  it("fails login with wrong password", () => {
    cy.login(user.username, "incorrectPassword");
    cy.contains("Wrong credentials"); // only visible after failed login
  });

  describe("when logged in", () => {
    beforeEach(() => {
      cy.login(user.username, user.password);
    });

    it("can create a new note from the form", () => {
      const noteContent = "new note :D";
      cy.get('input[name="note-content"]').type(noteContent);
      cy.contains("Create a new note").click();
      cy.contains(noteContent);
    });

    describe("and a note exists", () => {
      beforeEach(() => {
        cy.addNote({ content: "New Note", important: false });
        cy.contains("New Note");
      });

      it("can be made important", () => {
        cy.contains("New Note").as("newNote"); // stores element reference as alias

        cy.get("@newNote") // calls the alias
          .contains("make important")
          .click();

        cy.get("@newNote").contains("make not important");
      });
    });
  });
});
```

## Resources

[https://www.youtube.com/watch?v=\_t9l2TwGioc&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=35&pp=gAQBiAQB](https://www.youtube.com/watch?v=_t9l2TwGioc&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=35&pp=gAQBiAQB)

[https://www.youtube.com/watch?v=Yocj2BB3AQU&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=36&pp=gAQBiAQB](https://www.youtube.com/watch?v=Yocj2BB3AQU&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=36&pp=gAQBiAQB)

[https://www.youtube.com/watch?v=KYjjtRgg_H0&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=37&pp=gAQBiAQB](https://www.youtube.com/watch?v=KYjjtRgg_H0&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=37&pp=gAQBiAQB)

[https://www.youtube.com/watch?v=\_DzBez4qMi0&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=38&pp=gAQBiAQB](https://www.youtube.com/watch?v=_DzBez4qMi0&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=38&pp=gAQBiAQB)

[https://www.youtube.com/watch?v=\_xxVJdGNMrs&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=39&pp=gAQBiAQB](https://www.youtube.com/watch?v=_xxVJdGNMrs&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=39&pp=gAQBiAQB)

[https://www.youtube.com/watch?v=lZJ1mar_znk&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=40&pp=gAQBiAQB](https://www.youtube.com/watch?v=lZJ1mar_znk&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=40&pp=gAQBiAQB)

[https://www.youtube.com/watch?v=HDFNjDKKO6A&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=41&pp=gAQBiAQB](https://www.youtube.com/watch?v=HDFNjDKKO6A&list=PLTHsJ1otlcc-Xfz5DyrQe7dC1YynTjSnn&index=41&pp=gAQBiAQB)
