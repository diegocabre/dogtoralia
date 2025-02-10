
export default function AuthLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="bg-gray-500 flex flex-col justify-center items-center h-screen">
            {children}
        </main>
    );
}