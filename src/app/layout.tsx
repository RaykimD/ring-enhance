import './globals.css'

export const metadata = {
  title: '코창서버 반지 강화 시뮬레이터',
  description: '코창서버 반지 강화 시뮬레이터입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}