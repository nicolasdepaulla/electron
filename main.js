

const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron')
// relacionado ao preload.js (path é o caminho pra chegar até o preload)
const path = require('node:path')
// janela principal
const createWindow = () => {
    // nativeTheme.themeSource = 'dark'
    const win = new BrowserWindow({
        width: 1280, // largura  da janela
        height: 720, // altura da janela
        icon: './src/public/img/pc.png',
        // resizable: false, // evitar o redimensionamneto
        // titleBarStyle: 'hidden', // esconder barra de titulo e menu
        // autoHideMenuBar: true // esconder o menu(apenas)
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // iniciar a janela com o menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

// janela Sobre
let about // resolver bug de arbertura de várias janelas (bug1) abrir

const aboutWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    if (!about) {
        about = new BrowserWindow({
            width: 360, // largura  da janela
            height: 220, // altura da janela
            icon: './src/public/img/pc.png',
            resizable: false, // evitar o redimensionamneto
            // titleBarStyle: 'hidden', // esconder barra de titulo e menu
            autoHideMenuBar: true // esconder o menu(apenas)

        })
    }


    about.loadFile('./src/views/sobre.html')
    // bug 2 (reabrir a janela se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}

// janela secundária
const childWindow = () => {
    // a linha abaixo obtém a janela pai (Janela principal)
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const child = new BrowserWindow({
            width: 640,
            height: 450,
            icon: './src/public/img/pc.png',
            autoHideMenuBar: true,
            resizable: false,
            parent: father, // esta janela estabelece a relação parent-child
            modal: true // manter o foco do usuário na janela
        })
        child.loadFile('./src/views/child.html')
    }
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
            label: 'janela secundária',
            click: ()=> childWindow()
        },
            {
            label: 'sair',
            click: () => app.quit(),
            accelerator: 'Alt+F4'
        },
        
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

// processos 
console.log("processo principal")
// exemplo 1 : comando que só funciona no node.js
console.log(`Electron: ${process.versions.node}`)
// exemplo 2 : Recebimento de uma mensagem do renderer
ipcMain.on('send-message', (event, Message) => {
    console.log(`processo principal recebeu uma mensagem: ${Message}`)
    // enviar uma resposta ao renderizador
    event.reply('receive-message', "olá renderizador!")
})

// exemplo 3: recebimento do renderer de uma ação a ser executada
ipcMain.on('open-about', () => {
    aboutWindow()
})