import React from 'react'
import styles from './styles.module.scss'
import { Avatar } from 'antd'

export default function FriendCard(props) {
    return <div className={styles.cardWrap}>
        {/* eslint-disable-next-line react/prop-types */}
        <Avatar size={45} src={props.data.avatar} alt={''}/>
        <div className={styles.info}>
            {/* eslint-disable-next-line react/prop-types */}
            <div className={styles.username}>{props.data.username}</div>
            {/* eslint-disable-next-line react/prop-types */}
            <div className={styles.name}>{props.data.name}</div>
        </div>
    </div>
}