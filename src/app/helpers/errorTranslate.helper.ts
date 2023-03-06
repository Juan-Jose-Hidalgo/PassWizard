type errorsMsg = {
    [key: string]: string
}

const errorTranslate = (msg: string) => {
    const errors: errorsMsg = {
        'username must be unique': 'Ese username ya está en uso.',
        'email must be unique': 'Ese email ya está en uso.',
        'The maximum allowed size is 1MB.': 'El tamaño máximo permitido para la imagen es de 1MB'
    }
    return errors[msg] || msg;
}

export default errorTranslate;