---
title: "Zod: Runtime TS Validations"
date: "2026-08-07"
description: "Practical Zod notes covering runtime schemas, type inference, composition, environment variables, and validated REST API requests."
tags: ["zod", "typescript", "validation", "web-dev"]
---

# Zod: Runtime TS Validations

> **TypeScript** performs type checking at compile time, which means it verifies types only during development and then transpiles the code to **JavaScript**.

> **Zod** validates data at runtime, ensuring that incoming data (e.g., from APIs, user inputs, or environment variables) conforms to expected types and structures. This helps prevent unexpected behavior, crashes, or security vulnerabilities caused by malformed data.

> It has a functional programming approach, zero dependencies, it’s very light-weight, fully written in TypeScript but it also supports plain JavaScript.

## Initialization

```bash
npm i zod
```

```tsx
import { z } from "zod";
```

## Primitive Data Types

- Zod schemas are declarative structures used to define and validate data shapes in TypeScript, enabling runtime type checking and automatic type inference.

```tsx
const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();
const undefinedSchema = z.undefined();
const nullSchema = z.null();
```

- The `.parse()` method validates input data against a defined schema, throwing an error if the data doesn't conform or returning the validated data if it does.

```tsx
const nameSchema = z.string();

const name = "Ryan"; // ✅

nameSchema.parse(name);
console.log(result);
```

```tsx
const nameSchema = z.string();

const name = 100;

nameSchema.parse(name); // ❌
```

- `.safeParse()` let us extrapolate the error code into a variable

```tsx
const nameSchema = z.string();

const result = nameSchema.safeParse(100);

console.log(result);
```

## Abstract Data Types

- In addition to primitive data types we can validate objects with Zod

```tsx
const UserSchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
  phone: z.number()
});

UserSchema.parse({
  email: "ryan@gmail", // ❌ invalid email
  fullname: "ryan",
  phone: 123123123
});
```

```tsx
const UserSchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
  phone: z.number()
});

const result = UserSchema.parse({
  email: "ryan@gmail.com", // ✅
  fullname: "ryan",
  phone: 123123123
});

console.log(result);
```

- If more properties like `age: 30` are added, the validation will resolve succesfully because it has the minimum expected properties. However, extra properties will be ignored and removed from the result.

```tsx
const UserSchema = z.object({
	email: z.string().email(),
	fullName: z.string(),
	phone: z.number()
})

const result = UserSchema.parse({
	email: 'ryan@gmail.com', // ✅
	fullname: 'ryan',
	phone: 123123123
	age: 30 // Extra property
})

console.log(result)
```

- You can use `.passthrough()` to retain extra properties.

```tsx
const UserSchema = z
  .object({
    email: z.string().email(),
    fullName: z.string(),
    phone: z.number()
  })
  .passthrough();

const result = UserSchema.parse({
  email: "ryan@gmail.com",
  fullName: "Ryan",
  phone: 123123123,
  age: 30 // Extra property
});

console.log(result);
```

- Or you can use `.strict()` if you want the presence of additional properties like `age` to cause the validation to fail, and throw an error.

```tsx
const UserSchema = z
  .object({
    email: z.string().email(),
    fullName: z.string(),
    phone: z.number()
  })
  .strict();

const result = UserSchema.parse({
  email: "ryan@gmail.com",
  fullName: "Ryan",
  phone: 123123123,
  age: 30 // Extra property ❌
});
```

## Type Inference

- Zod's `z.infer` allows us to automatically infer the TypeScript type (`UserType`) from a Zod schema, ensuring that our TypeScript types are always in sync with the schema definitions.

```tsx
const UserSchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
  phone: z.number()
});

type UserType = z.infer<typeof UserSchema>;

const UserInput: UserType = {
  email: "ryan@gmail.com",
  fullName: "Ryan",
  phone: 123123123
};

const result = UserSchema.parse(UserInput);

console.log(result);
```

## Schema Composition

