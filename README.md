# Palindrome Database

Simple in-memory database for palindrome strings

Stores palindrome strings, regardless of punctuation and space.

### How to run

- install yarn with `npm i -g yarn`
- clone the repo
- from the main project folder, execute `yarn` to install dependencies
- test the package using `yarn test`
- launch the service using `yarn start`

The `yarn start` command will start the server on localhost on port 29292.


### Endpoints

#### POST localhost:29292/palindromes

- Add a palindrome string to the database
- Returns true if the word is a palindrome, false otherwise
- Payload for the POST operation is `{ sentence: "a palindromic sentence" }`

#### GET localhost:29292/palindromes

- Get a list of the last 10 palindromes added in the last 10 minutes

#### DELETE localhost:29292/palindromes

- Only available when ENV=test
- Clears the store, removing all entries
