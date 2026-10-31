export async function GET() {
  const apiUrl = process.env.BLOG_API_URL;

  if (!apiUrl) {
    return Response.json({ posts: [], error: null }, { status: 200 });
  }

  const controller = new AbortController();
  // 25s timeout — gives Render free tier enough time to wake up,
  // but doesn't hang the client skeleton forever.
  const timeoutId = setTimeout(() => controller.abort(), 25000);

  try {
    const res = await fetch(`${apiUrl}/v1/blog/posts?limit=50`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      // API responded but returned an error (e.g. 500, 503 from Render proxy)
      return Response.json(
        { posts: [], error: 'api_error' },
        { status: res.status }
      );
    }

    const json = await res.json();
    const all = json?.data?.results ?? json?.data ?? [];
    const posts = all
      .filter((p) => p.isPortfolio === true && p.isDraft !== true)
      .slice(0, 3);

    return Response.json({ posts });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      // Render is waking up but timed out
      return Response.json({ posts: [], error: 'timeout' }, { status: 504 });
    }
    // Truly unreachable (network down, service not deployed, etc.)
    return Response.json({ posts: [], error: 'unreachable' }, { status: 503 });
  }
}

