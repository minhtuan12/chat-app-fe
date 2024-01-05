import React, { useEffect, useRef } from 'react'
import { Avatar } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'

export default function MessagesContainer() {
    const oldMessages = useSelector(state => state.chat.oldMessages)
    const activeFriend = useSelector(state => state.chat.activeFriend)
    const me = useSelector(state => state.auth.authUser)
    const messageRef = useRef()
    let messageCount = 0
    let time = null

    useEffect(() => {
        if (messageRef?.current) {
            messageRef.current.scrollTop = messageRef.current.scrollHeight
        }
    }, [oldMessages])

    return <div className={styles.messageWrap} ref={messageRef}>
        {
            oldMessages?.map((message, index) => {
                time = moment(message.created_at).format('HH:mm')
                const showTime = (moment(oldMessages?.[index + 1]?.created_at).format('HH:mm') !== time) || (message.creator_id !== oldMessages?.[index + 1]?.creator_id)
                const isMe = message.creator_id === me._id
                !isMe ? messageCount++ : messageCount = 0

                return (
                    <div key={message._id}
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