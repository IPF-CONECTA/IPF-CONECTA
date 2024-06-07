export const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('codigo aca ' + code)
    return code  // Generates a 6-digit code
};

