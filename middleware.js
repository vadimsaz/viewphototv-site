export const config = {
  matcher: '/'
}

export default function middleware(request) {
  const ua = request.headers.get('user-agent') || ''

  // Smart TV user agents: Samsung Tizen, LG webOS, Android TV, Google TV,
  // Sony, Philips, HbbTV (standard for European smart TVs), Amazon Fire TV
  const isTV = /SmartTV|SMART-TV|Tizen|webOS|Web0S|AndroidTV|CrKey|PHILIPS|HbbTV|NetCast|BRAVIA|Viera|AppleTV|FireTV|Fire TV/i.test(ua)

  if (isTV) {
    return Response.redirect('https://app.viewphoto.tv', 302)
  }
}
