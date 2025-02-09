README Proyecto Remix

Descripción

Este proyecto está basado en el template del quick start de Remix y consiste en una lista de 10 elementos con información detallada de contactos. La interfaz incluye funcionalidades como búsqueda, edición, eliminación y favoritos.

Instrucciones de Instalación y Ejecución

Para instalar las dependencias y arrancar el proyecto sigue estos pasos:

Abre la terminal y ejecuta el siguiente comando para generar una plantilla básica de Remix:

npx create-remix@latest --template remix-run/remix/templates/remix-tutorial

Durante el proceso se solicitará:

Nombre para el proyecto.

Confirmación para inicializar un repositorio Git.

Posteriormente se instalarán las dependencias de manera automática, esto puede tardar unos minutos.

Luego se abrirá la carpeta que contiene el proyecto en algun editor de codigo por ejemplo Visual Studio Code.

Se ejecuta el siguiente comando para asegurarse de que las dependencias están correctamente instaladas:

npm install

Finalmente, se ejecuta el siguiente comando para iniciar el servidor de desarrollo:

npm run dev

Accede a la aplicación en tu navegador a través de http://localhost:5173  en el puerto que sea indicado.


Conceptos Importantes

Links:
En Remix lo mas eficiente para los enlaces es hacerlo con el componente link de @remix-run/react, esto permite una navegación mas flúida y rápida sin recargar la paginá, es más rapido que el href.

Loaders:
Los loaders son funciones que permiten obtener datos del servidor antes de renderizar una ruta, devuelven un objeto JSON que luego puede ser accedido en el componente mediante useLoaderData.

Rutas Anidadas:
Son rutas donde una ruta principal incluye subrutas que comparten la misma estructura, esto permite que un componente padre se mantenga visible mientras se navega por las subrutas.

Rutas Dinámicas:
Las rutas dinámicas permiten definir URL con parámetros variables. Se crean usando el nombre del archivo entre corchetes.

Componente Outlet:
El componente Outlet se utiliza para renderizar las subrutas dentro de una ruta principal, para cargar el contenido de las subrutas.

Action:
 Una función del lado del servidor que procesa solicitudes POST, PUT, PATCH o DELETE.