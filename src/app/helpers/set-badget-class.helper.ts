interface StrengthClassMap {
    [key: string]: string;
    'débil': string;
    'media': string;
    'fuerte': string;
}

/**
 * An object that maps password strength values to corresponding CSS classes.
 */
export const strengthClassMap: StrengthClassMap = {
    'débil': 'pass-gen__badget pass-gen__badget--weak',
    'media': 'pass-gen__badget pass-gen__badget--medium',
    'fuerte': 'pass-gen__badget pass-gen__badget--strong'
};