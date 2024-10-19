---
title: Ferraz Delivery App
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.23"

---

# Ferraz Delivery App

Base URLs:

# Authentication

# Encaocontros

## GET Pegar o usuário pelo id

GET /users/2

> Response Examples

> 200 Response

```json
{
  "user_id": 0,
  "name": "string",
  "phone": "string",
  "email": "string",
  "user_type": "string",
  "cpf": "string",
  "birthday": "string",
  "password": "string",
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|none|Inline|

### Responses Data Schema

HTTP Status Code **200**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» user_id|integer|true|none||none|
|» name|string|true|none||none|
|» phone|string|true|none||none|
|» email|string|true|none||none|
|» user_type|string|true|none||none|
|» cpf|string|true|none||none|
|» birthday|string|true|none||none|
|» password|string|true|none||none|
|» createdAt|string|true|none||none|
|» updatedAt|string|true|none||none|

## POST Criar um usuário

POST /users

> Body Parameters

```json
{
  "user_type": "cliente",
  "name": "Fulano de Tal",
  "phone": "55988888888",
  "email": "fulano@example.com",
  "cpf": "12345678902",
  "birthday": "1990-01-02",
  "password": "senha236"
}
```

### Params

|Name|Location|Type|Required|Description|
|---|---|---|---|---|
|body|body|object| no |none|

> Response Examples

> 201 Response

```json
{
  "user_id": 0,
  "user_type": "string",
  "name": "string",
  "phone": "string",
  "email": "string",
  "cpf": "string",
  "birthday": "string",
  "password": "string",
  "updatedAt": "string",
  "createdAt": "string"
}
```

### Responses

|HTTP Status Code |Meaning|Description|Data schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|none|Inline|

### Responses Data Schema

HTTP Status Code **201**

|Name|Type|Required|Restrictions|Title|description|
|---|---|---|---|---|---|
|» user_id|integer|true|none||none|
|» user_type|string|true|none||none|
|» name|string|true|none||none|
|» phone|string|true|none||none|
|» email|string|true|none||none|
|» cpf|string|true|none||none|
|» birthday|string|true|none||none|
|» password|string|true|none||none|
|» updatedAt|string|true|none||none|
|» createdAt|string|true|none||none|

# Data Schema

