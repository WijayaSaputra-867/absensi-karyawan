import { Head, router, Link } from '@inertiajs/react';
import { Ellipsis, Eye, SquarePen, Cog, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from '@/components/ui/input';
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
import { index, create } from '@/routes/users';
import type { BreadcrumbItem } from '@/types';
import type { PaginatedUsers } from '@/types/users';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: index(),
    },
];

export default function UsersIndex({ users }: { users: PaginatedUsers }) {
    const [search, setSearch] = useState('');
    const handlePageChange = (url: string | null) => {
        if (url) {
            router.get(url, {}, { preserveState: true, preserveScroll: true });
        }
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                index(),
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 500);

        return () => clearTimeout(timeout);
    }, [search]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Table User
                </h3>
                <div className="flex flex-row p-4">
                    <div className='w-1/2'>
                        <Link
                            href={create()}
                            className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
                        >
                            Add Users
                        </Link>
                    </div>
                    <div className='w-1/2'>
                        <Input
                            name='search'
                            type='text'
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder='Search by name ........'
                            className='w-full bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                        />
                    </div>
                </div>
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
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline"><Ellipsis/></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                            <DropdownMenuLabel>Management Account</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                    <Link href='#' className='flex gap-4'>
                                                        <Eye className='my-auto' /> Details
                                                    </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                    <Link href='#' className='flex gap-4'>
                                                        <SquarePen className='my-auto'/> Edit
                                                    </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                    <Link href='#' className='flex gap-4'>
                                                        <Cog className='my-auto'/> Edit Password
                                                    </Link>
                                            </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                            <DropdownMenuItem variant='destructive'>
                                                    <Trash2 className='my-auto'/> Delete
                                            </DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
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
