import '../globals.css';

export const metadata = {
    title: 'Ayris Tech | Admin Dashboard',
    description: 'AI Solutions Dashboard - Ayris Intelligence Hub',
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body style={{ margin: 0 }}>
                <div className="admin-root">
                    {children}
                </div>
            </body>
        </html>
    );
}
