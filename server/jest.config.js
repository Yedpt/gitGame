// aqui va el codigo de configuracion de jest
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testTimeout: 8000, // aumenta a 30 segundos, por ejemplo
    verbose: false,
    forceExit: true,
   };