import { Head, router } from '@inertiajs/react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/users';
import type { BreadcrumbItem } from '@/types';
import type { PaginatedUsers } from '@/types/users';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: index(),
    },
];

export default function UsersIndex({ users }: { users: PaginatedUsers }) {
    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Table User
                </h3>
                <Table>
                    <TableCaption>List of users</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-25">#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.map((user, idx) => (
                            <TableRow key={user.id}>
                                <TableCell>{(users.current_page - 1) * users.per_page + idx + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-right">#</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {users.last_page > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(users.prev_page_url);
                                    }}
                                    aria-disabled={!users.prev_page_url}
                                    className={!users.prev_page_url ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                            {users.links.slice(1, -1).map((link) => (
                                <PaginationItem key={link.label}>
                                    <PaginationLink
                                        href="#"
                                        isActive={link.active}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePageChange(link.url);
                                        }}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handlePageChange(users.next_page_url);
                                    }}
                                    aria-disabled={!users.next_page_url}
                                    className={!users.next_page_url ? 'pointer-events-none opacity-50' : ''}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </AppLayout>
    );
}
