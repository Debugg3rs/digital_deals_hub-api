# Project: Digital Deals Hub - Debugg3rs
BASE_URL: [https://digital-deals-hub.onrender.com](https://digital-deals-hub.onrender.com)/api/v1
# 📁 Collection: User 
Contains user related APIs to manage user account

BASE ENDPOINT: /users/ 


## End-point: Get regular users
### Method: GET
>```
>{{local_url}}/users
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get a regular user
### Method: GET
>```
>{{live_url}}/users/:id
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get vendors
### Method: GET
>```
>{{live_url}}/users/?filter={"role":"vendor"}
>```
### Query Params

|Param|value|
|---|---|
|filter|{"role":"vendor"}|



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get authenticated user
The `GET /users/me` endpoint retrieves the user's details. The response is a JSON object with the following schema:

``` json
{
    "type": "object",
    "properties": {
        "verified": {
            "type": "boolean"
        },
        "name": {
            "type": "string"
        },
        "email": {
            "type": "string"
        },
        "role": {
            "type": "string"
        },
        "createdAt": {
            "type": "string"
        },
        "updatedAt": {
            "type": "string"
        },
        "id": {
            "type": "string"
        }
    }
}

 ```
### Method: GET
>```
>{{live_url}}/users/me
>```
### Response: 200
```json
{
    "verified": false,
    "name": "TImothy",
    "email": "tim.edu@gmail.com",
    "role": "superadmin",
    "createdAt": "2025-03-24T14:10:14.683Z",
    "updatedAt": "2025-03-24T14:10:14.683Z",
    "id": "67e167c63d8165e0529aa6f5"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Signup
### Register User

This endpoint is used to register a new user.

#### Request Body

- name (string, required): The name of the user.
    
- email (string, required): The email address of the user.
    
- password (string, required): The password for the user account. A password must at least 6 characters, the password must be at least 1 upper case, 1 lower case, 1 number and 1 special character.
    
- confirmPassword (string, required): The confirmation of the password. This must reference 'password' and must always go with 'password'
    
- role (string, required): The role of the user, e.g. superadmin, vendor, user, etc.
    

#### Response

The response for this request is a JSON schema with the following properties:

- No specific properties were returned in the last response.
### Method: POST
>```
>{{local_url}}/users/register
>```
### Body (**raw**)

```json
{
    "name": "Felix Essuman",
    "email": "nyhirakwame@gmail.com",
    "password": "45We@rthf",
    "confirmPassword": "45We@rthf",
    "role": "vendor"
}
```

### Response: 201
```json
"User registered successfully"
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Activate account
## Activate User Account

This endpoint is used to activate a user account by providing the activation code.

### Request Body

- `code` (number) - The activation code.
    

#### Example

``` json
{
  "code": 512385
}

 ```

### Response

- Status: 200
    
- Content-Type: application/json
    

#### Response Body

``` json
{
  "message": ""
}

 ```
### Method: POST
>```
>{{local_url}}/users/activate-account
>```
### Body (**raw**)

```json
{
    "code": 512385
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: undefined
```json
{
    "mrssage": ""
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Login
### User Login

This endpoint allows users to log in by providing their email and password.

#### Request Body

- `email`: (string) The email of the user.
    
- `password`: (string) The password of the user.
    

#### Response

- Status: 200
    
- Content-Type: application/json
    

Example Response:

``` json
{
    "accessToken": "",
    "user": {
        "id": "",
        "role": "",
        "name": ""
    }
}

 ```
### Method: POST
>```
>{{live_url}}/users/login
>```
### Body (**raw**)

```json
{
    // "email": "tim.edu@gmail.com",
    // "password": "35We@rthf"
    "email": "nyhirakwame@gmail.com",
    "password": "45We@rthf67"
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTE2N2M2M2Q4MTY1ZTA1MjlhYTZmNSIsImlhdCI6MTc0MjgzMzI5NCwiZXhwIjoxNzQyOTE5Njk0fQ.L2dxjW8WmCLUa0GjoXWCA5o4H6yltnIVnD8kMJLu_Yo",
    "user": {
        "id": "67e167c63d8165e0529aa6f5",
        "role": "superadmin",
        "name": "TImothy"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Change a user role
### Update User Role

This endpoint is used to update the role of a specific user.

Users with superadmin role can perform this action.

#### Request

- Method: PATCH
    
- Endpoint: `{{live_url}}/users/:id`
    
- { "role": "admin"}
    

#### Response

- Status: 200
    
- Content-Type: text/xml
    

#### JSON Schema

``` json
null

 ```
### Method: PATCH
>```
>{{live_url}}/users/:id
>```
### Body (**raw**)

```json
{
    "role": "user"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Change password
### Change User Password

This endpoint is used to update the password for a user.

#### Request

The HTTP PATCH request should be made to `{{local_url}}/users/change-password`.

The request body should be in raw format with the following parameters:

- `currentPassword` (string) : The current password of the user.
    
- `newPassword` (string) : The new password to be set. _New password must be at least 6 characters long. New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character._
    
- `confirmNewPassword` (string) : Confirmation of the new password.
    

#### Response

The response will be in JSON format with the following schema:

``` json
{
    "type": "object",
    "properties": {
        "message": {
            "type": "string"
        }
    }
}

 ```
### Method: PATCH
>```
>{{live_url}}/users/change-password
>```
### Body (**raw**)

```json
{
    "currentPassword": "45We@rthf",
    "newPassword": "35We@rthf",
    "confirmNewPassword": "35We@rthf"
}
```

### Response: undefined
```json
{
    "message": "Password changed successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Forgot password
### Update User's Forgotten Password

This endpoint is used to initiate the password reset process for a user by providing their email address.

**Request Body**

- email (string, required): The email address of the user who needs to reset their password.
    

**Response**  
The response is a JSON object with the following schema:

``` json
{
  "type": "object",
  "properties": {
    "message": {
      "type": "string"
    }
  }
}

 ```
### Method: PATCH
>```
>{{live_url}}/users/forgot-password
>```
### Body (**raw**)

```json
{
    "email": "nyhirakwame@gmail.com"
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "message": "If your email exists in our system, you will receive a reset link"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Reset password
### Reset Password

This endpoint is used to reset the password for a user.

#### Request

- Method: PATCH
    
- URL: `{{live_url}}/users/reset-password`
    
- Body:
    
    - `code` (number): The code sent to the user for verification.
        
    - `newPassword` (string): The new password for the user.
        
    - `confirmNewPassword` (string): Confirmation of the new password.
        

#### Response

The response for this request is a JSON object with the following schema:

``` json
{
  "type": "object",
  "properties": {
    "message": {
      "type": "string"
    }
  }
}

 ```

The response contains a `message` field which provides information about the status of the password reset operation.

#### Example

``` json
{
  "message": ""
}

 ```
### Method: PATCH
>```
>{{live_url}}/users/reset-password
>```
### Body (**raw**)

```json
{
    "code": 892627,
    "newPassword": "45We@rthf67",
    "confirmNewPassword": "45We@rthf67"
}
```

### 🔑 Authentication noauth

|Param|value|Type|
|---|---|---|


### Response: 200
```json
{
    "message": "Password reset successfully"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
# 📁 Collection: Advert 
Contains APIs to manage vendors' adverts  
  
BASE ENDPOINT: /adverts/ 


## End-point: Create advert
### Create a New Advert

This endpoint allows the user to create a new advert by providing the necessary details.

**Request Body**

- image (file): The image file for the advert.
    
- title (text): The title of the advert.
    
- description (text): The description of the advert.
    
- category (text): The category of the advert.
    
- price (text): The price of the advert.
    

**Response**

``` json
{
    "type": "object",
    "properties": {
        "message": {
            "type": "string"
        },
        "data": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "category": {
                    "type": "string"
                },
                "price": {
                    "type": "number"
                },
                "image": {
                    "type": "string"
                },
                "createdAt": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            }
        }
    }
}

 ```
### Method: POST
>```
>{{live_url}}/adverts
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|image|/C:/Users/mynpp/OneDrive/Pictures/Screenshots/Screenshot (6).png|file|
|title|Samgung K39 with solar charger|text|
|description|Brand new phone. battary last for years|text|
|category|smartphones|text|
|price|1200|text|


### Response: 201
```json
{
    "message": "Advert created successfully",
    "data": {
        "title": "TCL 2026 Laptop",
        "description": "brand new laptop without a charger",
        "category": "laptops",
        "price": 566,
        "image": "digital-deals-hub/advert-image/Screenshot (12).png",
        "createdAt": "2025-03-25T09:19:31.023Z",
        "updatedAt": "2025-03-25T09:19:31.023Z",
        "id": "67e27522b5ac7e2d63e71618"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get vendor own adverts
The `GET /adverts/vendor` endpoint retrieves a list of adverts from the server for an authenticated vendor based on the specified filters and sorting parameters.

- Method: GET
    
- URL: `{{live_url}}/adverts`
    
- Query Parameters:
    
    - filterType: category,title,\[lte or gte if filter by price\]
        
    - filter: e.g. laptops
        
    - sort: e.g. createdAt
        
    - order: desc, asc
        
    - page: e.g. 3
        
    - limit: e.g. 15
        

### Response

The response will be a JSON object with the following properties:

- `success` (boolean): Indicates whether the request was successful.
    
- `message` (string): A message related to the response, if any.
    
- `page` (number): The current page number of the results.
    
- `limit` (number): The maximum number of items per page.
    
- `totalPages` (number): The total number of pages available.
    
- `totalAdverts` (number): The total number of adverts matching the filters.
    
- `data` (array): An array of objects representing the adverts. Each object in the array will have the following properties:
    
    - `title` (string): The title of the advert.
        
    - `description` (string): The description of the advert.
        
    - `category` (string): The category of the advert.
        
    - `price` (number): The price of the advert.
        
    - `image` (string): The URL of the image associated with the advert.
        
    - `createdAt` (string): The date and time when the advert was created.
        
    - `updatedAt` (string): The date and time when the advert was last updated.
        
    - `id` (string): The unique identifier of the advert.
        

Example Response:

``` json
{
  "success": true,
  "message": "",
  "page": 0,
  "limit": 0,
  "totalPages": 0,
  "totalAdverts": 0,
  "data": [
    {
      "title": "",
      "description": "",
      "category": "",
      "price": 0,
      "image": "",
      "createdAt": "",
      "updatedAt": "",
      "id": ""
    }
  ]
}

 ```
### Method: GET
>```
>{{live_url}}/adverts/vendor?filterType=lte&filter=400&sort=createdAt&order=desc&page=3&limit=15
>```
### Query Params

|Param|value|
|---|---|
|filterType|lte|
|filter|400|
|sort|createdAt|
|order|desc|
|page|3|
|limit|15|


### Response: 200
```json
{
    "success": true,
    "message": "2 adverts found",
    "page": 1,
    "limit": 15,
    "totalPages": 1,
    "totalAdverts": 2,
    "data": [
        {
            "title": "TCL 2026 Laptop",
            "description": "brand new laptop without a charger",
            "category": "laptops",
            "price": 566,
            "image": "digital-deals-hub/advert-image/Screenshot (12).png",
            "createdAt": "2025-03-25T09:19:31.023Z",
            "updatedAt": "2025-03-25T09:19:31.023Z",
            "id": "67e27522b5ac7e2d63e71618"
        },
        {
            "title": "this is new advert",
            "description": "new advert description",
            "category": "smartphones",
            "price": 465,
            "image": "digital-deals-hub/advert-image/Screenshot (8).png",
            "createdAt": "2025-03-24T23:10:14.303Z",
            "updatedAt": "2025-03-24T23:10:14.303Z",
            "id": "67e1e656cb8a472b9815a91f"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get vendor advert by id
The endpoint retrieves information about a specific advert for a vendor based on the provided ID.

### Response

The response for this request follows the JSON schema below:

``` json
{
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
        },
        "category": {
            "type": "string"
        },
        "price": {
            "type": "number"
        },
        "image": {
            "type": "string"
        },
        "createdAt": {
            "type": "string"
        },
        "updatedAt": {
            "type": "string"
        },
        "id": {
            "type": "string"
        }
    }
}

 ```
### Method: GET
>```
>{{live_url}}/adverts/vendor/:id
>```
### Response: 200
```json
{
    "title": "TCL 2026 Laptop",
    "description": "brand new laptop without a charger",
    "category": "laptops",
    "price": 566,
    "image": "digital-deals-hub/advert-image/Screenshot (12).png",
    "createdAt": "2025-03-25T09:19:31.023Z",
    "updatedAt": "2025-03-25T09:19:31.023Z",
    "id": "67e27522b5ac7e2d63e71618"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get all adverts
### Get Adverts by Category, Title or Price

---

This endpoint retrieves a list of adverts filtered by category, with options to sort, paginate, and limit the results.

**Request**

- Method: GET
    
- URL: `{{live_url}}/adverts`
    
- Query Parameters:
    
    - filterType: category,title,\[lte or gte if filter by price\]
        
    - filter: e.g. laptops
        
    - sort: e.g. createdAt
        
    - order: desc, asc
        
    - page: e.g. 3
        
    - limit: e.g. 15
        

**Response**

- Status: 200
    
- Content-Type: application/json
    
- { "success": true, "message": "", "page": 0, "limit": 0, "totalPages": 0, "totalAdverts": 0, "data": \[ { "title": "", "description": "", "category": "", "price": 0, "image": "", "createdAt": "", "updatedAt": "", "id": "" } \]}  
    The response includes a boolean "success" flag, along with pagination details and an array of adverts data, each containing title, description, category, price, image, createdAt, updatedAt, and id.
### Method: GET
>```
>{{local_url}}/adverts?filterType=lte&filter=2200&sort=createdAt&order=desc&page=3&limit=15
>```
### Query Params

|Param|value|
|---|---|
|filterType|lte|
|filter|2200|
|sort|createdAt|
|order|desc|
|page|3|
|limit|15|


### Response: 200
```json
{
    "success": true,
    "message": "1 advert found'",
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "totalAdverts": 1,
    "data": [
        {
            "title": "TCL 2026 Laptop",
            "description": "brand new laptop without a charger",
            "category": "laptops",
            "price": 566,
            "image": "digital-deals-hub/advert-image/Screenshot (12).png",
            "createdAt": "2025-03-25T09:19:31.023Z",
            "updatedAt": "2025-03-25T09:19:31.023Z",
            "id": "67e27522b5ac7e2d63e71618"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get advert by id
### Get Advert by ID

This endpoint retrieves the details of a specific advert based on the provided ID.

#### Response

The response will be a JSON object with the following properties:

- object containing advert objects with the following properties:
    
    - `title` (string): The title of the advert.
        
    - `description` (string): The description of the advert.
        
    - `category` (string): The category of the advert.
        
    - `price` (number): The price of the advert.
        
    - `image` (string): The URL of the advert image.
        
    - `createdAt` (string): The creation date of the advert.
        
    - `updatedAt` (string): The last update date of the advert.
        
    - `id` (string): The unique ID of the advert.
        

#### Example

``` json
    {
      "title": "",
      "description": "",
      "category": "",
      "price": 0,
      "image": "",
      "createdAt": "",
      "updatedAt": "",
      "id": ""
    }

 ```
### Method: GET
>```
>{{live_url}}/adverts/:id
>```
### Query Params

|Param|value|
|---|---|
|id||


### Response: 200
```json
{
    "success": true,
    "message": "1 advert found",
    "page": 1,
    "limit": 15,
    "totalPages": 1,
    "totalAdverts": 1,
    "data": [
        {
            "title": "TCL 2026 Laptop",
            "description": "brand new laptop without a charger",
            "category": "laptops",
            "price": 566,
            "image": "digital-deals-hub/advert-image/Screenshot (12).png",
            "createdAt": "2025-03-25T09:19:31.023Z",
            "updatedAt": "2025-03-25T09:19:31.023Z",
            "id": "67e27522b5ac7e2d63e71618"
        }
    ]
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update vendor advert
### Update Advert by Vendor

This endpoint allows the vendor to update an existing advert.

Method: PUT  
Content-Type: application/json

#### Request Body

- title (string, required): The title of the advert.
    
- description (string, required): The description of the advert.
    
- category (string, required): The category of the advert.
    
- price (number, required): The price of the advert.
    

Example:

``` json
{
  "title": "TCL 2026 Laptop for sale",
  "description": "brand new laptop without a cha ...",
  "category": "laptops",
  "price": 400
}

 ```

#### Response

The response will be in JSON format and follows the schema below:

``` json
{
  "type": "object",
  "properties": {
    "message": {
      "type": "string"
    },
    "data": {
      "type": "object",
      "properties": {
        "title": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "category": {
          "type": "string"
        },
        "price": {
          "type": "number"
        },
        "image": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        },
        "updatedAt": {
          "type": "string"
        },
        "id": {
          "type": "string"
        }
      }
    }
  }
}

 ```
### Method: PUT
>```
>{{live_url}}/adverts/vendor/:id
>```
### Body (**raw**)

```json
{
    "title": "TCL 2026 Laptop for sale",
    "description": "brand new laptop without a charger",
    "category": "laptops",
    "price": 400
}
```

### Response: 200
```json
{
    "message": "Advert updated successfully",
    "data": {
        "title": "TCL 2026 Laptop for sale",
        "description": "brand new laptop without a charger",
        "category": "laptops",
        "price": 400,
        "image": "digital-deals-hub/advert-image/Screenshot (12).png",
        "createdAt": "2025-03-25T09:19:31.023Z",
        "updatedAt": "2025-03-25T13:52:37.084Z",
        "id": "67e27522b5ac7e2d63e71618"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Update vendor advert image
### Update Advert Vendor

This endpoint is used to update a specific advert image for a vendor.

Method: PATCH

Endpoint: _/adverts/vendor/:id_

Content-Type: multipart

#### Request

The HTTP PATCH request should be sent to `{{live_url}}/adverts/vendor/:id`.

The request body should be of type form-data and include the following parameter:

- `image` (type: file) - The image to be updated for the advert.
    

#### Response

Upon a successful execution, the endpoint will return a JSON response with a status code of 200 and the following schema:

``` json
{
    "type": "object",
    "properties": {
        "message": {
            "type": "string"
        },
        "data": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "category": {
                    "type": "string"
                },
                "price": {
                    "type": "number"
                },
                "image": {
                    "type": "string"
                },
                "createdAt": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                }
            }
        }
    }
}

 ```

#### Example Response

``` json
{
    "message": "",
    "data": {
        "title": "",
        "description": "",
        "category": "",
        "price": 0,
        "image": "",
        "createdAt": "",
        "updatedAt": "",
        "id": ""
    }
}

 ```
### Method: PATCH
>```
>{{live_url}}/adverts/vendor/:id
>```
### Body formdata

|Param|value|Type|
|---|---|---|
|image|/C:/Users/mynpp/OneDrive/Pictures/Screenshots/Screenshot (2).png|file|


### Response: 200
```json
{
    "message": "Advert image updated successfully",
    "data": {
        "title": "TCL 2026 Laptop for sale",
        "description": "brand new laptop without a charger",
        "category": "laptops",
        "price": 400,
        "image": "digital-deals-hub/advert-image/Screenshot (2).png",
        "createdAt": "2025-03-25T09:19:31.023Z",
        "updatedAt": "2025-03-25T15:07:35.719Z",
        "id": "67e27522b5ac7e2d63e71618"
    }
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete vendor own advert
This endpoint is used to delete a specific advert belonging to a vendor based on the provided ID.

### Response

The response for this request returns a status code of 204, indicating a successful deletion of the advert. The Content-Type of the response is 'text/xml', and the response body is empty.

``` json
{
  "type": "object",
  "properties": {}
}

 ```
### Method: DELETE
>```
>{{live_url}}/adverts/vendor/:id
>```
### Response: 204
```json
null
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
