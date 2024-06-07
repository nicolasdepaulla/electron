// console.log("processo principal")

const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron')
// janela principal
const createWindow = () => {
    // nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 1280, // largura  da janela
        height: 720, // altura da janela
        icon: './src/public/img/pc.png'
        // resizable: false, // evitar o redimensionamneto
        // titleBarStyle: 'hidden', // esconder barra de titulo e menu
        // autoHideMenuBar: true // esconder o menu(apenas)

    })

    // iniciar a janela com o menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// janela Sobre

const aboutWindow = () => {
    // nativeTheme.themeSource = 'dark'
    const about = new BrowserWindow({
        width: 360, // largura  da janela
        height: 220, // altura da janela
        icon: './src/public/img/pc.png',
        resizable: false, // evitar o redimensionamneto
        // titleBarStyle: 'hidden', // esconder barra de titulo e menu
        autoHideMenuBar: true // esconder o menu(apenas)

    })

    about.loadFile('./src/views/sobre.html')
}

// executar a aplicação de forma assíncrona
app.whenReady().then(() => {
    createWindow()
})

// template do menu personalizado
const template = [
    {

        label: 'arquivo',
        submenu: [{
            label: 'sair',
            click: () => app.quit(),
            accelerator: 'Alt+F4'
        }
        ]

    },
    {
        label: 'exibir',
        submenu: [{
            label: 'recarregar',
            role: 'reload'
        },
        {
            label: 'ferramentas',
            role: 'toggledevTools'
        },
        {
            type: 'separator'
        },
        {
            label: 'Aplicar zoom',
            role: 'zoomIn'
        },
        {
            label: 'reduzir zoom',
            role: 'zoomOut'
        },
        {
            label: 'Restaurar o zoom padrão',
            role: 'resetZoom'
        }
        ]

    },
    {
        label: 'ajuda',
        submenu: [{
            label: 'docs',
            accelerator: 'Alt+F1',
            click: () => shell.openExternal('https://www.electronjs.org/docs/latest/'),

        },
        {
            type: 'separator'
        },
        {
            label: 'sobre',
            click: () => aboutWindow()
        }
    ]
    }
]