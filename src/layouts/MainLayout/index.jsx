import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import SideBar from "./SiderBar";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {goToPageSuccess} from "../../states/modules/app";

function MainLayout(props) {
    const {children} = props;
    const isShowSideBar = useSelector(state => state.app.isShowSideBar);
    const isThemeLight = useSelector(state => state.app.isThemeLight);
    const titlePage = useSelector(state => state.app.title);
    const goToPage = useSelector(state => state.app.goToPage);
    const breadcrumb = useSelector(state => state.app.breadcrumb);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (goToPage.path && !goToPage.redirected) {
            dispatch(goToPageSuccess());
            navigate(goToPage.path);
        }
    }, [goToPage, navigate, dispatch]);

    const handleRenderItemBreadCrumb = (index, item) => {
        switch (index) {
            case 0:
                return (
                    <><Link to={'/'}><span className={`${styles.text}`}>Trang chủ</span></Link> - </>
                );
            case breadcrumb.length - 1:
                return (
                    <Link to={item.path}><span className={`${styles.text}`}>{item.name}</span></Link>
                );
            default:
                return (
                    <><Link to={item.path}><span className={`${styles.text}`}>{item.name}</span></Link> - </>
                );
        }
    }

    return (
        <div className={`${styles.boxMainLayout}`}>
            <div className={styles.headerBox}></div>
            <div className={styles.mainLayoutWrap}>
                <SideBar
                    isThemeLight={isThemeLight}
                    isShowSideBar={isShowSideBar}
                />
                <div className={`${styles.mainWrap} ${!isShowSideBar ? styles.mainWrapWithConditionSideBarClose : ''}`}>
                    <Header/>
                    <main className={styles.mainContentWrap}>
                        <div className={styles.content}>
                            <div className={styles.headerMainWrap}>
                                <div className={styles.titleWrap}>{titlePage}</div>
                                <div className={styles.breadcrumbWrap}>
                                    {
                                        breadcrumb.map((item, index) => {
                                            return <span key={index}>{(handleRenderItemBreadCrumb(index, item))}</span>
                                        })
                                    }
                                </div>
                            </div>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
