import React from 'react';
import styles from './styles.module.scss';
import './styles.scss';
import {Popover} from "antd";
import contentInfo from './components/PopoverProfile';
import ImageUser from '../../../../src/assets/images/logos/user_default.png'

const Header = () => {

    return (
        <header className={styles.headerWrap}>
            <div className={styles.headerLeftWrap}>
            </div>
            <div className={`${styles.headerRightWrap}`}>
                <div className={`${styles.itemHeaderRight}`}>
                    <Popover className={`popover-info-wrap`} placement="bottomRight" content={contentInfo}
                             trigger="click">
                        <div className={styles.infoWrap}>
                            <div className={styles.avatarWrap}>
                                <img src={ImageUser} alt=""/>
                            </div>
                        </div>
                    </Popover>
                </div>
            </div>
        </header>
    );
}

export default Header
