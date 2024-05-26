# Pruebas Semana 1 Nueva Estrategia de Pruebas
---
En la Wiki se tiene una copia de los entregables requeridos
---
## Requerimientos:
- Node: 20.12.2
- npm: 10.5.0
- yarn: 1.22.19 (Gestor de dependenicas recomendado)


## Como correr?
1. Instalar dependencias:
    ```bash
    yarn install # En caso de npm: npm install
    ```
2. Generar los screenshots:
   ```bash
    yarn cucumber # En caso de npm: npm run cucumber
   ```
3. Generar las referencias para Backstop:
   ```bash
   yarn set_ref # En caso de npm: npm run set_ref
   ```
4. Aprobar las referencias:
   ```bash
   yarn approve # En caso de npm: npm run approve
   ```
5. Realizar la regresion:
   ```bash
   yarn run_reg # En caso de npm: npm run run_reg
   ```
6. El reporte estara disponible en la carpeta backstop data
