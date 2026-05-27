import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get('url')
  if (!url?.startsWith('https://www.figma.com/')) {
    return NextResponse.json({ error: 'Invalid Figma URL' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://www.figma.com/api/oembed?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 3600 } },
    )

    if (!res.ok) {
      return NextResponse.json({ error: 'Figma file not found' }, { status: 404 })
    }

    const data = (await res.json()) as {
      title?: string
      thumbnail_url?: string
    }

    return NextResponse.json({
      title: data.title ?? '',
      thumbnail_url: data.thumbnail_url ?? null,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch Figma preview' }, { status: 502 })
  }
}
