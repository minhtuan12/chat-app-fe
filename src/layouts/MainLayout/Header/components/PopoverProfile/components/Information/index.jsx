import React, { useEffect, useState } from 'react'
import { Avatar, Button, Input } from 'antd'
import { useSelector } from 'react-redux'

export default function Information(props) {
    const [dataInformation, setDataInformation] = useState({
        username: '',
        name: '',
        avatar: ''
    })
    const authUser = useSelector(state => state.auth.authUser)

    useEffect(() => {
        if (authUser) {
            setDataInformation({
                username: authUser.username,
                name: authUser.name,
                avatar: authUser.avatar
            })
        }
    }, [authUser])

    return (
        <div>
            <div>
                <div className={'label-wrap'}>
                    Avatar
                </div>
                <Avatar src={dataInformation.avatar} alt={''}/>
            </div>
            <div className={'input-wrap'}>
                <div className={'label-wrap'}>
                    Tên tài khoản
                </div>
                <Input
                    className={'main-input'}
                    value={dataInformation.username}
                />
            </div>

            <div className={'input-wrap'}>
                <div className={'label-wrap'}>
                    Họ và tên
                </div>
                <Input
                    className={'main-input'}
                    value={dataInformation.name}
                />
            </div>

            <div className={'flex justify-end'}>
                <Button
                    type="primary"
                    size={'large'}
                    className={'main-btn-primary !w-auto'}
                    block
                    /* eslint-disable-next-line react/prop-types */
                    onClick={() => props.setIsShowInformation(false)}
                >Đóng
                </Button>
            </div>
        </div>
    )
}
