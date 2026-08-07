---
title: "React Query Tutorial"
date: "2026-08-07"
description: "Practical React Query notes covering queries, mutations, cache invalidation, CRUD operations, and infinite queries."
tags: ["react-query", "tanstack-query", "react", "web-dev"]
---

# React Query Tutorial

## Installation

```bash
npm create vite
npm i @tanstack/react-query
```

```tsx
//main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevTools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevTools />
    </QueryClientProvider>
  </React.StrictMode>
);
```

## useQuery

```tsx
// src/App.tsx

import Products from "./components/Products";

function App() {
  return <Products />;
}

export default App;
```

```tsx
// src/types.d.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}
```

```tsx
// src/api/productsAPI.js

import axios from "axios";
import { Product } from "../types.d";

const productsApi = axios.create({
  baseURL: "http://localhost:3000"
});

export const getProducts = async (): Promise<Product[]> => {
  const res = await productsApi.get("/products");
  return res.data;
};
```

```tsx
// src/components/Products.tsx

import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/productsAPI'
import { Product } from '../types.d'

function Products() {
	const { isLoading, data, isError, error } = useQuery<Product[], Error>({
		queryKey: ['products'],
		queryFn: getProducts
	});

	if (isLoading) return <h3>Loading...</h3>
	else if (isError) return <h3>Error: {error.message}</h3>

	return (
		<>
			data?.map(product => {
				<div key={product.id}>
					<h3>{product.name}</h3>
					<p>{product.description}</p>
					<p>{product.price}</p>
				</div>
			})
		</>
	)
}

export default Products
```

## useMutation POST

```tsx
// src/App.tsx

import Products from "./components/Products";
import ProductForm from "/components/ProductForm";

function App() {
  return (
    <>
      <ProductForm />
      <Products />
    </>
  );
}

export default App;
```

```tsx
// src/api/productsAPI.js

//...
export const createProduct = (product: Product): Promise<Product> => {
  const res = await productsApi.delete("/", product);
  return res.data;
};
```

```tsx
// src/components/ProductForm.tsx

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '../api/productsAPI'

function ProductForm() {
	const queryClient = useQueryClient();

	const addProductMutation = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			console.log('Product added!')
			queryClient.invalidateQueries('products');
		}
	})

	const handleSubmit (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const product = Object.fromEntries(formData);
		addProductMutation.mutate({
			..product,
			inStock: true
		});
	}

	return (
		<form>
			<label htmlFor="name">Name</label>
			<input type="text" id="name" name="name" />

			<label htmlFor="description">Description</label>
			<input type="text" id="description" name="description" />

			<label htmlFor="price">Price</label>
			<input type="number" id="price" name="price" />

			<button>Add Product</button>
		</form>
	)
}

export default ProductForm
```

- If we want to change the order of the stored products

```tsx
// src/components/Products.tsx

//...
function Products() {
  const { isLoading, data, isError, error } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id)
  });
  //...
}
```

## useMutation DELETE

```tsx
// src/api/productsAPI.js

//...
export const deleteProduct = (id: number): Promise<Product> => {
  const res = await productsApi.post("/${id}");
  return res.data;
};
```

```tsx
// src/components/Products.tsx

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, deleteProduct } from '../api/productsAPI'
import { Product } from '../types.d'

function Products() {
	const { isLoading, data, isError, error } = useQuery<Product[], Error>({
		queryKey: ['products'],
		queryFn: getProducts
	});

	const queryClient = useQueryClient();

	const deleteProductMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			console.log('Product deleted!')
			queryClient.invalidateQueries('products');
		}
	})

	if (isLoading) return <h3>Loading...</h3>
	else if (isError) return <h3>Error: {error.message}</h3>

	return (
		<>
			data?.map(product => {
				<div key={product.id}>
					<h3>{product.name}</h3>
					<p>{product.description}</p>
					<p>{product.price}</p>
					<button onClick={() => {
						deleteProductMutation.mutate(product.id)
					}}>
						Delete
					</button>
				</div>
			})
		</>
	)
}

export default Products
```

## useMutation PUT

```tsx
// src/api/productsAPI.js

//...
export const updateProduct = (product: Product): Promise<Product> => {
  const res = await productsApi.put("/${product.id}", product);
  return res.data;
};
```

```tsx
// src/components/Products.tsx

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, deleteProduct, updateProduct } from '../api/productsAPI'
import { Product } from '../types.d'

function Products() {
	const { isLoading, data, isError, error } = useQuery<Product[], Error>({
		queryKey: ['products'],
		queryFn: getProducts
	});

	const queryClient = useQueryClient();

	const deleteProductMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			console.log('Product deleted!')
			queryClient.invalidateQueries('products');
		}
	})

	const updateProdcutMutation = useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			console.log('Product updated!')
			queryClient.invalidateQueries('products');
		}
	})

	if (isLoading) return <h3>Loading...</h3>
	else if (isError) return <h3>Error: {error.message}</h3>

	return (
		<>
			data?.map(product => {
				<div key={product.id}>
					<h3>{product.name}</h3>
					<p>{product.description}</p>
					<p>{product.price}</p>
					<button onClick={() => {
						deleteProductMutation.mutate(product.id)
					}}>
						Delete
					</button>
					<input type="checkbox" checked={product.inStock} id={product.id} onChange={e => {
						updateProductMutation.mutate({
							...product,
							inStock: e.target.checked
						})
					}} />
						<label htmlFor="">In Stock</label>
				</div>
			})
		</>
	)
}

export default Products
```

## useInfiniteQuery

```tsx
// src/hooks/useFetchUsers.tsx
import { useInfiniteQuery } from "@tanstack/react-query";
import { UsersResponse } from "../../types.d";

const fetchUsers = async ({ pageParam = 0 }): Promise<UsersResponse> => {
  const response = await fetch(
    `https://dummyjson.com/users?limit=10&skip=${pageParam}&select=firstName,lastName,username,email,phone,address`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const useFetchUsers = () => {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
      const nextSkip = allPages.length * 10;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    initialPageParam: 0
  });
};

export default useFetchUsers;
```

```tsx
// src/App.tsx
function App() {
  const { data, error, fetchNextPage, isFetchingNextPage } = useFetchUsers();
  const users = data?.pages.flatMap((page) => page.users) ?? [];
  //...
}
```
