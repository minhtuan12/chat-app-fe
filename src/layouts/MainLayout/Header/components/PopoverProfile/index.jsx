import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Drawer } from 'antd'
import Information from './components/Information'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeAuthToken } from '../../../../../utils/localStorage.js'
import { startRequestGetMeFail } from '../../../../../states/modules/auth/index.js'

function PopoverProfile() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isShowInformation, setIsShowInformation] = useState(false)
    const authUser = useSelector(state => state.auth.authUser)

    const handleConfirmLogout = () => {
        removeAuthToken()
        dispatch(startRequestGetMeFail())
        navigate('/login')
    }

    const handleResetError = () => {

    }

    const handleShowProfile = () => {
        setIsShowInformation(true)
    }

    return (
        <div className={ styles.modalInfoWrap }>
            <div className={ styles.personalInformationWrap }>
                <div className={ styles.name }>
                    { authUser.username }
                </div>
                <div className={ styles.role }>
                    { authUser.name || 'Chưa cập nhật' }
                </div>
            </div>
            <div className={ styles.mainModalInfoWrap }>
                <ul className={ styles.menuInfoWrap }>
                    <li
                        onClick={ () => handleShowProfile() }
                        className={ `${ styles.itemInfoWrap }` }
                    >
                        <div>
                            <span className={ styles.text }>Thông tin cá nhân</span>
                        </div>
                    </li>
                    <li
                        onClick={ () => handleConfirmLogout() }
                        className={ styles.itemInfoWrap }
                    >
                        <div>
                            <span className={ styles.text }>Đăng xuất</span>
                        </div>
                    </li>
                </ul>
            </div>

            <Drawer
                title='Thông tin cá nhân'
                placement={ 'right' }
                closable={ true }
                onClose={ () => setIsShowInformation(false) }
                open={ isShowInformation }
                key={ 'right' }
                width={ 520 }
            >
                <Information
                    handleResetError={ () => handleResetError() }
                    setIsShowInformation={setIsShowInformation}
                />
            </Drawer>
        </div>
    )
}

export default PopoverProfile
