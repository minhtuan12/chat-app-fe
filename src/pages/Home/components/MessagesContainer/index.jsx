import React, { useEffect, useRef } from 'react'
import { Avatar } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.scss'
import socketService from '../../../../socket/index.js'
import { appendMessages, setIsKeepScroll } from '../../../../states/modules/chat/index.js'

export default function MessagesContainer(props) {
    const oldMessages = useSelector(state => state.chat.oldMessages)
    const activeFriend = useSelector(state => state.chat.activeFriend)
    const isKeepScroll = useSelector(state => state.chat.isKeepScroll)
    const me = useSelector(state => state.auth.authUser)
    const dispatch = useDispatch()
    const messageRef = useRef()
    let messageCount = 0
    let time = null

    const handleScrollMessages = (e) => {
        if (e.target.scrollHeight - e.target.scrollTop - e.target.offsetHeight < 200) {
            dispatch(setIsKeepScroll(false))
            // eslint-disable-next-line react/prop-types
            props.setScrollToBottom(false)
        } else {
            dispatch(setIsKeepScroll(true))
            // eslint-disable-next-line react/prop-types
            props.setScrollToBottom(true)
        }
        // eslint-disable-next-line react/prop-types
        props.confirmSeenMessage()
    }

    useEffect(() => {
        if (messageRef?.current && !isKeepScroll) {
            messageRef.current.scrollTop = messageRef.current?.scrollHeight - messageRef.current?.offsetHeight
        }
    }, [oldMessages, isKeepScroll])

    useEffect(() => {
        const socket = socketService.getSocket()
        socket.on('chat-message', (msg) => {
            dispatch(appendMessages(msg))
        })
    }, [])

    // eslint-disable-next-line react/prop-types
    return <div className={styles.messageWrap} ref={messageRef} onClick={props.confirmSeenMessage} onScroll={handleScrollMessages}>
        {
            oldMessages?.map((message, index) => {
                time = moment(message.created_at).format('HH:mm')
                const showTime = (moment(oldMessages?.[index + 1]?.created_at).format('HH:mm') !== time) || (message.creator_id !== oldMessages?.[index + 1]?.creator_id)
                const isMe = message.creator_id === me._id
                !isMe ? messageCount++ : messageCount = 0

                return (
                    <div key={index}
                        className={`w-full flex ${isMe ? 'justify-end' : ''}`}>
                        <div className={'flex mb-[6px]'}>
                            {isMe ? <div className={'w-[116px]'}></div> : ''}
                            {
                                (!isMe && messageCount === 1) ? <Avatar size={40} src={activeFriend.avatar}/> :
                                    <div className={'ml-[40px]'}></div>
                            }
                            <div className={`p-3 ml-2 rounded-xl shadow-message-card flex-1
                                                            ${isMe ? 'bg-[#c8ddff]' : 'bg-[#fff]'}`}>
                                <p className={'text-base'}>{message.content}</p>
                                {showTime ? <p className={'text-xs'}>{time}</p> : ''}
                            </div>
                            {!isMe ? <div className={'w-[116px]'}></div> : ''}
                        </div>
                    </div>
                )
            })
        }
    </div>
}