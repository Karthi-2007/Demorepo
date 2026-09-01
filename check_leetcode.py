import urllib.request
import json
import ssl

ctx = ssl._create_unverified_context()
username = "AfgkZ9Jo50"

url = "https://leetcode.com/graphql"
payload = {
    "query": """
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
        }
      }
    }
    """,
    "variables": {"username": username}
}

headers = {
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Referer": f"https://leetcode.com/u/{username}/"
}

try:
    req = urllib.request.Request(url, data=json.dumps(payload).encode("utf-8"), headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
        res = json.loads(resp.read().decode("utf-8"))
        user = res["data"]["matchedUser"]
        ac_num = user["submitStatsGlobal"]["acSubmissionNum"]
        
        total = next(item["count"] for item in ac_num if item["difficulty"] == "All")
        easy = next(item["count"] for item in ac_num if item["difficulty"] == "Easy")
        medium = next(item["count"] for item in ac_num if item["difficulty"] == "Medium")
        hard = next(item["count"] for item in ac_num if item["difficulty"] == "Hard")
        ranking = user["profile"]["ranking"]

        print("=== OFFICIAL LEETCODE GRAPHQL PARSED ===")
        print(f"Username: {username}")
        print(f"Total Solved: {total}")
        print(f"Easy Solved: {easy}")
        print(f"Medium Solved: {medium}")
        print(f"Hard Solved: {hard}")
        print(f"Ranking: {ranking}")
except Exception as e:
    print("GraphQL Error:", e)
