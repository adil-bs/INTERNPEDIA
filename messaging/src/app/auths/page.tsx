'use client'
import { auth, authPageData } from '@/types/auth'
import { Sync, Warning } from '@mui/icons-material'
import { Button, Tab, Tabs, TextField, TextFieldProps } from '@mui/material'
import React, { ChangeEvent, FC, useState } from 'react'
import { authenticate } from '../actions/auth'


const Page: FC = () => {
    const [currentAuth, setCurrentAuth] = useState<auth>('login')
    const [errMsgs, setErrMsgs] = useState<authPageData<string[]>>({
        login: [], signup: [],
    })
    const [loading, setLoading] = useState<boolean>(false)


    const inputProps: TextFieldProps[] = [
        {
            name: 'email',
            label: 'Enter email',
            required: true,
            placeholder: 'someone@mail.com'
        },
        {
            name: 'uname',
            label: 'Enter username',
            ...currentAuth === 'signup' ?
                { required: true } :
                { sx: { display: "none" } },
        },
        {
            name: 'pass',
            label: 'Enter password',
            required: true,
            type: 'password'
        },
        {
            name: 'confirmPass',
            label: 'Confirm password',
            type: 'password',
            ...currentAuth === 'signup' ?
                { required: true } :
                { sx: { display: "none" } },
        },
    ]

    const authArray: auth[] = ['login', 'signup']

    const formAction = (formData: FormData) => {
        authenticate(formData, currentAuth)
            .then(errorArray => setErrMsgs(prev => {

                return { ...prev, [currentAuth]: errorArray || [] }
            }))
            .catch(err => console.error(err))
            .finally(() => setLoading(false))
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='flex flex-col border-2 border-green-800 ring-4 ring-green-200 p-3 pb-6 rounded-lg w-5/6 max-w-[600px] h-full' >
                <Tabs
                    className='mb-8 self-center'
                    value={currentAuth}
                    onChange={(_, newValue: auth) => setCurrentAuth(newValue)}
                >
                    {authArray.map(authType =>
                        <Tab
                            key={authType}
                            label={authType}
                            value={authType}
                            sx={{
                                '&.MuiTab-root': {
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                }
                            }}
                        />
                    )}
                </Tabs>

                <div className='mb-5'>
                    {errMsgs[currentAuth].map((err, i) =>
                        <p key={i} className='flex items-center gap-2 font-bold text-red-500'>
                            <Warning fontSize={'inherit'} />
                            {err}
                        </p>
                    )}
                </div>

                {authArray.map(authType =>
                    <form
                        role='tabpanel'
                        onSubmit={() => setLoading(true)}
                        action={formAction}
                        className={`flex flex-col space-y-5 ${currentAuth !== authType ? 'hidden' : ''}`}
                        key={authType}
                    >
                        {inputProps.map(props =>
                            <TextField
                                key={props.name}
                                {...props}
                            />
                        )}
                        <Button
                            className='!mt-8'
                            type='submit'
                            disabled={loading}
                            startIcon={loading && <Sync className=' animate-spin' />}
                        >
                            {currentAuth}
                        </Button>
                    </form>
                )}

            </div>
        </div>
    )
}


export default Page