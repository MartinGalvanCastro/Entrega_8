Feature: Escearios Regresion

    @ES01
    Scenario Outline: Inicio Sesion - Cambiar Tema - Invita a un miembro del staff
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Cambia el tema
        Then Visualiza que el tema cambio
        When Navega al menu de 'settings'
        And Invita un miembro del staff como '<rol>'
        Then Verifica que la invitacion se envio correctamente

        Examples:
            | navegador | rol           |
            | chrome    | Contributor   |
            | chrome    | Author        |
            | chrome    | Editor        |
            | chrome    | Administrator |
            | firefox   | Contributor   |
            | firefox   | Author        |
            | firefox   | Editor        |
            | firefox   | Administrator |
            | webkit    | Contributor   |
            | webkit    | Author        |
            | webkit    | Editor        |
            | webkit    | Administrator |

