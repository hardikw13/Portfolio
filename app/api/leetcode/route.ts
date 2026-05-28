import { NextResponse } from "next/server";

const LEETCODE_USERNAME = "hardik_1303";

const GRAPHQL_URL = "https://leetcode.com/graphql";

// Fetch recent accepted submissions for the user
const RECENT_AC_QUERY = `
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      id
      title
      titleSlug
      timestamp
      lang
    }
  }
`;

// Fetch problem details (difficulty, topic tags) by slug
const PROBLEM_DETAIL_QUERY = `
  query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      difficulty
      topicTags {
        name
      }
    }
  }
`;

async function gql(query: string, variables: Record<string, unknown>) {
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // LeetCode requires a Referer header
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query, variables }),
    // Revalidate every 5 minutes so the portfolio stays fresh
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`LeetCode GraphQL error: ${res.status}`);
  return res.json();
}

export async function GET() {
  try {
    // 1. Get the most recent accepted submission
    const acData = await gql(RECENT_AC_QUERY, {
      username: LEETCODE_USERNAME,
      limit: 1,
    });

    const submissions: {
      id: string;
      title: string;
      titleSlug: string;
      timestamp: string;
      lang: string;
    }[] = acData?.data?.recentAcSubmissionList ?? [];

    if (submissions.length === 0) {
      return NextResponse.json({ error: "No submissions found" }, { status: 404 });
    }

    const latest = submissions[0];

    // 2. Get difficulty + topic tags for that problem
    const detailData = await gql(PROBLEM_DETAIL_QUERY, {
      titleSlug: latest.titleSlug,
    });

    const question = detailData?.data?.question;
    const difficulty: string = question?.difficulty ?? "Unknown";
    const topicTags: { name: string }[] = question?.topicTags ?? [];
    const topic = topicTags[0]?.name ?? "Algorithms";

    // Normalise lang label (e.g. "java" → "Java")
    const langMap: Record<string, string> = {
      java: "Java",
      python3: "Python",
      python: "Python",
      cpp: "C++",
      c: "C",
      javascript: "JavaScript",
      typescript: "TypeScript",
      kotlin: "Kotlin",
      swift: "Swift",
      go: "Go",
      rust: "Rust",
    };
    const lang = langMap[latest.lang.toLowerCase()] ?? latest.lang;

    return NextResponse.json({
      title: latest.title,
      titleSlug: latest.titleSlug,
      difficulty,
      lang,
      topic,
      link: `https://leetcode.com/problems/${latest.titleSlug}/`,
      solvedAt: new Date(Number(latest.timestamp) * 1000).toISOString(),
    });
  } catch (err) {
    console.error("[/api/leetcode]", err);
    return NextResponse.json(
      { error: "Failed to fetch LeetCode data" },
      { status: 500 }
    );
  }
}
