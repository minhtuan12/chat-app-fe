import React, { useEffect, useState } from 'react'
import MainLayout from '../../layouts/MainLayout/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setBreadcrumb, setTitlePage } from '../../states/modules/app/index.js'
import styles from './styles.module.scss'
import FriendCard from './components/FriendCard/index.jsx'
import { Avatar, Input } from 'antd'
import ImageUser from '../../assets/images/logos/user_default.png'
import Welcome from '../../assets/images/thumbnails/welcome.png'
import { setActiveFriend } from '../../states/modules/chat/index.js'
import { SendOutlined } from '@ant-design/icons'
import { getOldMessages } from '../../api/chat/index.js'
import MessagesContainer from './components/MessagesContainer/index.jsx'

function Home() {
    const dispatch = useDispatch()

    const activeFriend = useSelector(state => state.chat.activeFriend)
    const listFriends = useSelector(state => state.chat.listFriends)
    const [sendMessage, setSendMessage] = useState('')

    const handleSetActiveFriend = (activeFriend) => {
        dispatch(setActiveFriend(activeFriend))
        if (activeFriend.room) {
            dispatch(getOldMessages(activeFriend.room?._id))
        }
    }

    const handleChangeInput = (e) => {
        setSendMessage(e.target.value)
    }

    const handleSendMessage = () => {
    }

    useEffect(() => {
        dispatch(setTitlePage(''))
        dispatch(setBreadcrumb([]))
    })

    return (
        <MainLayout>
            <div className={styles.chatWrap}>
                <div className={styles.leftWrap}>
                    <div className={styles.leftWrapHeader}>Danh sách bạn bè</div>
                    <div className={styles.leftWrapContent}>
                        {
                            listFriends.map(item => (
                                <div key={item._id} className={styles.friendItem}
                                    onClick={() => handleSetActiveFriend(item)}>
                                    <FriendCard data={item}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.rightWrap}>
                    {
                        activeFriend ? <>
                            <div className={`${styles.rightWrapHeader}`}>
                                <Avatar size={45} src={activeFriend.avatar || ImageUser} alt={''}/>
                                <span className={'ml-4'}>{activeFriend.name}</span>
                            </div>
                            <MessagesContainer/>
                            <div>
                                <Input size={'large'} placeholder={`Tin nhắn tới ${activeFriend.name}`}
                                    value={sendMessage} onChange={handleChangeInput}
                                    suffix={<SendOutlined className={'cursor-pointer'}
                                        onClick={handleSendMessage}/>}/>
                            </div>
                        </> : <div className={styles.welcomeWrap}>
                            <img src={Welcome} alt={''}/>
                        </div>
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export default Home
