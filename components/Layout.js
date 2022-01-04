export default function Layout({ children, className }) {
  return (
    <main className={`max-w-[975px] mx-auto mt-[90px] pb-[50px] ${className}`}>
      {children}
    </main>
  );
}
