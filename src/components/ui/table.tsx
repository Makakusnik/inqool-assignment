import { cn } from "@/lib/utils";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  InitialTableState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Skeleton } from "./skeleton";

interface TableComponentProps<TData extends { id: string }> {
  data: TData[];
  filterState?: ColumnFiltersState;
  initialState?: InitialTableState;
  columns: ColumnDef<TData, any>[];
  title: string;
}

export function TableComponent<TData extends { id: string }>({ columns, data, title, filterState, initialState }: TableComponentProps<TData>) {
  const table = useReactTable<TData>({
    columns,
    data,
    initialState: initialState ?? {
      sorting: [
        {
          id: "name",
          desc: false,
        },
      ],
    },
    state: {
      columnFilters: filterState,
    },
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 bg-neutral-900 flex flex-col items-center justify-center w-full ">
      <div className="w-full bg-neutral-800 rounded-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">{title}</h2>
        <div className="rounded-sm h-[calc(100vh-10%)] lg:h-[calc(100vh-40rem)] overflow-y-auto">
          <table className="min-w-full overflow-y-auto">
            <thead className="bg-neutral-900 sticky z-10 top-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider rounded-xs">
                      <div
                        {...{
                          className: cn(header.column.getCanSort() && "cursor-pointer select-none inline-flex items-center"),
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        <span className="inline-flex">
                          {
                            {
                              asc: <ArrowUp className="w-4 h-4" />,
                              desc: <ArrowDown className="w-4 h-4" />,
                            }[header.column.getIsSorted() as string]
                          }
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-neutral-800 divide-y divide-neutral-700">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-neutral-700">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-100">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {data.length === 0 && <p className="text-center text-neutral-500 py-4">No data available.</p>}
        </div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <>
      <Skeleton className="w-full h-24 "></Skeleton>
      <Skeleton className="w-full h-8 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
      <Skeleton className="w-full h-12 mt-2"></Skeleton>
    </>
  );
}
