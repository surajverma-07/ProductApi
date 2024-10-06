Sure! Here's a well-formatted version of the README that you can easily copy and paste into your GitHub repository:

```markdown
# Product Management API

This API allows you to manage products with features to add, update, and delete product details, including image uploads using Cloudinary.

## How to Use

### 1. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

### 2. Set Up Environment Variables

Check the `env.sample` file for the required environment variables. Create a `.env` file in the root directory and fill in all the necessary fields. **Ensure you provide your Cloudinary credentials to enable image uploads.**

Example `.env` file:

```plaintext
MONGO_URI=your_mongodb_uri_with_username_and_password
PORT=5000
CORS_ORIGIN=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Run the Application

Use the following command to start the server:

```bash
npm run dev
```

The server will start, and you can access the API at `http://localhost:5000`.

## API Endpoints

- **POST** `/api/product/add`: Add a new product.
- **PUT** `/api/product/update/:id`: Update product details.
- **PUT** `/api/product/update/image/:id`: Update product image.
- **GET** `/api/product/details/:id`: Get product details by ID.
- **DELETE** `/api/product/delete/:id`: Delete a product.
- **GET** `/api/product/all`: Retrieve all products.
```

You can simply copy this text and paste it into your `README.md` file on GitHub!
