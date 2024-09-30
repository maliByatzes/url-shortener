# 🦋 url-shortener

A simple URL Shortener Service implemented with Redis caching.

## 🦇 Features

- ⭐ User can submit a long url and recieve a shortened url.
- ⭐ User can share that short url which can be used anywhere to access
the original url without having to remember the whole url.
- ⭐ Caching is implemented for already accessed for very fast access times.

## 🐎 Tech Stack

- ⭐ **Bun.sh**: A fast all-in-one JavaScript runtime.
- ⭐ **Hono.dev**: Ultrafast web framework for the Edges.
- ⭐ **Typescript**: JavaScript with syntax for types.
- ⭐ **MongoDB**: Document-oriented database for storing data.
- ⭐ **Redis**: World’s fastest in-memory database.

## 🐺 Application

### 🦅 Run the application locally

#### 🐝 Prerequisites

- [Bun.sh](https://bun.sh)

#### 🐻‍❄️ Instatllation

1. Clone the repository
   ```sh
   git clone https://github.com/maliByatzes/url-shortener
   cd url-shortener
   ```

2. Install the dependencies
   ```sh
   bun install
   ```

#### 🐸 Configuration

1. Create an .env file in the project's root directory.

2. Add the base url in the .env file:
   ```env
   BASE=http://localhost:3000
   ```

3. Get the MongoDB url from [their](https://cloud.mongodb.com/) site or you
   can set up a local mongodb connection, either way works:
   ```env
   MONGODB_URI=...
   ```

4. Set up a online or local redis database and add its connection url:
   ```env
   REDIS_URL=...
   ```

#### 🐗 Usage

1. Run the server:
   ```sh
   bun start
   ```

#### API Endpoints

- **POST**: `/short` - post a long url to get a shorter one.
  ```sh
  curl --request POST \
  --url localhost:3000/short \
  --header 'Content-Type: application/json' \
  --data '{
	"origUrl": "some long valid url here"
   }'
  ```

- Visit the returned short url on your browser to get redirected to the long url.

### 🦕 Deployed Application

- To avoid the tedious setup, the application is already deployed. Use the below POST
command to requst a shortned URL. But of course the service I used gave a not so
short base URL but the service works as expected.

- **POST**: `/short` - post a long url to get a shorter one.
  ```sh
  curl --request POST \
  --url https://short-url-v0sc.onrender.com/short \
  --header 'Content-Type: application/json' \
  --data '{
	"origUrl": "some long valid url here"
   }'
  ```
  
- Visit the returned short url on your browser to get redirected to the long url.

## 🦝 License

This project is licensed under MIT License.

## 🦦 Contact

- [maliByatzes](mailto:malib2027@gmail.com)
- [Project repository](https://github.com/maliByatzes/url-shortener)
