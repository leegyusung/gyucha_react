import Modals from "../common/Modals";
import { change_field, init_form } from "../modules/auth";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";

const ModalsContainer = ({ visible, type, closeModal }) => {
    const dispatch = useDispatch();
    const { form } = useSelector(({ auth }) => ({
        form: auth
    }))

    const onChange = e => {
        const { name, value } = e.target;
        dispatch(change_field({
            form: type,
            key: name,
            value
        }))
    }

    useEffect(() => {
        dispatch(init_form());
    }, [dispatch, visible])
    return (
        <>
            <Modals
                form={form}
                visible={visible}
                type={type}
                closeModal={closeModal}
                onChange={onChange}
            ></Modals>
        </>
    );
};

export default ModalsContainer;