# Pasos para crear oferta laboral

#### 1. Crear una cuenta administrador en la ruta `http://localhost:4000/createUser` con los siguientes datos:

    {
    "user": {
        "names": "name",
        "surnames": "name",
        "role": "admin", // admin/recruiter/student
        "password": "Admin.1", // debe tener 1 mayuscula, 6 caracteres min, 1 signo
        "email":"admin@gmail.com" // debe ser un mail valido
    }
    }

#### 2. Crear una cuenta tambien para recruiter

#### 3. Iniciar sesion en la ruta `http://localhost:4000/auth/login` y guardar los tokens de cada cuenta

#### 4. Crear una empresa con el token de la cuenta recruiter en la ruta `http://localhost:4000/create-company`

#### con los siguientes datos:{

    "message": "Contando que hago en esta empresa, tratando de verificar que si trabajo en esta empresa",
    "company": {
        "name": "Casa pan",
        "description": "Descripción detallada de la nueva empresa, su historia, productos y servicios.",
        "industryId": 5,
        "cityId": 3,
        "address": "Calle Ficticia 123, Ciudad Imaginaria",
        "logoUrl": "https://www.ejemplo.com/img/logo_empresa_nueva.jpg",
        "cantEmployees": 150
    }

}

#### 5. Confirmar la empresa en la ruta `http://localhost:4000/update-company-status/:id/:status` donde id es el id de la empresa y status es si es aprobada o no "Aprobada/Rechazada"

#### 6. Confirmar la asociacion del reclutador con la empresa

En la ruta `http://localhost:4000/update-association/:id/:status` donde se repite lo del paso anterior, el id es el id de la asociacion y status "Aprobada/Rechazada"

#### 7. Crear el trabajo en la ruta `http://localhost:4000/create-job` con los siguientes datos enviados desde el body {

    {
    "jobOffer": {
        "companyId": "id de la empresa creada",
        "title": "Titulo del puesto",
        "description": "Requisitos, obligaciones, beneficios, etc",
        "contractTypeId": num, // id del tipo de contrato (full-time, part-time, etc)
        "modalityId":num // id de la modalidad (Presencial, hibrido, etc)
    },
    "skills": [
        // ids de las skills necesarias para el puesto
    ]

}
}
