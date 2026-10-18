
@'
# Library Books REST API Design

## 1. List All Books

- **Method:** GET
- **Path:** `/api/books`
- **Description:** Retrieves all books in the library.
- **Success status:** `200 OK`
- **Request body:** None.

## 2. Get One Book

- **Method:** GET
- **Path:** `/api/books/{id}`
- **Description:** Retrieves a specific book using its unique ID.
- **Success status:** `200 OK`
- **Request body:** None.
- **Example:** `GET /api/books/12`

## 3. Create a Book

- **Method:** POST
- **Path:** `/api/books`
- **Description:** Adds a new book to the library.
- **Success status:** `201 Created`
- **Example request body:**

```json
{
  "title": "Introduction to Geography",
  "author": "Jane Wanjiku",
  "publishedYear": 2024,
  "isbn": "9781234567890"
}
```

## 4. Update a Book

- **Method:** PUT
- **Path:** `/api/books/{id}`
- **Description:** Updates the details of an existing book.
- **Success status:** `200 OK`
- **Example:** `PUT /api/books/12`
- **Example request body:**

```json
{
  "title": "Introduction to Geography",
  "author": "Jane Wanjiku",
  "publishedYear": 2025,
  "isbn": "9781234567890"
}
```

## 5. Delete a Book

- **Method:** DELETE
- **Path:** `/api/books/{id}`
- **Description:** Deletes a book using its unique ID.
- **Success status:** `204 No Content`
- **Example:** `DELETE /api/books/12`
- **Request body:** None.

## 6. List Books by Author

- **Method:** GET
- **Path:** `/api/books?author={authorName}`
- **Description:** Retrieves books written by the specified author using a query parameter.
- **Success status:** `200 OK`
- **Request body:** None.
- **Example:** `GET /api/books?author=Jane%20Wanjiku`

## Error Responses

### 400 Bad Request

- **Description:** The request contains invalid data.
- **Example:** Creating a book without a required title.
- **Example response:**

```json
{
  "error": "Bad Request",
  "message": "The title field is required."
}
```

### 404 Not Found

- **Description:** The requested resource does not exist.
- **Example:** Requesting a book with ID 9999 when no such book exists.
- **Example response:**

```json
{
  "error": "Not Found",
  "message": "No book exists with the requested ID."
}
```

## Summary

The API uses GET to retrieve books, POST to create books, PUT to update books, and DELETE to remove books. Query parameters support filtering books by author.
'@ | Set-Content -Encoding utf8 library-api.md
