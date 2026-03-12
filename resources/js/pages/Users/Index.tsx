import { Head } from '@inertiajs/react';
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
import type { BreadcrumbItem, User } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: index(),
    },
];

export default function UsersIndex({ users }: { users: User[] }) {
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
                        {users.map((user, index) => (
                            <TableRow key={user.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell className="text-right">#</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