- Zod's `.merge()` allows us to combine two or more schemas into a single schema, creating a unified structure that includes the properties and validation rules from all merged schemas.

```tsx
const UserSchema = z.object({
  email: z.string().email(),
  fullName: z.string(),
  phone: z.number()
});

const addressSchema = z.object({
  street: zstrin(),
  city: z.string()
});

const citizenSchema = UserSchema.merge(addressSchema);

type citizenType = z.infer<typeof citizenSchema>;

const citizen: citizenType = {
  email: "ryan@gmail.com",
  fullName: "Ryan",
  phone: 123123123,
  street: "Street 123",
  city: "London"
};

const result = citizenSchema.parse(citizen);
console.log(result);
```

## Arrays

```tsx
const numbersArraySchema = z.array(z.number());

numbersArraySchema.parse(["10", true, null]); // ❌
numbersArraySchema.parse([1, 2, 3]); // ✅
```

- We can also define the numbers array schema like this:

```tsx
const numbersArraySchema = z.number().array();
```

- How to define an array of objects

```tsx
const UserSchema = z.object({
  name: z.string(),
  age: z.number()
});

const usersSchema = z.array(UserSchema);

numbersArraySchema.parse([1, 2, 3]); // ❌
numbersArraySchema.parse([
  { name: "Ryan", age: 30 },
  { name: "Jose", age: 20 },
  { name: "Sofia", age: 25 }
]); // ✅
```

## `.optional()`

- `.optional()` allows a field that can either be present or undefined.

```tsx
const nameSchema = z.string().optional();

nameSchema.parse("Hello"); // ✅
nameSchema.parse(undefined); // ✅
nameSchema.parse(123); // ❌
```

- We can use `.optional()` with arrays but the declaration order will give us different validation rules

```tsx
const UserSchema = z.object({
  name: z.string(),
  age: z.number()
});

const s1 = z.string().optional().array();
const s2 = z.string().array().optional();

type s1Type = z.infer<typeof s1>; // = (string | undefined)[]
type s2Type = z.infer<typeof s2>; // = string[] | undefined
```

## `.nullable()`

- This allows a property to accept `null` as a valid value.

```tsx
const UserSchema = z.object({
  name: z.string(),
  age: z.number().nullable()
});

const user1 = UserSchema.parse({
  name: "Ryan",
  age: null // ✅
});
```

## `.default()`

- This assigns a default value to a property if it is not provided.

```tsx
const UserSchema = z.object({
  name: z.string(),
  age: z.number().default(18)
});

const user1 = UserSchema.parse({
  name: "Ryan"
});

console.log(user1); // ✅
```

## `.min()` and `.max()`

- These sets a minimum or maximum value for a number.

```tsx
const UserSchema = z.object({
  name: z.string(),
  age: z.number().min(18) // Age must be 0 or greater
});

const user1 = UserSchema.parse({
  name: "Ryan",
  age: 15 // ❌
});
```

```tsx
const UserSchema = z.object({
  name: z.string(),
  age: z.number().max(100) // Age must be 100 or less
});

try {
  const user2 = UserSchema.parse({
    name: "Ryan",
    age: 666 // ❌
  });
} catch (error) {
  console.error(error.errors);
}
```

## `.refine()`

- This allows for custom validation logic.

```tsx
const UserSchema = z.object({
  name: z.string(),
  age: z.number().refine((val) => val >= 18, {
    message: "Age must be 18 or older"
  }) // Custom validation to ensure age is 18 or older
});

const user2 = UserSchema.parse({
  name: "Ryan",
  age: 16 // ❌
});
```

## Environmental Variables

```tsx
// .env 🌴

DATABASE_URL=postgres://postgres:password@localhost:5432/
your_db_name
HOST=localhost
SECRET=12312123123123
```

```tsx
// src/config/env.ts ⚙️

const envVars = z.object({
  DATABASE_URL: z.string(),
  HOST: z.string(),
  SECRET: z.string()
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVars> {}
  }
}

envVars.parse(process.env);
```

