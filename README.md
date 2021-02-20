# Voting app API Back-end

## Usage

```sh
npm install
npm run build
npm start
```

# Overview

If is the first time that you run the project you need to execute the following endpoint

```sh
    method: POST
    /api/createCandidates
```

## Endpoints

## **Get candidates**

Returns array of json objects with all candidates.

-   **URL**

    /api/candidates

-   **Method:**

    `GET`

-   **Data Params**

    None

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:** `{ status : true, candidates : Array of all candidates }`

-   **Error Response:**

    -   **Code:** 400 <br />
        **Content:** `{ message : error }`

## **Get especific candidate**

Returns json with a single candidate.

-   **URL**

    /api/candidate/:id

-   **Method:**

    `GET`

-   **URL Params**

    **Required:**

    `id=[integer]`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:** `{ status : true, name : "Michael Bloom" }`

-   **Error Response:**

    -   **Code:** 400 <br />
        **Content:** `{ status : false , message : "The candidate ID is required." }`

        OR

    -   **Code:** 400 <br />
        **Content:** `{ status : false , message : "The candidate not exist." }`

## **Create candidates**

Create and delete all candidates from candidates table

-   **URL**

    /cantidate/createCandidates

-   **Method:**

    `POST`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:** `{ status : true, message : "Candidates was created successfully." }`

-   **Error Response:**

    -   **Code:** 400 <br />
        **Content:** `{ message : error }`

## **Set vote**

This endpoint allow set vote to specific candidate

-   **URL**

    /cantidate/setVote

-   **Method:**

    `PUT`

-   **URL Params**

    **Required:**

    `candidateID=[integer]`
    `symbol=[string] + || -`

-   **Success Response:**

    -   **Code:** 200 <br />
        **Content:** `{ status : true , candidate , message : "Candidate updated successfully." }`

-   **Error Response:**

    -   **Code:** 400 <br />
        **Content:** `{ status : false , message: "The number of votes of each candidate is 20" }`

    OR

    -   **Code:** 400 <br />
        **Content:** `{ status : false , message: "The number of votes of each candidate is 20" }`

    OR

    -   **Code:** 404 <br />
        **Content:** `{ status : false , message: "The candidate does not exist." }`

    OR

    -   **Code:** 400 <br />
        **Content:** `{ status : false , message: "There was an unknown error." }`
