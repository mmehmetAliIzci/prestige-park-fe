export default async function PagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="flex-grow mt-20">{children}</div>;
}
