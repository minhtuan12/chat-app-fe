import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../layouts/MainLayout/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.scss'
import FriendCard from './components/FriendCard/index.jsx'
import { Avatar, Badge, Button, Input, Popover } from 'antd'
import ImageUser from '../../assets/images/logos/user_default.png'
import Welcome from '../../assets/images/thumbnails/welcome.png'
import {
    appendMessages,
    refreshState,
    setActiveFriend,
    setHasUnseenMessages,
    setIsKeepScroll,
    setListFriends,
    setOldMessages
} from '../../states/modules/chat/index.js'
import { DownOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons'
import { getOldMessages, requestConfirmSeenMessage, requestSendMessage } from '../../api/chat/index.js'
import MessagesContainer from './components/MessagesContainer/index.jsx'
import socketService from '../../socket/index.js'
import { createRoomChatPrivateName, createRoomNotifyName } from '../../utils/helper.js'
import store from '../../states/configureStore.js'
import ENUM from '../../utils/constants.js'
import DotFlashing from '../../components/DotFlashing/index.jsx'
import { useDebounce } from '../../utils/hooks.js'
import messageAudio from '../../assets/audio/message-notify.mp3'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function Home() {
    const dispatch = useDispatch()

    const activeFriend = useSelector(state => state.chat.activeFriend)
    const listFriends = useSelector(state => state.chat.listFriends)
    const loadingSendMessage = useSelector(state => state.chat.loadingSendMessage)
    const me = useSelector(state => state.auth.authUser)
    const [sendMessage, setSendMessage] = useState('')
    const [isTyping, setIsTyping] = useState(true)
    const [userTyping, setUserTyping] = useState({})
    const [scrollToBottom, setScrollToBottom] = useState(false)
    const debounceValue = useDebounce(userTyping, 5000)
    const inputRef = useRef()

    const handleSetActiveFriend = (activeFriend) => {
        dispatch(setActiveFriend(activeFriend))
        dispatch(setOldMessages([]))
        const socket = socketService.getSocket()
        if (activeFriend.room) {
            const newListFriend = listFriends?.map(item => {
                if (item._id === activeFriend._id) {
                    return {
                        ...item,
                        room: {
                            ...item.room,
                            count_unseen: 0
                        }
                    }
                }
                return item
            })
            dispatch(setListFriends(newListFriend))
            dispatch(getOldMessages(activeFriend.room?._id))

            socket.emit('join-room-chat-private', {
                room_name: createRoomChatPrivateName(activeFriend.room?._id)
            })
        } else {
            socket.emit('join-room-chat-private', {
                room_name: null
            })
        }
    }

    const handleChangeInput = (value, type) => {
        if (type === 'text') {
            setSendMessage(value)
        } else {
            setSendMessage(prev => prev + value.native)
        }
    }

    const handleSendMessage = () => {
        if (!loadingSendMessage && sendMessage) {
            dispatch(requestSendMessage({
                message: sendMessage,
                receiver_id: activeFriend?._id
            }))
            setSendMessage('')
            dispatch(setIsKeepScroll(false))
        }
    }

    const handleUpdateRoomInListFriends = (room) => {
        const listFriends = store.getState().chat.listFriends
        const activeFriend = store.getState().chat.activeFriend
        const newListFriends = listFriends?.map(friend => {
            if ((friend._id === room.creator_id) || (room.members?.includes(friend._id))) {
                const updateFriend = {
                    ...friend,
                    room
                }
                if (updateFriend._id === activeFriend?._id) {
                    dispatch(setActiveFriend(updateFriend))
                }

                return updateFriend
            }
            return friend
        })

        dispatch(setListFriends(newListFriends))
        if ((activeFriend?._id === room.creator_id) || (room.members?.includes(activeFriend?._id))) {
            dispatch(getOldMessages(room._id))
            const socket = socketService.getSocket()
            socket.emit('join-room-chat-private', {
                room_name: createRoomChatPrivateName(room._id)
            })
        }
    }

    const handleUpdateCountUnseenInListFriends = (senderId) => {
        const listFriends = store.getState().chat.listFriends
        const newListFriends = listFriends?.map(friend => {
            if (senderId === friend._id) {
                return {
                    ...friend,
                    room: {
                        ...friend.room,
                        count_unseen: friend.room?.count_unseen ? (friend.room.count_unseen + 1) : 1
                    }
                }
            }
            return friend
        })

        dispatch(setListFriends(newListFriends))
    }

    const confirmSeenMessage = () => {
        const hasUnseenMessages = store.getState().chat.hasUnseenMessages
        const oldMessages = store.getState().chat.oldMessages
        const activeFriend = store.getState().chat.activeFriend
        if (hasUnseenMessages) {
            let listUnseenMessages = []
            const updatedOldMessages = oldMessages?.map(message => {
                if (message.status === ENUM.MESSAGE_STATUS['UNSEEN']) {
                    listUnseenMessages = [...listUnseenMessages, message._id]
                    return {
                        ...message,
                        status: ENUM.MESSAGE_STATUS['SEEN']
                    }
                }
                return message
            })

            const newListFriend = listFriends?.map(item => {
                if (item._id === activeFriend._id) {
                    return {
                        ...item,
                        room: {
                            ...item.room,
                            count_unseen: 0
                        }
                    }
                }
                return item
            })
            if (listUnseenMessages.length > 0) {
                dispatch(setListFriends(newListFriend))
                dispatch(setOldMessages(updatedOldMessages))
                dispatch(requestConfirmSeenMessage({
                    room_id: activeFriend.room._id,
                    list_message: listUnseenMessages
                }))
            }
        }
    }

    const handleTypingMessage = () => {
        if (activeFriend?.room?._id) {
            const socket = socketService.getSocket()
            socket.emit('send-typing', {
                sender_id: me._id,
                room_name: createRoomChatPrivateName(activeFriend.room._id)
            })
        }
    }

    const handleScrollToBottom = () => {
        dispatch(setIsKeepScroll(false))
    }

    useEffect(() => {
        return () => dispatch(refreshState())
    }, [])

    useEffect(() => {
        const audioMessage = new Audio(messageAudio)
        socketService.createNewSocket()
        const socket = socketService.getSocket()
        socket.emit('create-notify', createRoomNotifyName(me._id))
        socket.on('account-status', res => {
            const listFriends = store.getState().chat.listFriends
            const activeFriend = store.getState().chat.activeFriend
            const newListFriends = listFriends?.map(friend => {
                if (res.personalRoom.includes(friend._id)) {
                    const updateFriend = {
                        ...friend,
                        account_status: res.type
                    }
                    if (activeFriend?._id === friend._id) {
                        dispatch(setActiveFriend(updateFriend))
                    }
                    return updateFriend
                }
                return friend
            })
            dispatch(setListFriends(newListFriends))
        })
        socket.on('get-status-list-friend', res => {
            const listFriends = store.getState().chat.listFriends
            const newListFriends = listFriends?.map(friend => {
                return {
                    ...friend,
                    account_status: res[createRoomNotifyName(friend._id)]
                }
            })
            dispatch(setListFriends(newListFriends))
        })
        socket.on('personal-notify', res => {
            switch (res.type) {
            case 'create-room-chat-private':
                handleUpdateRoomInListFriends(res.data)
                break
            case 'has-new-message':
                // eslint-disable-next-line no-case-declarations
                const activeFriend = store.getState().chat.activeFriend
                // eslint-disable-next-line no-case-declarations
                const isKeepScroll = store.getState().chat.isKeepScroll
                setUserTyping({})
                if (res.data.sender_id === activeFriend?._id) {
                    dispatch(setHasUnseenMessages(true))
                }
                if (isKeepScroll || (!isKeepScroll && activeFriend?._id !== res.data.sender_id)) {
                    handleUpdateCountUnseenInListFriends(res.data.sender_id)
                    if (audioMessage) {
                        audioMessage.currentTime = 0
                        audioMessage.play()
                    }
                }
                break
            default:
                break
            }
        })
        socket.on('on-typing', (senderId) => {
            const activeFriend = store.getState().chat.activeFriend
            if (activeFriend?._id === senderId) {
                setUserTyping({ value: activeFriend.name })
            }
        })
        socket.on('chat-message', (msg) => {
            dispatch(appendMessages(msg))
            const isKeepScroll = store.getState().chat.isKeepScroll
            if ((me._id !== msg.creator_id) && !isKeepScroll) {
                const activeFriend = store.getState().chat.activeFriend
                dispatch(requestConfirmSeenMessage({
                    room_id: activeFriend?.room?._id,
                    list_message: [msg._id]
                }))
            }
        })
        socket.on('seen-message', res => {
            const activeFriend = store.getState().chat.activeFriend
            if (activeFriend?.room?._id === res.room_id) {
                const oldMessages = store.getState().chat.oldMessages
                let updatedOldMessages = []
                if (res.seen_all) {
                    updatedOldMessages = oldMessages?.map(message => {
                        return {
                            ...message,
                            status: ENUM.MESSAGE_STATUS['SEEN']
                        }
                    })
                } else {
                    updatedOldMessages = oldMessages?.map(message => {
                        if (res.list_message?.includes(message._id)) {
                            return {
                                ...message,
                                status: ENUM.MESSAGE_STATUS['SEEN']
                            }
                        }
                        return message
                    })
                }

                dispatch(setOldMessages(updatedOldMessages))
            }
        })

        return () => {
            socketService.disconnectSocket()
            audioMessage.pause()
            audioMessage.currentTime = 0
        }
    }, [])

    useEffect(() => {
        inputRef?.current?.focus()
        setUserTyping({})
    }, [debounceValue, activeFriend?._id])

    useEffect(() => {
        if ((sendMessage.length > 0) && isTyping) {
            handleTypingMessage()
            setIsTyping(false)
            setTimeout(() => {
                setIsTyping(true)
            }, 3000)
        }
    }, [sendMessage])

    return (
        <MainLayout>
            <div className={styles.chatWrap}>
                <div className={styles.leftWrap}>
                    <div className={styles.leftWrapHeader}>Danh sách bạn bè</div>
                    <div className={styles.leftWrapContent}>
                        {
                            listFriends?.map(item => (
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
                                <span className={'relative select-none'}>
                                    <Avatar size={45} src={activeFriend.avatar || ImageUser} alt={''}/>
                                    {activeFriend.account_status ?
                                        <Badge status={'processing'} className={styles.dot}/> : ''}
                                </span>
                                <span className={'ml-4'}>{activeFriend.name}</span>
                            </div>
                            <MessagesContainer setScrollToBottom={setScrollToBottom}
                                confirmSeenMessage={confirmSeenMessage}/>
                            {userTyping?.value ? <div
                                className={'absolute bottom-[81px] left-[20px] bg-[white] text-[12px] px-[10px] rounded-t-[5px]'}>{userTyping.value} đang
                                soạn tin nhắn <DotFlashing/></div> : ''}
                            {scrollToBottom ?
                                <Button shape={'circle'} icon={<DownOutlined/>} onClick={handleScrollToBottom}
                                    className={'absolute bottom-[95px] right-[20px] bg-white'}></Button> : ''}
                            <div className={'border-t-[1px] pt-[20px]'}>
                                <Input
                                    ref={inputRef}
                                    size={'large'} placeholder={`Tin nhắn tới ${activeFriend.name}`}
                                    value={sendMessage} onChange={e => handleChangeInput(e.target.value, 'text')}
                                    suffix={
                                        <>
                                            <Popover content={<Picker data={data} onEmojiSelect={e => handleChangeInput(e, 'emoji')}/>} trigger="click">
                                                <SmileOutlined />
                                            </Popover>
                                            <SendOutlined className={'cursor-pointer'}
                                                onClick={handleSendMessage}/>
                                        </>
                                    }
                                    onInput={confirmSeenMessage}
                                    onClick={confirmSeenMessage}
                                    onFocus={confirmSeenMessage}
                                    onKeyPress={e => {
                                        if (e.key === 'Enter') {
                                            handleSendMessage()
                                        }
                                    }}
                                />
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
