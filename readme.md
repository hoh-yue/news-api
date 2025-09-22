# NEWS API

## Prerequites

- Node.js v14+
- npm or yarn
- postman

## Installation

1. Clone the repository:

```bash
git clone <repo>
cd <repo>
```

2. Install dependencies:

```node
npm install
# or
yarn install
```

3. Create a `.env` file in the project root:

```env
GNEWS_API_KEY=<your_gnews_api_key>
PORT=3000
GNEWS_BASE_URL=https://gnews.io/api/v4
CACHE_DURATION=300
```

## Running the Server

```bash
npm start
```

Visit http://localhost:3000 in your browser.

## Project Structure

```
project/
 |--node_modules/
 |--src/
 |   |--server.js                   # Main server entry point
 |
 |--.env                            # Environment variables
 |--package-lock.json               # Lock file for dependencies
 |--package.json                    # Package information
 |--README.md
```

## Example Usage

Use postman to test the News API server.

### Steps in Postman

1. Open postman and select **GET** method.
2. Enter the URL and the params.
3. Click on **Send** button.
4. You should see the response.

##

### Default Route

```
GET http://localhost:3000/
```

### Response:

```json
Hello from new api!
```

##

### GET headlines

This endpoint allows you to search for current trending articles, the articles that are selected to be returned by this endpoint are based on the Google News ranking. There are 9 categories available, the default category is "general".

```
GET http://localhost:3000/api/v1/headlines
```

### Request params:

| param    | default value | description                                                                                                                                                                                                                                                                                    |
| -------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| category | general       | This parameter allows you to change the category for the request. The available categories are : general, world, nation, business, technology, entertainment, sports, science and health.                                                                                                      |
| lang     | en            | This parameter allows you to specify the language of the news articles returned by the API. You have to set as value the 2 letters code of the language you want to filter. See the list of [supported languages](https://docs.gnews.io/endpoints/top-headlines-endpoint#supported-languages). |
| page     | 1             | This parameter allows you to control the pagination of the results returned by the API.                                                                                                                                                                                                        |
| max      | 10            | This parameter allows you to specify the number of news articles returned by the API. The minimum value of this parameter is 1 and the maximum value is 100. The value you can set depends on your subscription. See the [pricing](https://gnews.io/pricing) for more information.             |

### Response:

```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "content": "string",
      "url": "string",
      "image": "string",
      "publishedAt": "string",
      "lang": "string",
      "source": {
        "id": "string",
        "name": "string",
        "url": "string",
        "country": "string"
      }
    }
  ],
  "total": "number",
  "page": "number",
  "max": "number"
}
```

##

### GET SEARCH NEWS BY TITLE | KEYWORDS | AUTHOR

This endpoint allows you to search for current trending articles, the articles that are selected to be returned by this endpoint are based on the Google News ranking. There are 9 categories available, the default category is "general".

```
GET http://localhost:3000/api/v1/headlines?category=<category>&lang=<lang>&page=<page>&max=<max>&api_key=<api_key>
```

### Request params:

| param | default value | description                                                                                                                                                                                                                                                                                                                                                       |
| ----- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| q     | string        | **This parameter is mandatory.** This parameter allows you to specify your search keywords to find the news articles you are looking for. The keywords will be used to return the most relevant articles. It is possible to use logical operators with keywords, see the section on [query syntax](https://docs.gnews.io/endpoints/search-endpoint#query-syntax). |
| lang  | en            | This parameter allows you to specify the language of the news articles returned by the API. You have to set as value the 2 letters code of the language you want to filter. See the list of [supported languages](https://docs.gnews.io/endpoints/top-headlines-endpoint#supported-languages).                                                                    |
| page  | 1             | This parameter allows you to control the pagination of the results returned by the API.                                                                                                                                                                                                                                                                           |
| max   | 10            | This parameter allows you to specify the number of news articles returned by the API. The minimum value of this parameter is 1 and the maximum value is 100. The value you can set depends on your subscription. See the [pricing](https://gnews.io/pricing) for more information.                                                                                |

### Response:

```json
{
  "data": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "content": "string",
      "url": "string",
      "image": "string",
      "publishedAt": "string",
      "lang": "string",
      "source": {
        "id": "string",
        "name": "string",
        "url": "string",
        "country": "string"
      }
    }
  ],
  "total": "number",
  "page": "number",
  "max": "number"
}
```
