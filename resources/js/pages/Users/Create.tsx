import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AppLayout from '@/layouts/app-layout';
import { index, create, store } from '@/routes/users';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Users',
        href: index(),
    },
    {
        title: 'Add User',
        href: create()
    }
];

export default function UsersCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Create a New User
                </h3>
                <form className='space-y-4'>
                    {/* div untuk input name */}
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <Input type='text' name='name' required id='name' />
                    </div>
                    {/* div untuk select role */}
                    <div>
                        <Label htmlFor='role'>Role</Label>
                        <Select name='role'>
                            <SelectTrigger id='role' className="w-full">
                                <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="employee">Employee</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* div untuk input email */}
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='Email' name='email' id='email' required  />
                    </div>
                    {/* div untuk input password */}
                    <div>
                        <Label htmlFor='password'>Password</Label>
                        <Input type='password' name='password'  id='password' required  />
                    </div>
                    {/* div untuk input password */}
                    <div>
                        <Label htmlFor='password_confirmation'>Confirm Password</Label>
                        <Input type='password' name='password_confirmation' id='password_confirmation' />
                    </div>
                    {/* div untuk button submit */}
                    <div>
                        <Button type='submit'>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
