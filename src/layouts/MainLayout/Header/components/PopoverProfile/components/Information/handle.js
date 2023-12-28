import {useEffect, useState} from "react";
import _ from "lodash";
import {useDispatch, useSelector} from "react-redux";

export default function Handle(props) {
    const {handleResetError} = props;
    const [dataInformation, setDataInformation] = useState({
        name: '',
        email: ''
    });
    const errorInformation = useSelector(state => state.profile.errorInformation);
    const isLoadingBtnInformation = useSelector(state => state.profile.isLoadingBtnInformation);
    const authUser = useSelector(state => state.auth.authUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authUser) {
            setDataInformation({
                name: authUser.name,
                email: authUser.email,
            })
        }
    }, [authUser])

    const handleChangeInput = (e, type) => {

    }

    const handleKeyDown = () => {

    }

    return {
        dataInformation, errorInformation, isLoadingBtnInformation,
        handleChangeInput, handleKeyDown
    }
}
