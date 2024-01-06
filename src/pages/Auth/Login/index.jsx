import React, { useState } from 'react'
import './styles.scss'
import AuthLayout from '../../../layouts/AuthLayout'
import { Button, Flex, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../api/auth/index.js'

function Login() {
    const isLoadingBtnLogin = useSelector(state => state.auth.isLoadingBtnLogin)
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch()

    const handleChangeLoginData = (value, type) => {
        setLoginData({
            ...loginData,
            [type]: value
        })
    }

    const handleLogin = () => {
        dispatch(login(loginData))
    }

    return (
        <AuthLayout title={'Đăng nhập'} description={'Chat chit đi nào'}>
            <div className={'input-wrap'}>
                <Input
                    className={'base-input'}
                    placeholder={'Username'}
                    value={loginData.username}
                    onChange={e => handleChangeLoginData(e.target.value, 'username')}
                />
            </div>

            <div className={'input-wrap mt-5'}>
                <Input.Password
                    className={'base-input !pt-[9px] !pb-[9px]'}
                    placeholder={'Mật khẩu'}
                    value={loginData.password}
                    onChange={e => handleChangeLoginData(e.target.value, 'password')}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            handleLogin()
                        }
                    }}
                />
            </div>

            <Flex vertical gap='small'>
                <Button
                    loading={isLoadingBtnLogin}
                    type='primary'
                    size={'large'}
                    className={'main-btn-primary'}
                    block
                    onClick={handleLogin}
                >Đăng nhập
                </Button>
            </Flex>
        </AuthLayout>
    )
}

export default Login
