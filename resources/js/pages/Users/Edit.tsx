import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { CircleCheckBig } from 'lucide-react';
import  InputError  from "@/components/input-error";
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
} from "@/components/ui/select";
import AppLayout from '@/layouts/app-layout';
import { index, edit, update } from '@/routes/users';
import type { BreadcrumbItem } from '@/types';
import type { GetOne } from '@/types/users';


export default function UsersEdit({ user }: { user: GetOne }) {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manage Users',
            href: index(),
        },
        {
            title: 'Edit User',
            href: edit(user.id)
        }
    ];

    const { data, setData, put, errors, reset, processing, recentlySuccessful } = useForm({
        'name': user.name,
        'role': user.role,
        'email': user.email,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(update(user.id).url);
        reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit an User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Create a New User
                </h3>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* div untuk input name */}
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <Input type='text' name='name' id='name' value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <InputError className='mt-2' message={errors.name} />
                    </div>
                    {/* div untuk select role */}
                    <div>
                        <Label htmlFor='role'>Role</Label>
                        <Select name='role' value={data.role} onValueChange={(e) => setData('role', e)}>
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
                        <InputError className='mt-2' message={errors.role} />
                    </div>
                    {/* div untuk input email */}
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <Input type='Email' name='email' id='email' value={data.email} onChange={(e) => setData('email', e.target.value)}  />
                        <InputError className='mt-2' message={errors.email} />
                    </div>
                    {/* div untuk button submit */}
                    <div className='flex justify-end gap-4'>
                        <Button type='submit' disabled={processing}>Edit</Button>

                        <Transition show={recentlySuccessful} enter='transition ease-in-out' enterFrom='opacity-0' leave='transition ease-in-out' leaveTo='opacity-0'>
                            <span>
                                <CircleCheckBig className='mx-auto text-xs text-gray-600'/>
                                <p className='text-sm text-gray-600 my-auto'>
                                    Edited.
                                </p>
                            </span>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
