type errorsMsg = {
    [key: string]: string
}

const errorTranslate = (msg: string) => {
    const errors: errorsMsg = {
        'username must be unique': 'Ese username ya está en uso.',
        'email must be unique': 'Ese email ya está en uso.'
    }
    return errors[msg] || msg;
}

export default errorTranslate;