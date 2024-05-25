Feature: Escearios Regresion

    @ES01
    Scenario Outline: Inicio Sesion - Invita a un miembro del staff como Contributor
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'settings'
        And Invita un miembro del staff como 'Contributor'
        Then Verifica que la invitacion se envio correctamente

        Examples:
            | navegador |
            | chrome    |
            | msedge    |

    @ES02
    Scenario Outline: Inicio Sesion - Invita a un miembro del staff como Author
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'settings'
        And Invita un miembro del staff como 'Author'
        Then Verifica que la invitacion se envio correctamente

        Examples:
            | navegador |
            | chrome    |
            | msedge    |

    @ES03
    Scenario Outline: Inicio Sesion - Invita a un miembro del staff como Editor
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'settings'
        And Invita un miembro del staff como 'Editor'
        Then Verifica que la invitacion se envio correctamente

        Examples:
            | navegador |
            | chrome    |
            | msedge    |

    @ES04
    Scenario Outline: Inicio Sesion  - Invita a un miembro del staff como Administrator
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'settings'
        And Invita un miembro del staff como 'Administrator'
        Then Verifica que la invitacion se envio correctamente

        Examples:
            | navegador |
            | chrome    |
            | msedge    |


    @ES05
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


    @ES06
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

    @ES07
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

    @ES08
    # 1 Escenario
    Scenario Outline: Inicio sesion, Modifica informacion del perfil, sube una cover image
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
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

    @ES09
    Scenario Outline: Inicio sesion, Crea un articulo con una imagen y un titulo, lo publica
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'posts'
        And Crea 'un articulo'
        And Con titulo Prueba-'post' y una imagen
        And Publica el contenido
        Then Verifica que el contenido se visualiza de manera correcta

        Examples:
            | navegador |
            | chrome    |
            | msedge    |

    @ES10
    Scenario Outline: Inicio sesion, Crea una pagina con una imagen y un titulo, lo publica
        Given Se esta usando el navegador '<navegador>'
        And Un usuario administrador
        When Inicia sesion
        Then Visualiza el dashboard de administrador
        When Navega al menu de 'pages'
        And Crea 'una pagina'
        And Con titulo Prueba-'page' y una imagen
        And Publica el contenido
        Then Verifica que el contenido se visualiza de manera correcta

        Examples:
            | navegador |
            | chrome    |
            | msedge    |

