import { getSortedPostsData } from "../../scripts/blog";

const posts =
  process.env.NODE_ENV === "production"
    ? require("../../cache/data").posts
    : getSortedPostsData();

export default (req: any, res: any) => {
  const results = req.query.q
    ? posts.filter((post: any) =>
        post.title.toLowerCase().includes(req.query.q)
      )
    : [];
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};
