# Book Vending Machine

## config env file

you can config by changing things in .env-sample then rename it to .env

## run project

```
npm install
npm start
```

## API Path

### books

```
POST /api/books/add
body: {
    "name": string,
    "description": string,
    "category": string,
    "price": number
}


GET  /api/books/find
query: name or category
example:  /api/books/find?name=bookName
          /api/books/find?category=categoryName
          /api/books/find?name=bookName&category=categoryName


PUT  /api/books/edit/:name
body: {
    "name": string,
    "description": string,
    "category": string,
    "price": number
}
**Note** if you want to edit some property, simple put
     {
          "property1: "value",
          "property1: "value",
          ...
     }


DELETE /api/books/remove/:name
example /api/books/remove/bookname
```

### shelf

```
POST /api/shelves/add
... YEP! thats all it will just create an empty shelf with shelf number

DELETE  /api/shelves/remove/:shelf
example /api/shelves/remove/0
this will remove shelf 0 and all the book inside it
```