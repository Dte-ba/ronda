# Ronda

Ronda es un proyecto de contenidos digitales con fines educativos para que todos podamos participar y acceder.

## Para desarrolladores

Copiar y editar el archivo `server/config/secret.example.js` -> `server/config/secret.js` con las variables correspondientes

Instalar `gulp`

```
#:npm install -g gulp
```

Instalar dependencias

```
#:npm install gulp
```

Iniciar el servidor de desarrollo

```
#:gulp server
```

Crear un build

```
#:gulp build
```

NOTA: La primera ves es setear la variable `seedDB:true` del `server/config/environment/development.js` para crear datos necesario en la base de datos

## Licencia

MIT License

Copyright (c) 2017 Dte-ba

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