- We can call the environment validator at the top of our index.ts file so it runs once the program starts

```tsx
// src/index.ts 📂

import "../config/env";
```

## REST APIs - Validations and Error Handling

- Here’s an standard Express project that sets up a basic router for handling authentication.

```tsx
// src/index.ts 📂

import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express.json();
app.use(authRoutes);

app.listen(3000);
console.log("Server on port", 3000);
```

```tsx
// src/routes/auth.routes.ts 📍

import { Router } from "express";
import { login } from "../controllers/auth.controller.ts";

const router = Router();
router.post("/login", login);

export default router;
```

- We can define the expected `req.body` into an schema and then validate it with the `.parse()` method. We also consider the possibility that some errors may not be `Error` instances.

```tsx
// src/schemas/auth.schema.ts 📐

export const loginSchema = z.object({
  email: z.string().email("Write a correct email"),
  password: z.string().min(6, "Password too short")
});
```

```tsx
// src/controllers/auth.controller.ts 🕹️

export const login = (req: Request, res: Response) => {
  try {
    loginSchema.parse(req.body); // ✅ Request Validation
    res.send("Logged in (>w<)");
  } catch (err: unknown) {
    //Server Errors ❌
    if (err instanceof Error) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
    //Unknown Errors ❌
    return res.status(500).json({ message: "Unknown error occurred" });
  }
};
```

- However Zod has its own object for validation errors called `ZodError`, which is an instance of `Error` and contains an array of `ZodIssue` objects. Here we show them all with a `map()`

```tsx
// src/controllers/auth.controller.ts 🕹️

import { Request, Response } from "express";
import { ZodError } from "zod";

export const login = (req: Request, res: Response) => {
  try {
    loginSchema.parse(req.body); // ✅ Request Validation
    res.send("Logged in (>w<)");
  } catch (err) {
	  //Zod Errors ❌
    if (err instanceof ZodError) {
      return res.status(400).json({
        errors: err.issues.map((issue) => ({
          message: issue.message
        }))
      });
    }
    //Server Errors ❌
    if (err instanceof Error) {
      console.error(err.message);
      return res.status(500).json({ message: err.message });
    }
    //Unknown Errors ❌
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});
```

- We can move the validation and error handling into a middleware, and use `AnyZodObject` to validate any type of schema.

```tsx
// src/middlewares/schemaValidation.middleware.ts 🛠️

import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidation =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // ✅ Request Validation
      next();
    } catch (err) {
      //Zod Errors ❌
      if (err instanceof ZodError) {
        return res.status(400).json({
          errors: err.issues.map((issue) => ({
            message: issue.message
          }))
        });
      }
      //Server Errors ❌
      if (err instanceof Error) {
        console.error(err.message);
        return res.status(500).json({ message: err.message });
      }
      //Unknown Errors ❌
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
```

- Now the controller is cleaner and we add the middleware with the schema to be validated into the router.

```tsx
// src/controllers/auth.controller.ts 🕹️

import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  console.log(req.body);
  res.send("login");
};
```

```tsx
// src/routes/auth.routes.ts 📍

import { Router } from "express";
import { login } from "../controllers/auth.controller.ts";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { loginSchema } from "../schemas/auth.schema.ts";

const router = Router();

router.post("/login", schemaValidation(loginSchema), login);

export default router;
```

## REST APIs - Dynamic Routes and Request Types

- Now we’ll create a new router for a products use case.

```tsx
// src/index.ts 📂

import express from "express";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/products.routes";

const app = express.json();
app.use(authRoutes);
app.use(productRoutes);

app.listen(3000);
console.log("Server on port", 3000);
```

```tsx
// src/routes/products.routes.ts 📍

import { Router } from "express";
import {
  createProduct,
  updateProduct
} from "../controllers/products.controller";
import { schemaValidation } from "../middlewares/schemaValidator.middleware";
import {
  CreateProductSchema,
  UpdateProductSchema
} from "../schemas/product.schema";

const router = Router();

router.post("/products", schemaValidation(CreateProductSchema), createProduct);
router.put(
  "/products/:id",
  schemaValidation(UpdateProductSchema),
  updateProduct
);

export default router;
```

