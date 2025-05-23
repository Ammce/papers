# YouTube Comments Data Collection

This project contains a script for collecting comments from YouTube videos and saving them to a CSV file for further analysis.

## CSV File Structure

The generated CSV file has the following columns:

- `row_id`: Unique identifier for each comment
- `comment_text`: The actual text content of the YouTube comment
- `human_label`: Label assigned by human annotators
- `gpt_pred`: Prediction from GPT model
- `gemini_pred`: Prediction from Gemini model
- `claude_pred`: Prediction from Claude model

The CSV file is formatted with:

- A header row containing all column names
- One comment per line
- UTF-8 encoding

## Data Collection Script

The `data-collection-script.ts` is a TypeScript script that fetches comments from a specified YouTube video and saves them to a CSV file.

### Prerequisites

- Node.js installed
- YouTube Data API key
- Required npm packages:
  ```bash
  npm install googleapis
  npm install --save-dev @types/node
  ```

### Configuration

Before running the script, you need to set up two constants in the script:

1. `GOOGLE_API_KEY`: Your YouTube Data API key
2. `VIDEO_ID`: The ID of the YouTube video you want to collect comments from

### Features

- Fetches all comments from a specified YouTube video
- Handles pagination automatically
- Cleans comment text (removes newlines, escapes quotes)
- Saves comments to a CSV file named `comments_[VIDEO_ID].csv`
- Includes error handling for API requests

### Usage

1. Install dependencies:

   ```bash
   npm install
   ```

2. Update the configuration in `data-collection-script.ts`:

   ```typescript
   const GOOGLE_API_KEY = "your-api-key";
   const VIDEO_ID = "your-video-id";
   ```

3. Run the script:
   ```bash
   ts-node data-collection-script.ts
   ```

### Output

The script will:

1. Fetch all comments from the specified video
2. Save them to a CSV file in the current working directory
3. Log the number of comments found and the output file path

### Error Handling

The script includes error handling for:

- API request failures
- Invalid video IDs
- File system operations

If any errors occur during execution, they will be logged to the console.
