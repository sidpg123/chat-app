import { isValidUsername } from '6pp';
import { loginInput, registerInput } from '@sidpg/chat-common';

export const userNameValidator = (userName: string) => {
    
    if(!isValidUsername(userName)) {
        return { isValid: false, errorMessage: "Username is invalid"}
    }
}