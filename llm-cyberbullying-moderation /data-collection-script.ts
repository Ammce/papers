import { google } from "googleapis";
import * as fs from "fs";
import * as path from "path";

const GOOGLE_API_KEY = "YourId"; // Replace this with your YouTube video ID
const VIDEO_ID = "1234j"; // Replace this with your YouTube video ID

interface Comment {
  row_id: number;
  comment_text: string;
  human_label: string;
  gpt_pred: string;
  gemini_pred: string;
  claude_pred: string;
}

async function getVideoComments(videoId: string): Promise<Comment[]> {
  const youtube = google.youtube("v3");
  const comments: Comment[] = [];
  let nextPageToken: string | undefined;
  let rowId = 1;

  do {
    try {
      const response = await youtube.commentThreads.list({
        key: GOOGLE_API_KEY,
        part: ["snippet"],
        videoId: videoId,
        maxResults: 100,
        pageToken: nextPageToken,
        order: "time",
      });

      if (response.data.items) {
        for (const item of response.data.items) {
          if (item.snippet?.topLevelComment?.snippet) {
            comments.push({
              row_id: rowId++,
              comment_text:
                item.snippet.topLevelComment.snippet.textOriginal || "",
              human_label: "",
              gpt_pred: "",
              gemini_pred: "",
              claude_pred: "",
            });
          }
        }
      }

      nextPageToken = response.data.nextPageToken ?? undefined;
    } catch (error) {
      console.error("Error fetching comments:", error);
      break;
    }
  } while (nextPageToken);

  return comments;
}

function saveToCSV(comments: Comment[], videoId: string) {
  const header =
    "row_id,comment_text,human_label,gpt_pred,gemini_pred,claude_pred\n";

  const csvContent = comments
    .map((comment) => {
      const escapedText = comment.comment_text
        .replace(/"/g, '""')
        .replace(/[\r\n]+/g, " ")
        .trim();
      return `${comment.row_id},"${escapedText}",${comment.human_label},${comment.gpt_pred},${comment.gemini_pred},${comment.claude_pred}`;
    })
    .join("\n");

  const outputPath = path.join(process.cwd(), `comments_${videoId}.csv`);

  fs.writeFileSync(outputPath, header + csvContent);
  console.log(`Comments saved to ${outputPath}`);
}

async function main() {
  console.log(`Fetching comments for video ID: ${VIDEO_ID}`);
  const comments = await getVideoComments(VIDEO_ID);
  console.log(`Found ${comments.length} comments`);

  saveToCSV(comments, VIDEO_ID);
}

main().catch(console.error);
