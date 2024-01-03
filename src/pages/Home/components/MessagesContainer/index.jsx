import React from 'react'
import { Avatar } from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'

export default function MessagesContainer() {
    const oldMessages = useSelector(state => state.chat.oldMessages)
    const activeFriend = useSelector(state => state.chat.activeFriend)
    const me = useSelector(state => state.auth.authUser)
    let messageCount = 0
    let time = null

    return <div className={styles.messageWrap}>
        {
            oldMessages?.map((message) => {
                const showTime = moment(message.created_at).format('HH:mm') !== time
                const isMe = message.creator_id === me._id
                !isMe ? messageCount++ : messageCount = 0
                time = moment(message.created_at).format('HH:mm')

                return (
                    <div key={message._id}
                        className={`w-full flex ${isMe ? 'justify-end' : ''}`}>
                        <div className={'flex mb-[6px]'}>
                            {
                                (!isMe && messageCount === 1) ? <Avatar size={40} src={activeFriend.avatar}/> : <div className={'ml-[40px]'}></div>
                            }
                            <div className={`p-3 ml-2 rounded-xl shadow-message-card
                                                            ${isMe ? 'bg-[#c8ddff]' : 'bg-[#fff]'}`}>
                                <p className={'text-base'}>{message.content}</p>
                                {showTime ? <p className={'text-xs'}>{time}</p> : ''}
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
}