import { logoutService } from '@/service/auth.service'
import { useRoleStore } from '@/store/role'
import { removeAccessToken, removeRefreshToken } from '@/utils/token'
import { ChevronRight, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const ProfileMenu = ({setShowMenu}: any) => {
    const router = useRouter();
    const {clearRole} = useRoleStore()
    const [loading, setLoading] = useState(false)
    const logOut = async () => {
        setLoading(true)
        try {
            await logoutService();
            clearRole();
            removeAccessToken();
            removeRefreshToken();
            router.replace('/user/auth/login')
        } catch(error: any) {

        } finally {
            setLoading(false)
        }
    }
  return (
    <div className='text-text space-y-2'>
        <div className='bg-white shadow-lg rounded-xl border border-gray-200'>
            <Link href={'/dashboard/profile'} className='flex items-center justify-between py-[16px] px-[24px]'>
                <div className='flex items-center gap-3'>
                    <User className='w-[24px] h-[24px]' />
                    <p className='text-[16px] font-light'>My Profile</p>
                </div>
                <ChevronRight className='w-[20px] h-[20px]' />
            </Link>
            <Link href={''} className='flex items-center justify-between py-[16px] px-[24px]'>
                <div className='flex items-center gap-3'>
                    <Settings className='w-[24px] h-[24px]' />
                    <p className='text-[16px] font-light'>Settings</p>
                </div>
                <ChevronRight className='w-[20px] h-[20px]' />
            </Link>
        </div>
        <div onClick={logOut} className='flex items-center justify-between py-[16px] px-[24px] text-red-500 bg-white shadow-lg rounded-xl border border-gray-200'>
            <div className='flex items-center gap-3'>
                <LogOut className='w-[24px] h-[24px]' />
                <p className='text-[16px] font-light'>{loading ? 'Logging Out...' : 'Logout'}</p>
            </div>
            <ChevronRight className='w-[20px] h-[20px]' />
        </div>
    </div>
  )
}

export default ProfileMenu
