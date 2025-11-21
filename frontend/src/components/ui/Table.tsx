"use client";

type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => React.ReactNode;
};

type TableProps<T> = {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
};

export const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "データがありません",
  className = "",
}: TableProps<T>) => {
  const getValue = (row: T, key: keyof T | string) => {
    if (typeof key === "string" && key.includes(".")) {
      return key.split(".").reduce((obj, k) => obj?.[k] as T, row);
    }
    return row[key as keyof T];
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const rowKey =
                (row.id as string | number) ||
                (row.key as string | number) ||
                JSON.stringify(row);
              const isEven = index % 2 !== 0;
              return (
                <tr
                  key={rowKey}
                  className={`${
                    isEven ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  {columns.map((column) => {
                    const value = getValue(row, column.key);
                    let displayValue: React.ReactNode;
                    if (column.render) {
                      displayValue = column.render(value, row);
                    } else if (typeof value === "object" && value !== null) {
                      displayValue = JSON.stringify(value);
                    } else {
                      displayValue = String(value ?? "");
                    }
                    return (
                      <td
                        key={String(column.key)}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {displayValue}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};
