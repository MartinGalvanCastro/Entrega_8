Feature: Escearios Regresion

    @ES01
    # 4 Escenarios
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
            | msedge    | Author        |
            | msedge    | Editor        |
            | msedge    | Administrator |
            | msedge    | Contributor   |

    @ES02
    # 1 Escenario
    Scenario Outline: Iniciar sesión, crear metadata para google, validar que la etiqueta esté bien creada
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'settings'
        When Edita metadata de la pagina
        Then Valida que se haya modificado la metadata de la página

        Examples:
            | navegador |
            | chrome    |
            | msedge    |


    @ES03
    # 1 Escenario
    Scenario Outline: Inicio sesión, ingreso la información de redes sociales, visualizar que las redes sociales esten bien configuradas
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'settings'
        Then Verificar que las redes sociales esten bien configuradas

        Examples:
            | navegador |
            | chrome    |
            | msedge    |

    @ES04
    # 1 Escenario
    Scenario Outline: Inicio sesion, busca un miembro por un filtro
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'members'
        And Filtra los usuarios por un nombre
        Then Encuentra un usuario con ese nombre

        Examples:
            | navegador |
            | chrome    |
            | msedge    |

    @ES05
    # 1 Escenario
    Scenario Outline: Inicio sesion, Cambia Tema, Modifica informacion del perfil, sube una cover image
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Cambia el tema
        Then Visualiza que el tema cambio
        When Navega al menu de 'user-profile'
        And Actualiza su informacion del perfil
        And Sube una cover image
        And Guarda los cambios del perfil
        And Navega al dashboard
        And Navega al menu de 'user-profile'
        Then Puede ver los cambios en el perfil correctamente

        Examples:
            | navegador |
            | chrome    |
            | msedge    |

    @ES06
    # 2 Escenarios
    Scenario Outline: Inicio sesion, Crea un contenido con una imagen y un titulo, lo publica
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de '<menu-contenido>'
        And Crea '<contenido>'
        And Con titulo Prueba-'<menu-contenido>' y una imagen
        And Publica el contenido
        Then Verifica que el contenido se visualiza de manera correcta

        Examples:
            | navegador | menu-contenido | contenido   |
            | chrome    | post           | un articulo |
            | chrome    | page           | una pagina  |
            | msedge    | post           | un articulo |
            | msedge    | page           | una pagina  |
