# Ronda

Ronda, es una plataforma educativa diseñada con el propósito de acercar a los docentes y estudiantes de la modalidad Educación Especial otras posibilidades de enseñar y aprender. Contiene recursos didácticos, herramientas digitales y materiales multimedia curados y editados en formatos accesibles, bajo el criterio de diseño universal, lo que hace de Ronda un sitio útil para todos los niveles y modalidades de enseñanza.

Ideamos Ronda como un entorno de propuestas pedagógicas abiertas y flexibles, mediadas por la lógica de las pantallas, para que cada docente, desde su impronta profesional, pueda elegir y editar sus materiales didácticos, proyectar distintos recorridos e incluir diversas formas de acercarse a los contenidos de la enseñanza, seleccionando estrategias diferentes a la hora de evaluar los logros en el aprendizaje.

Hoy el concepto de alfabetización ha evolucionado. Transitamos un camino en el que conviven nuevos formatos textuales con viejos soportes, donde leer y escribir traspasa la histórica frontera del cuaderno de clases. Sonidos, imágenes y videos se mezclan con láminas y pizarrones; los abecedarios se amplifican con emoticones, mientras millones de clics buscan nuevos espacios para compartir la diversidad cultural de este milenio, abriendo nuevos sentidos de ser, estar y sentir.

Hoy nos comunicamos, aprendemos y participamos desde otros lugares, con otras formas mediadas por una virtualidad que acerca e incluye.

Es por ello que pensamos en Ronda como un entorno circular donde las prácticas escolares se entraman en la cultura digital, abriendo nuevos caminos a la inclusión. Desde estos sentidos proyectamos acercarles nuestro aporte con recursos que intentan contribuir a la mejora de la enseñanza, esperando que colaboren en la construcción de espacios de aula inclusivos, creativos, dinámicos y productivos.

**Ronda Online** [https://ronda.abc.gov.ar](https://ronda.abc.gov.ar)

## Para desarrolladores

Ronda es una aplicación Fullstack que consta de varias partes:

 - Backend (API)
   - NodeJS + Espress
 - Frontend (SPA)
   - AngularJS v1.x
   - Angular Material v1.x
   - Ronda UI (incluida en el proyecto)

Para iniciar el ambiente de desarrollo

Copiar y editar el archivo `server/config/secret.example.js` -> `server/config/secret.js` con las variables correspondientes

Instalar dependencias

```
#:npm install
```

Ininiciar el Servidor

```
#:npm run serve
```

Crear un build

```
#:npm run build
```

Crear un offline build

```
#:npm run build-offline
```

NOTA: La primera vez es setear la variable `seedDB:true` del `server/config/environment/development.js` para crear datos necesario en la base de datos

# Docker

Junto con el proyecto se mantiene una imagen de Docker en docker hub

 - [https://hub.docker.com/r/delmosaurio/ronda](https://hub.docker.com/r/delmosaurio/ronda)

Generar una imagen local y correr el servicio

```
#:npm run build
#:docker-compose -d
```

**Docker en Producción**

- Modificar el path `./server/config/secret.js` dentro de `docker-compose.prod.yml` con el correspondiente
- Modificar admin `ADMIN_USER: "admin@ronda"` con el correspondiente
- Modificar admin pwd `ADMIN_PWD: "SUPERSECRET"` con el correspondiente
- Ronda necesita de una carpeta para alojar los `uplodas`, el mismo esta definido como un volumen de Docker en `ronda-uploads`

```
sudo docker-compose -f docker-compose.prod.yml up -d
```

## Links de interes

 - Sitio institucional [https://dte.abc.gov.ar/](https://dte.abc.gov.ar/)
 - Código fuente [https://github.com/Dte-ba/ronda](https://github.com/Dte-ba/ronda)
 - Isuess [https://github.com/Dte-ba/ronda/issues](https://github.com/Dte-ba/ronda/issues)
 - Imagen de Docker [https://hub.docker.com/r/delmosaurio/ronda](https://hub.docker.com/r/delmosaurio/ronda)

## Licencia

MIT License

Copyright (c) 2017-2019 Dte-ba

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
