import React from 'react';
import styles from "./styles.module.scss";
import {Drawer} from "antd";
import Handle from "./handle.js";
import Information from "./components/Information";
import ChangePassword from "./components/ChangePassword";

function PopoverProfile() {
    const {
        isShowInformation, setIsShowInformation, authUser,
        handleConfirmLogout, handleShowProfile, handleResetError
    } = Handle();

    return (
        <div className={styles.modalInfoWrap}>
            <div className={styles.personalInformationWrap}>
                <div className={styles.name}>
                    {authUser.name}
                </div>
                <div className={styles.role}>
                    {authUser.email || 'Chưa cập nhật'}
                </div>
            </div>
            <div className={styles.mainModalInfoWrap}>
                <ul className={styles.menuInfoWrap}>
                    <li
                        onClick={() => handleShowProfile()}
                        className={`${styles.itemInfoWrap}`}
                    >
                        <div>
                            <span className={styles.text}>Thông tin cá nhân</span>
                        </div>
                    </li>
                    <li
                        onClick={() => handleConfirmLogout()}
                        className={styles.itemInfoWrap}
                    >
                        <div>
                            <span className={styles.text}>Đăng xuất</span>
                        </div>
                    </li>
                </ul>
            </div>

            <Drawer
                title="Thông tin cá nhân"
                placement={'right'}
                closable={true}
                onClose={() => setIsShowInformation(false)}
                open={isShowInformation}
                key={'right'}
                width={520}
            >
                <Information
                    handleResetError={() => handleResetError()}
                />
                <ChangePassword
                    handleResetError={() => handleResetError()}
                />
            </Drawer>
        </div>
    );
}

export default PopoverProfile;
