export default function SFLayout({
  children,
}: {
  children: React.ReactNode
}) {
  {/* reactStrictMode: true, */ }

  return (
    // <StrictMode>
      <div className={`inter-default bg-white text-black`}>
        {children}
      </div>
    // </StrictMode>
  )
}
