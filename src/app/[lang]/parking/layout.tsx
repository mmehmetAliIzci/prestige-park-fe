export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='mt-20 flex-grow'>{children}</div>;
}
