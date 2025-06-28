TRABAJO FINAL MODULO 2


Tendremos que crear una API funcional que nos permita interactuar con todos los verbos de una API rest, recordar utilizar correctamente los estándares

* Crear una api rest en nodejs que viva dentro de un docker

* La API debe contener migración y seeders, en el caso de mongodb no es necesaria la migración.

* La API debe contener el uso de al menos los 4 verbos principales (POST - GET - PUT - DELETE)

* La API debe contener middleware y autenticación con JWT, con un usuario y password pre cargado.

* Crear una base de datos en mongodb o postgres que viva dentro de docker

* Generar archivo docker componse para levantar ambos contenedores

* Documentar en un repositorio de github y enviar el repositorio de github.

* La documentación debe contener forma de ejecución, Contenido de cada carpeta, endpoints.

* La API debe contener estructura legible de algún tipo de arquitectura.

* Pueden usar la API de pokemon o la API de marvel o la que estimen conveniente para realizar la tarea.


DETALLE DESARROLLO TRABAJO FINAL MODULO 2

1.- Descargar desde gitlab aplicación
2.-	Abrir una terminal y navegar hasta el directorio donde está el archivo docker-compose.yml.
3.- Realizar lo siguiente para levantar aplicación en contenedores:
    •	Iniciar aplicación Docker desktop 
    •	Luego ejecutar el comando siguiente:
    comando: docker-compose up --build -d   
4.- Para cargar datos en tablas pokemons y users en la base de datos sin detener el contenedor, 
    debe ejecutar el siguiente comando para carga de datos correspondientes a los pokemon:
    comando: docker exec -it postgress_3-api-1 node seed.js
    Para carga de datos correspondientes al usuario:
    (username=usuario_01 correo=usuario_01@correo.cl y password=Clave2025*)
    debe ejecutar el siguiente comando para cargar datos anteriores en tabla users
    comando: docker exec -it postgress_3-api-1 node seed_user.js

CONSULTAS PRINCIPALES PARA OBTENER TOKEN

La siguiente instrucción muestra datos de usuarios utilizando la herramienta postman
verbo: GET http://localhost:3000/api/users/
esta instrucción permite visualizar datos del usuario ingresado 

Para obtener TOKEN valido se debe realizar lo siguiente:

Verbo: POST http://localhost:3000/api/users/login
Opción Body / raw / json
Ingresar lo siguiente:
{       
        "username": "usuario_01",
        "password": "Clave2025*"
}

Será mostrado un token el cual tendrá una validez de una hora

