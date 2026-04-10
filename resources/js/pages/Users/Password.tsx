import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { CircleCheckBig } from 'lucide-react';
import  InputError  from "@/components/input-error";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/users';
import { password as editPassword } from '@/routes/users/edit';
import { password as updatePassword } from '@/routes/users/update';
import type { BreadcrumbItem } from '@/types';
import type { GetOne } from '@/types/users';


export default function UsersCreate({user} : {user: GetOne}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Manage Users',
            href: index(),
        },
        {
            title: 'Change Password',
            href: editPassword(user.id)
        }
    ];

    const { data, setData, put, errors, reset, processing, recentlySuccessful } = useForm({
        'recent_password': '',
        'new_password': '',
        'password_confirmation': '',
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(updatePassword(user.id).url);
        reset();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add a new User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                    Change Password for {user.name}
                </h3>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    {/* div untuk input recent password */}
                    <div>
                        <Label htmlFor='recent_password'>Recent Password</Label>
                        <Input type='password' name='recent_password' id='recent_password' value={data.recent_password} onChange={(e) => setData('recent_password', e.target.value)}  />
                        <InputError className='mt-2' message={errors.recent_password} />
                    </div>
                    {/* div untuk input new password */}
                    <div>
                        <Label htmlFor='new_password'>New Password</Label>
                        <Input type='password' name='new_password'  id='new_password'  value={data.new_password} onChange={(e) => setData('new_password', e.target.value)}/>
                        <InputError className='mt-2' message={errors.new_password} />
                    </div>
                    {/* div untuk input password */}
                    <div>
                        <Label htmlFor='password_confirmation'>Confirm Password</Label>
                        <Input type='password' name='password_confirmation' id='password_confirmation' value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                        <InputError className='mt-2' message={errors.password_confirmation} />
                    </div>
                    {/* div untuk button submit */}
                    <div className='flex justify-end gap-4'>
                        <Button type='submit' disabled={processing}>Save</Button>

                        <Transition show={recentlySuccessful} enter='transition ease-in-out' enterFrom='opacity-0' leave='transition ease-in-out' leaveTo='opacity-0'>
                            <span>
                                <CircleCheckBig className='mx-auto text-xs text-gray-600'/>
                                <p className='text-sm text-gray-600 my-auto'>
                                    Saved.
                                </p>
                            </span>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
