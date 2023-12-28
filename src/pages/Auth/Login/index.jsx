import React from 'react';
import './styles.scss';
import AuthLayout from '../../../layouts/AuthLayout';
import {Button, Flex, Input} from "antd";

function Login() {
    return (
        <AuthLayout title={'Đăng nhập'} description={'Ứng dụng chat chit'}>
            <div className={`input-wrap`}>
                <Input
                    className={'base-input'}
                    placeholder={'Username'}
                />
            </div>

            <div className={`input-wrap mt-5`}>
                <Input.Password
                    className={`base-input !pt-[9px] !pb-[9px]`}
                    placeholder={'Mật khẩu'}
                />
            </div>

            <Flex vertical gap="small">
                <Button
                    loading={isLoadingBtnLogin}
                    type="primary"
                    size={'large'}
                    className={`main-btn-primary`}
                    block
                >Đăng nhập
                </Button>
            </Flex>

        </AuthLayout>
    );
}

export default Login;
