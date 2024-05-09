const app = require('./app');
const dotenv = require('dotenv');

// Load environment variables from .env file if present
dotenv.config();

const port = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