- But if we want to use dynamic routes such as `"/products/:id"` and validate its `params` we’ll need to change the validation middleware.

```tsx
// src/middlewares/schemaValidation.middleware.ts 🛠️

import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidation =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        // ✅ Request Validation
        body: req.body,
        params: req.params,
        query: req.query
      });
      next();
    } catch (error) {
      //... ❌ Error handling stays the same
    }
  };
```

- And also change any other schemas that are fed into that middleware as we’re now validating the whole request, not only `req.body`

```tsx
// src/schemas/auth.schema.ts 📐

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Write a correct email"),
    password: z.string().min(6, "Password too short")
  })
});
```

- Now we can finally create new schemas and controllers for our products.

```tsx
// src/schemas/product.schema.ts 📐

export const CreateProductSchema = z.object({
  body: z.object({
    name: z.string().nonempty(),
    price: z.number().nonnegative()
  })
});

export const UpdateProductSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().nonnegative().optional()
  }),
  params: z.object({
    id: z.string().min(3)
  }),
  query: z.object({
    title: z.string()
  })
});
```

```tsx
// src/controllers/products.controller.ts 🕹️

import { Request, Response } from "express";

export const createProduct = (req: Request, res: Response) => {
  console.log(req.body); // ✅
  console.log(req.body.name); // ❌
  res.send("Creating product");
};

export const updateProduct = (req: Request, res: Response) => {
  console.log(req.body); // ✅
  res.send("Updating product");
};
```

- We did it, but as you can see we can’t use the request properties inside our controller because TypeScript doesn't know its shape by default. Luckily we can extract them from our Zod schemas.

```tsx
// src/schemas/product.schema.ts 📐

export const CreateProductSchema = z.object({
	//...
)};

export const UpdateProductSchema = z.object({
	//...
});

export type CreateProductType = z.infer<typeof CreateProductSchema>["body"];
// Since we're already here, we'll extract these other types to be able to access more properties.
export type UpdateProductBodyType = z.infer<typeof UpdateProductSchema>["body"];
export type UpdateProductParamsType = z.infer<typeof UpdateProductSchema>["params"];
export type UpdateProductQueryType = z.infer<typeof UpdateProductSchema>["query"];
```

- Now we can use the request properties inside our controller

```tsx
// src/controllers/products.controller.ts 🕹️

import { Request, Response } from "express";
import {
  CreateProductType,
  UpdateProductBodyType,
  UpdateProductParamsType,
  UpdateProductQueryType
} from "../schemas/product.schema";

export const createProduct = (
  req: Request<unknown, unknown, CreateProductType>,
  res: Response
) => {
  console.log(req.body); // ✅
  console.log(req.body.name); // ✅
  res.send("Creating product");
};

export const updateProduct = (
  req: Request<
    UpdateProductParamsType,
    unknown,
    UpdateProductBodyType,
    UpdateProductQueryType
  >,
  res: Response
) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const { title } = req.query;

  console.log(id, name, price, title); // ✅
  res.send("Updating product");
};
```

- If you’re wondering why there’s `unknown` types as parameters it’s because they correspond to the unused generic type parameters of the Express `Request` interface. We need to add them to respect the order of the type arguments in the `Request` interface definition.

## Resources

[TypeScript-first schema validation with static type inference](https://zod.dev/)

[https://www.youtube.com/watch?v=bUzGfrjg66M](https://www.youtube.com/watch?v=bUzGfrjg66M)

[https://www.youtube.com/watch?v=daSaqwZjTDc](https://www.youtube.com/watch?v=daSaqwZjTDc)

[https://www.youtube.com/watch?v=TAVaAxWmzSg](https://www.youtube.com/watch?v=TAVaAxWmzSg)
