import { useState } from 'react';

const useValidationForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPasswordVisibleLogin, setIsPasswordVisibleLogin] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };
    const togglePasswordVisibilityLogin = () => {
        setIsPasswordVisibleLogin(prevState => !prevState);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(prevState => !prevState);
    };
    const handleKeyPress = (e) => {
        if (!/^[A-Za-z\s]*$/.test(e.key)) {
            e.preventDefault();
        }
    };
    return {
        isPasswordVisible, setIsPasswordVisible, isConfirmPasswordVisible, setIsConfirmPasswordVisible
        , togglePasswordVisibility, toggleConfirmPasswordVisibility, handleKeyPress,
        isPasswordVisibleLogin, setIsPasswordVisibleLogin, togglePasswordVisibilityLogin
    };
};

export default useValidationForm;
