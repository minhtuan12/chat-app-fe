import React from 'react'
import styles from './styles.module.scss'
import './styles.scss'
import { Popover } from 'antd'
import contentInfo from './components/PopoverProfile'
import ImageUser from '../../../../src/assets/images/logos/user_default.png'
import { useSelector } from 'react-redux'

const Header = () => {
    const authUser = useSelector(state => state.auth.authUser)

    return (
        <header className={styles.headerWrap}>
            <div className={styles.headerLeftWrap}>
            </div>
            <div className={`${styles.headerRightWrap}`}>
                <div className={`${styles.itemHeaderRight}`}>
                    <Popover className={'popover-info-wrap'} placement="bottomRight" content={contentInfo}
                        trigger="click">
                        <div className={styles.infoWrap}>
                            <div className={styles.avatarWrap}>
                                <img src={authUser?.avatar || ImageUser} alt=""/>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </header>
    )
}

export default Header
