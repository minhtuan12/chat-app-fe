import React from 'react'
import styles from './styles.module.scss'
import { Avatar, Badge } from 'antd'

export default function FriendCard(props) {
    return <div className={styles.cardWrap}>
        <div className={'relative'}>
            {/* eslint-disable-next-line react/prop-types */}
            <Avatar size={45} src={props.data.avatar} alt={''}/>
            {/* eslint-disable-next-line react/prop-types */}
            {props.data.account_status ? <Badge status={'processing'} className={styles.dot}/> : ''}
        </div>
        <div className={styles.info}>
            {/* eslint-disable-next-line react/prop-types */}
            <div className={styles.username}>{props.data.username}</div>
            {/* eslint-disable-next-line react/prop-types */}
            <div className={styles.name}>{props.data.name}</div>
        </div>
        {/* eslint-disable-next-line react/prop-types */}
        <Badge count={props.data?.room?.count_unseen || 0} overflowCount={5} className={'ml-auto'}/>
    </div>
}