import React, { useEffect, useRef } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { setIsKeepScroll } from '../../../../states/modules/chat/index.js'
import { Avatar } from 'antd'
import ENUM from '../../../../utils/constants.js'

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
        isKeepScroll && props.confirmSeenMessage()
    }

    useEffect(() => {
        if (messageRef?.current && !isKeepScroll) {
            messageRef.current.scrollTop = messageRef.current?.scrollHeight - messageRef.current?.offsetHeight
        }
    }, [oldMessages, isKeepScroll])

    // eslint-disable-next-line react/prop-types
    return <div className={styles.messageWrap} ref={messageRef} onClick={props.confirmSeenMessage}
        onScroll={handleScrollMessages}>
        {
            oldMessages?.map((message, index) => {
                time = moment(message.created_at).format('HH:mm')
                const showTime = (moment(oldMessages?.[index + 1]?.created_at).format('HH:mm') !== time) || (message.creator_id !== oldMessages?.[index + 1]?.creator_id)
                const isMe = message.creator_id === me._id
                !isMe ? messageCount++ : messageCount = 0
                const isLastMessage = index === (oldMessages.length - 1)

                return (
                    <div key={message._id}>
                        <div className={`flex ${isMe ? 'justify-end' : ''}`}>
                            <div className={'flex mb-[6px] max-w-[100%]'}>
                                {isMe ? <div className={'w-[116px]'}></div> : ''}
                                {
                                    (!isMe && messageCount === 1) ? <Avatar size={40} src={activeFriend.avatar} className={'select-none'}/> :
                                        <div className={'ml-[40px]'}></div>
                                }
                                <div
                                    className={`max-w-[calc(100%_-_116px_-_40px)] p-3 ml-2 rounded-xl shadow-message-card flex-1 ${isMe ? 'bg-[#c8ddff]' : 'bg-[#fff]'}`}>
                                    <p className={'text-base'} style={{ wordWrap: 'break-word' }}>{message.content}</p>
                                    {showTime ? <p className={'text-xs select-none'}>{time}</p> : ''}
                                </div>
                                {!isMe ? <div className={'w-[116px]'}></div> : ''}
                            </div>
                        </div>
                        {
                            (isLastMessage && isMe && oldMessages[index].status === ENUM.MESSAGE_STATUS['SEEN']) ?
                                <div className={'flex justify-end'}><Avatar size={20} src={activeFriend.avatar}/></div> : ''
                        }
                    </div>
                )
            })
        }
    </div>
}