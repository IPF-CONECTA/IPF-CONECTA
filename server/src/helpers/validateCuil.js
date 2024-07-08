export const validarCuil = (cuil) => {
    if (!cuil) {
        throw new Error("El CUIL no puede ser nulo.")
    }
    cuil = cuil.toString().trim();

    if (cuil.length === 0) {
        throw new Error("El CUIL no puede estar vacío.")
    }
    if (cuil.length !== 11) {
        throw new Error("El CUIL debe contener exactamente 11 dígitos.")
    }

    const soloDigitos = /^\d+$/;
    if (!soloDigitos.test(cuil)) {
        throw new Error("El CUIL solo debe contener dígitos.")
    }

}

