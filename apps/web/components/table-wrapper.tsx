export function TableWrapper({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="w-full overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}
